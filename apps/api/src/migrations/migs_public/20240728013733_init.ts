// eslint-disable-next-line unicorn/filename-case
import type { Knex } from 'knex';

import { withIds } from '../helpers/uuid-external';
import { withUSAddress } from '../helpers/with-us-address';

export async function up(knex: Knex): Promise<void> {
  return (
    knex.schema
      // Create "in database configuration for postgrest API"
      .raw('CREATE SCHEMA postgrest;')
      .raw(
        `
        CREATE OR REPLACE FUNCTION postgrest.pre_config()
        RETURNS void AS $$
          SELECT
            set_config('pgrst.jwt_secret', '${process.env.CLERK_PUBLIC_JWT}', true),
            set_config('pgrst.db_schemas', string_agg(nspname, ','), true)
          from (
              SELECT nspname 
              FROM pg_namespace 
              WHERE nspname LIKE 'tenant_%'
              UNION ALL
              SELECT 'public'
          ) AS namespaces;
        $$ language sql;
      `
      )
      .raw(
        `
          -- watch CREATE and ALTER
          CREATE OR REPLACE FUNCTION pgrst_ddl_watch() RETURNS event_trigger AS $$
          DECLARE
            cmd record;
          BEGIN
            FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
            LOOP
              IF cmd.command_tag IN (
                'CREATE SCHEMA', 'ALTER SCHEMA'
              , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
              , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
              , 'CREATE VIEW', 'ALTER VIEW'
              , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
              , 'CREATE FUNCTION', 'ALTER FUNCTION'
              , 'CREATE TRIGGER'
              , 'CREATE TYPE', 'ALTER TYPE'
              , 'CREATE RULE'
              , 'COMMENT'
              )
              -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
              AND cmd.schema_name is distinct from 'pg_temp'
              THEN
                NOTIFY pgrst, 'reload schema';
              END IF;
            END LOOP;
          END; $$ LANGUAGE plpgsql;

          -- watch DROP
          CREATE OR REPLACE FUNCTION pgrst_drop_watch() RETURNS event_trigger AS $$
          DECLARE
            obj record;
          BEGIN
            FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
            LOOP
              IF obj.object_type IN (
                'schema'
              , 'table'
              , 'foreign table'
              , 'view'
              , 'materialized view'
              , 'function'
              , 'trigger'
              , 'type'
              , 'rule'
              )
              AND obj.is_temporary IS false -- no pg_temp objects
              THEN
                NOTIFY pgrst, 'reload schema';
              END IF;
            END LOOP;
          END; $$ LANGUAGE plpgsql;

          CREATE EVENT TRIGGER pgrst_ddl_watch
            ON ddl_command_end
            EXECUTE PROCEDURE pgrst_ddl_watch();

          CREATE EVENT TRIGGER pgrst_drop_watch
            ON sql_drop
            EXECUTE PROCEDURE pgrst_drop_watch();
        `
      )
      // Create authenticator role
      .raw(
        `CREATE ROLE authenticator NOINHERIT LOGIN PASSWORD '${process.env.DATABASE_PASSWORD}';`
      )
      // Create anonymous role
      .raw('CREATE ROLE anonymous NOLOGIN;')
      .raw('GRANT anonymous TO authenticator;')
      // Create org admin role
      .raw('CREATE ROLE "org:admin" NOLOGIN;')
      .raw('GRANT "org:admin" TO authenticator;')
      // Create and grant access to everything to super admin and add defaults
      .raw(
        `
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'super_admin') THEN
              CREATE ROLE super_admin NOLOGIN;
          END IF;
        END
        $$;
        `
      )
      .raw('GRANT super_admin TO authenticator;')
      .raw('GRANT ALL ON ALL TABLES IN SCHEMA public TO super_admin;')
      .raw('GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO super_admin;')
      .raw(
        'ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO super_admin;'
      )
      .raw(
        'ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO super_admin;'
      )
      .raw("NOTIFY pgrst, 'reload config';")
      .raw(
        `
        CREATE TYPE state_usa AS ENUM (
          'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
          'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
          'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
          'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
          'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
        );
      `
      )
      .createTable('user', table => {
        withIds(knex, table);
        table.timestamps(true, true);
        withUSAddress(knex, table);
        table.string('clerk_id').notNullable().unique();
        table.string('email').notNullable().unique();
        table.text('name').nullable();
        table.string('phone').nullable();
        table.string('ssn', 9).nullable();
        table.date('date_of_birth').nullable();
        table.integer('credit_score').nullable();
      })
      .createTable('business', table => {
        withIds(knex, table);
        table.timestamps(true, true);
        withUSAddress(knex, table);
        table.string('email').nullable();
        table.text('name_display').nullable();
        table.text('name_legal').nullable();
        table.string('duns', 9).nullable().unique();
        table.string('dba').nullable().unique();
        table.string('tin', 9).nullable().unique();
        table.text('phone').nullable();
        table.text('business_type').nullable();
        table.text('industry').nullable();
        table.date('date_business_began').nullable();
        table.double('revenue_average').nullable();
        table.double('debt').nullable();
      })
      .createTable('organization', table => {
        table.string('id').primary();
        table.text('external_id').nullable().unique();
        table.timestamps(true, true);

        table.text('name').notNullable();
        table.string('clerk_id').unique().notNullable();

        table
          .enu('environment_type', ['production', 'uat'], {
            enumName: `environment_type`,
            useNative: true,
          })
          .notNullable()
          .defaultTo('uat');
      })
      .createTable('organization_user', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.timestamps(true, true);

        table.string('organization_id').notNullable();
        table.uuid('user_id').notNullable();

        table
          .foreign('organization_id')
          .references('id')
          .inTable('public.organization')
          .onDelete('CASCADE');
        table
          .foreign('user_id')
          .references('id')
          .inTable('public.user')
          .onDelete('CASCADE');

        table.unique(['organization_id', 'user_id']);
      })
      .createTable('business_user', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.timestamps(true, true);

        table.uuid('business_id').notNullable();
        table.uuid('user_id').notNullable();
        table.text('job_title').nullable();
        table.double('owernship').nullable();
        table.double('income_average_monthly').nullable();
        table.double('expense_average_monthly').nullable();

        table
          .foreign('business_id')
          .references('id')
          .inTable('public.business')
          .onDelete('CASCADE');
        table
          .foreign('user_id')
          .references('id')
          .inTable('public.user')
          .onDelete('CASCADE');

        table.unique(['business_id', 'user_id']);
      })
      .createTable('organization_business', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.timestamps(true, true);

        table.string('organization_id').notNullable();
        table.uuid('business_id').notNullable();

        table
          .foreign('organization_id')
          .references('id')
          .inTable('public.organization')
          .onDelete('CASCADE');
        table
          .foreign('business_id')
          .references('id')
          .inTable('public.business')
          .onDelete('CASCADE');

        table.unique(['organization_id', 'business_id']);
      })
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('organization_user')
    .dropTable('organization_business')
    .dropTable('business_user')
    .dropTable('user')
    .dropTable('organization')
    .dropTable('business')
    .raw('DROP TYPE state_usa;')
    .raw(`DROP TYPE IF EXISTS environment_type`)
    .raw('REVOKE ALL ON ALL TABLES IN SCHEMA public FROM super_admin;')
    .raw('REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM super_admin;')
    .raw(
      'ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM super_admin;'
    )

    .raw(
      'ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON FUNCTIONS FROM super_admin;'
    )
    .raw(`REVOKE ALL ON SCHEMA public from super_admin;`)
    .raw(`REVOKE ALL ON SCHEMA public from super_admin;`)
    .raw('DROP FUNCTION IF EXISTS postgrest.pre_config();')
    .raw('DROP FUNCTION IF EXISTS pgrst_ddl_watch() CASCADE;')
    .raw('DROP EVENT TRIGGER IF EXISTS pgrst_ddl_watch;')
    .raw('DROP EVENT TRIGGER IF EXISTS pgrst_drop_watch;')
    .raw('REVOKE USAGE ON SCHEMA postgrest FROM authenticator;')
    .raw('DROP SCHEMA IF EXISTS postgrest;')
    .raw('DROP ROLE IF EXISTS authenticator;')
    .raw('DROP ROLE IF EXISTS anonymous;')
    .raw('DROP ROLE IF EXISTS "org:admin";');
}
