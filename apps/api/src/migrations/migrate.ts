import Knex from 'knex';

import configOrganization from './knexFiles/oganization';
import configPublic from './knexFiles/public';
import type { environments } from './knexFiles/utils';

export const ORG_SCHEMAS = [
  'tenant_base_org',
  'tenant_orgexample_uat',
  'tenant_orgexample_prod',
];

const knownMigrationTypes = new Set([
  'latest',
  'rollback',
  'up',
  'down',
  'list',
]);

const myArguments = process.argv.slice(2);
const migrationType = myArguments[0];
const target = myArguments[1];
// eslint-disable-next-line no-console
console.log({ migrationType, target });

async function migratePublic() {
  const databaseConnection = configPublic[process.env.NODE_ENV as environments];
  const knexConnectionPublic = Knex(databaseConnection);

  // eslint-disable-next-line no-console
  console.log(`master migrations (${migrationType}) started...`);

  let promise;
  switch (migrationType) {
    case 'latest': {
      promise = knexConnectionPublic.migrate.latest();
      break;
    }
    case 'rollback': {
      promise = knexConnectionPublic.migrate.rollback();
      break;
    }
    case 'up': {
      promise = knexConnectionPublic.migrate.up();
      break;
    }
    case 'down': {
      promise = knexConnectionPublic.migrate.down();
      break;
    }
    case 'list': {
      promise = knexConnectionPublic.migrate.list();
      break;
    }
  }
  return promise
    ?.then(() => {
      // eslint-disable-next-line no-console
      console.log(`master migrations (${migrationType}) completed!`);
    })
    .catch(error => {
      console.error(error);
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit(1);
    })
    .finally(() => {
      knexConnectionPublic.destroy();
    });
}

const databaseConnection =
  configOrganization[process.env.NODE_ENV as environments];

async function migrateOrganizations() {
  return Promise.all(
    ORG_SCHEMAS.map(async schemaName => {
      // create decoy connection to ensure schema is created
      const knexSchema = Knex(databaseConnection);
      await knexSchema.raw(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);
      knexSchema.destroy();

      // create connection for migrations and set the custom schema where we want the org migs to go into
      const knexConnectionOrg = Knex(databaseConnection).withUserParams({
        schemaName,
      });

      let promise;
      switch (migrationType) {
        case 'latest': {
          promise = knexConnectionOrg.migrate.latest({ schemaName });
          break;
        }
        case 'rollback': {
          promise = knexConnectionOrg.migrate.rollback({ schemaName });
          break;
        }
        case 'up': {
          promise = knexConnectionOrg.migrate.up({ schemaName });
          break;
        }
        case 'down': {
          promise = knexConnectionOrg.migrate.down({ schemaName });
          break;
        }
        case 'list': {
          promise = knexConnectionOrg.migrate.list({ schemaName });
          break;
        }
      }
      return promise
        ?.then(() => {
          // eslint-disable-next-line no-console
          console.log(
            `%s schema migrations (${migrationType}) completed!`,
            schemaName
          );
        })
        .catch(error => {
          console.error(error);
          console.error(
            `%s schema migrations (${migrationType}) failed`,
            schemaName
          );
        })
        .finally(() => {
          knexConnectionOrg.destroy();
        });
    })
  );
}

async function migrate() {
  // TODO: Running seed command auto runs this file
  if (migrationType === 'seed:run') return;
  if (!knownMigrationTypes.has(migrationType ?? '')) {
    console.error(
      'Please add migrations command (latest, rollback, up, down, list)'
    );
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  }
  switch (target) {
    case undefined: {
      await migratePublic();
      await migrateOrganizations();

      break;
    }
    case 'public': {
      await migratePublic();

      break;
    }
    case 'orgs': {
      await migrateOrganizations();

      break;
    }
    // No default
  }
  // eslint-disable-next-line no-console
  console.info('Migration Complete');
}

migrate();
