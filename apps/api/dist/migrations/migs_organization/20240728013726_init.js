"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    down: function() {
        return down;
    },
    up: function() {
        return up;
    }
});
const _seedconstants = require("../helpers/seed-constants");
const _uuidexternal = require("../helpers/uuid-external");
async function up(knex) {
    return knex.schema.withSchema(knex.userParams.schemaName)// Grant access to the schema to super_admin
    .raw(`GRANT USAGE ON SCHEMA ${knex.userParams.schemaName} TO super_admin;`).raw(`GRANT ALL ON ALL TABLES IN SCHEMA ${knex.userParams.schemaName} TO super_admin;`).raw(`GRANT ALL ON ALL FUNCTIONS IN SCHEMA ${knex.userParams.schemaName} TO super_admin;`).raw(`ALTER DEFAULT PRIVILEGES IN SCHEMA ${knex.userParams.schemaName} GRANT ALL ON TABLES TO super_admin;`).raw(`ALTER DEFAULT PRIVILEGES IN SCHEMA ${knex.userParams.schemaName} GRANT ALL ON FUNCTIONS TO super_admin;`)// Create and grant access of the schema to org_admin
    .raw(`CREATE ROLE  ${knex.userParams.schemaName}_admin NOLOGIN;`).raw(`GRANT ${knex.userParams.schemaName}_admin TO authenticator;`).raw(`GRANT USAGE ON SCHEMA ${knex.userParams.schemaName} TO ${knex.userParams.schemaName}_admin;`).raw(`GRANT ALL ON ALL TABLES IN SCHEMA ${knex.userParams.schemaName} TO ${knex.userParams.schemaName}_admin;`).raw(`GRANT ALL ON ALL FUNCTIONS IN SCHEMA ${knex.userParams.schemaName} TO ${knex.userParams.schemaName}_admin;`).raw(`ALTER DEFAULT PRIVILEGES IN SCHEMA ${knex.userParams.schemaName} GRANT ALL ON TABLES TO ${knex.userParams.schemaName}_admin;`).raw(`ALTER DEFAULT PRIVILEGES IN SCHEMA ${knex.userParams.schemaName} GRANT ALL ON FUNCTIONS TO ${knex.userParams.schemaName}_admin;`).raw("NOTIFY pgrst, 'reload config';").createTable('deal_status', (table)=>{
        table.string('id').primary();
        table.text('external_id').nullable().unique();
        table.timestamps(true, true);
        table.string('label').notNullable();
        table.integer('order').unique().nullable();
    }).createTable('opportunity', (table)=>{
        (0, _uuidexternal.withIds)(knex, table);
        table.timestamps(true, true);
        table.uuid('active_deal_id').nullable();
        table.text('label').nullable();
        // The internal user assigned to the opportunity
        table.uuid('assignee_id').nullable();
        table.foreign('assignee_id').references('id').inTable('public.user').onDelete('SET NULL');
        // The user applying for the loan (can be a business or person)
        table.uuid('borrower_id').nullable();
        table.foreign('borrower_id').references('id').inTable('public.user').onDelete('SET NULL');
        table.uuid('borrower_business_id').nullable();
        table.foreign('borrower_business_id').references('id').inTable('public.business').onDelete('SET NULL');
        table.uuid('created_by_id').nullable();
        table.foreign('created_by_id').references('id').inTable('public.user').onDelete('SET NULL');
    }).createTable('deal', function(table) {
        (0, _uuidexternal.withIds)(knex, table);
        table.timestamps(true, true);
        table.text('label').nullable();
        table.text('source').nullable();
        table.integer('winnability').nullable();
        table.integer('appetite').nullable();
        table.integer('ssbs_score').nullable();
        table.decimal('loan_amount', 14, 3).nullable();
        // recorded in decimal format so 4% is .04
        table.decimal('interest_rate', 7, 6).nullable();
        table.decimal('loan_processing_fee', 10, 2).nullable();
        table.uuid('opportunity_id').notNullable();
        table.foreign('opportunity_id').references('id').inTable(`${knex.userParams.schemaName}.opportunity`).onDelete('CASCADE');
        table.string('status_id').notNullable();
        table.foreign('status_id').references('id').inTable(`${knex.userParams.schemaName}.deal_status`).onDelete('RESTRICT');
        // The internal user assigned to the deal
        table.uuid('assignee_id').nullable();
        table.foreign('assignee_id').references('id').inTable('public.user').onDelete('SET NULL');
        table.uuid('created_by_id').nullable();
        table.foreign('created_by_id').references('id').inTable('public.user').onDelete('SET NULL');
    }).alterTable('opportunity', (table)=>{
        table.foreign('active_deal_id').references('id').inTable(`${knex.userParams.schemaName}.deal`).onDelete('RESTRICT');
    }).createTable('task_status', (table)=>{
        table.integer('id').primary();
        table.timestamps(true, true);
        table.string('label').notNullable().unique();
    }).createTable('task_priority', (table)=>{
        table.integer('id').primary();
        table.timestamps(true, true);
        table.string('label').notNullable().unique();
    }).createTable('task', (table)=>{
        (0, _uuidexternal.withIds)(knex, table);
        table.timestamps(true, true);
        table.integer('status_id').notNullable().defaultTo(1);
        table.foreign('status_id').references('id').inTable(`${knex.userParams.schemaName}.task_status`).onDelete('RESTRICT');
        table.integer('priority_id').notNullable().defaultTo(0);
        table.foreign('priority_id').references('id').inTable(`${knex.userParams.schemaName}.task_priority`).onDelete('RESTRICT');
        table.text('title').notNullable();
        table.text('description');
        table.uuid('assignee_id').nullable();
        table.foreign('assignee_id').references('id').inTable('public.user').onDelete('SET NULL');
        table.uuid('deal_id').notNullable();
        table.foreign('deal_id').references('id').inTable(`${knex.userParams.schemaName}.deal`).onDelete('CASCADE');
    }).createTable('property', function(table) {
        (0, _uuidexternal.withIds)(knex, table);
        table.timestamps(true, true);
        table.text('description');
        table.specificType('tags', 'text[]');
        table.integer('year_built');
        table.double('area_sq_km');
        table.enu('type', [
            'commercial',
            'residential'
        ], {
            enumName: `property_type`,
            useNative: true
        });
        table.specificType('amenities', `${knex.userParams.schemaName}.property_type[]`);
        table.date('submitted_at');
        table.dateTime('last_census_at');
        table.boolean('is_condo').defaultTo(false);
        table.uuid('deal_id').notNullable();
        table.foreign('deal_id').references('id').inTable(`${knex.userParams.schemaName}.deal`).onDelete('CASCADE');
    }).createTable('deal_user', function(table) {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.timestamps(true, true);
        table.uuid('user_id').notNullable();
        table.uuid('deal_id').notNullable();
        // Foreign Key constraints
        table.foreign('user_id').references('id').inTable('public.user').onDelete('CASCADE');
        table.foreign('deal_id').references('id').inTable(`${knex.userParams.schemaName}.deal`).onDelete('CASCADE');
        table.primary([
            'id',
            'user_id',
            'deal_id'
        ]);
    }).raw(`
        CREATE VIEW ${knex.userParams.schemaName}.view_organization_user AS SELECT public.user.* FROM public.user 
          LEFT JOIN public.organization_user on public.user.id=public.organization_user.user_id
          where public.organization_user.organization_id='${knex.userParams.schemaName}';
        `).raw(`
        CREATE VIEW ${knex.userParams.schemaName}.view_organization_business AS SELECT public.business.* FROM public.business 
          LEFT JOIN public.organization_business on public.business.id=public.organization_business.business_id
          where public.organization_business.organization_id='${knex.userParams.schemaName}';
        `).then(()=>{
        knex('task_status').insert(_seedconstants.TASK_STATUS);
        knex('task_priority').insert(_seedconstants.TASK_PRIORITY);
        knex('deal_status').insert(_seedconstants.DEAL_STATUS);
    });
}
async function down(knex) {
    return knex.schema.withSchema(knex.userParams.schemaName).dropTable('deal_user').dropTable('property').raw(`DROP TABLE IF EXISTS ${knex.userParams.schemaName}.opportunity CASCADE`).raw(`DROP TABLE IF EXISTS ${knex.userParams.schemaName}.deal CASCADE`).dropTable('deal_status').dropTable('task').dropTable('task_priority').dropTable('task_status').raw(`DROP TYPE IF EXISTS ${knex.userParams.schemaName}.property_type`).raw(`DROP VIEW ${knex.userParams.schemaName}.view_organization_user;`).raw(`DROP VIEW ${knex.userParams.schemaName}.view_organization_business;`).raw(`REVOKE ALL ON ALL TABLES IN SCHEMA ${knex.userParams.schemaName} FROM super_admin;`).raw(`REVOKE ALL ON ALL FUNCTIONS IN SCHEMA ${knex.userParams.schemaName} FROM super_admin;`).raw(`ALTER DEFAULT PRIVILEGES IN SCHEMA ${knex.userParams.schemaName} REVOKE ALL ON TABLES FROM super_admin;`).raw(`ALTER DEFAULT PRIVILEGES IN SCHEMA ${knex.userParams.schemaName} REVOKE ALL ON FUNCTIONS FROM super_admin;`).raw(`REVOKE ALL ON ALL TABLES IN SCHEMA ${knex.userParams.schemaName} FROM ${knex.userParams.schemaName}_admin;`).raw(`REVOKE ALL ON ALL FUNCTIONS IN SCHEMA ${knex.userParams.schemaName} FROM ${knex.userParams.schemaName}_admin;`).raw(`ALTER DEFAULT PRIVILEGES IN SCHEMA ${knex.userParams.schemaName} REVOKE ALL ON TABLES FROM ${knex.userParams.schemaName}_admin;`).raw(`ALTER DEFAULT PRIVILEGES IN SCHEMA ${knex.userParams.schemaName} REVOKE ALL ON FUNCTIONS FROM ${knex.userParams.schemaName}_admin;`).raw(`REVOKE ALL ON SCHEMA ${knex.userParams.schemaName} from ${knex.userParams.schemaName}_admin;`).raw(`DROP ROLE IF EXISTS ${knex.userParams.schemaName}_admin;`).raw(`DROP SCHEMA ${knex.userParams.schemaName} CASCADE;`);
}

//# sourceMappingURL=20240728013726_init.js.map