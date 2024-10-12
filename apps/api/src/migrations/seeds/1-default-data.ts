import type knex from 'knex';

import {
  DEAL_STATUS,
  TASK_PRIORITY,
  TASK_STATUS,
} from '../helpers/seed-constants';
import { ORG_SCHEMAS } from '../migrate';

export async function seed(knex: knex.Knex): Promise<void> {
  /* Insert Org Records */
  await Promise.all(
    ORG_SCHEMAS.map(schema => {
      return knex(`${schema}.deal_status`).insert(DEAL_STATUS);
    })
  );
  await Promise.all(
    ORG_SCHEMAS.map(schema => {
      return knex(`${schema}.task_status`).insert(TASK_STATUS);
    })
  );
  await Promise.all(
    ORG_SCHEMAS.map(schema => {
      return knex(`${schema}.task_priority`).insert(TASK_PRIORITY);
    })
  );
}
