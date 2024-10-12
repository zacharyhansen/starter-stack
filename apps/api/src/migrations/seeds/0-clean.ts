import type knex from 'knex';

import { ORG_SCHEMAS } from '../migrate';

export async function seed(knex: knex.Knex): Promise<void> {
  /* Delete Org Records */
  await Promise.all(ORG_SCHEMAS.map(schema => knex(`${schema}.deal`).del()));
  await Promise.all(
    ORG_SCHEMAS.map(schema => knex(`${schema}.property`).del())
  );
  await Promise.all(ORG_SCHEMAS.map(schema => knex(`${schema}.task`).del()));
  await Promise.all(
    ORG_SCHEMAS.map(schema => knex(`${schema}.deal_status`).del())
  );
  await Promise.all(
    ORG_SCHEMAS.map(schema => knex(`${schema}.task_priority`).del())
  );
  await Promise.all(
    ORG_SCHEMAS.map(schema => knex(`${schema}.task_status`).del())
  );

  /* Delete Public Records */
  await Promise.all([
    knex('public.organization_user').del(),
    knex('public.organization_business').del(),
    knex('public.business_user').del(),
    knex('public.user').del(),
    knex('public.business').del(),
    knex('public.organization').del(),
  ]);
}
