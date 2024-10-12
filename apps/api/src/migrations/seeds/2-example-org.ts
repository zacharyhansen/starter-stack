import { faker } from '@faker-js/faker';
import type knex from 'knex';
import type {
  BusinessId,
  DealId,
  DealStatusId,
  NewBusiness,
  NewBusinessUser,
  NewDeal,
  NewDealUser,
  NewOrganization,
  NewOrganizationBusiness,
  NewOrganizationUser,
  NewProperty,
  NewTask,
  NewUser,
  OrganizationId,
  PropertyType,
  TaskId,
  TaskPriorityId,
  TaskStatusId,
  UserId,
} from '@repo/postgres-types';
import type {
  NewOpportunity,
  OpportunityId,
} from '@repo/postgres-types/src/TenantBaseOrg/Opportunity';

import { ORG_SCHEMAS } from '../migrate';

const refDate = new Date(2024, 9, 9);

const range = (n: number) => Array.from({ length: n }, (_, index) => index);

export async function seed(knex: knex.Knex): Promise<void> {
  /* Insert Public Records */
  await knex('public.user')
    .returning(['id'])
    .insert<{ id: UserId }[]>([
      {
        clerk_id: 'user_2knzyrM6qHCsCDd1vIh6lKc7JpD',
        email: 'test@test.com',
        name: 'username',
        phone: null,
      },
    ] satisfies NewUser[]);

  const userIds = await knex('public.user')
    .returning(['id'])
    .insert<{ id: UserId }[]>(
      range(200).map(() => ({
        clerk_id: crypto.randomUUID(),
        credit_score: faker.number.int({
          max: 820,
          min: 380,
        }),
        date_of_birth: faker.date.birthdate(),
        email: faker.internet.email(),
        name: faker.person.fullName(),
        phone: faker.phone.number(),
        ssn: faker.string.numeric(9),
      })) satisfies NewUser[]
    );

  const businessIds = await knex('public.business')
    .returning(['id'])
    .insert<{ id: BusinessId }[]>(
      range(200).map(() => ({
        business_type: faker.company.buzzNoun(),
        date_business_began: new Date(faker.date.birthdate()),
        dba: `DBA_${faker.string.numeric(6)}`,
        debt: faker.number.int({
          max: 10_000_000,
          min: 100_000,
        }),
        duns: faker.string.numeric(9),
        email: faker.internet.email(),
        industry: faker.commerce.department(),
        name_display: faker.company.name(),
        name_legal: faker.company.name(),
        phone: faker.phone.number(),
        revenue_average: faker.number.int({
          max: 10_000_000,
          min: 100_000,
        }),
        tin: faker.string.numeric(9),
      })) satisfies NewBusiness[]
    );

  const orgIds = await knex('public.organization')
    .returning('id')
    .insert<{ id: OrganizationId }[]>([
      {
        clerk_id: 'org_2ko38RckCbvGDqbOE3WO4XXpjKP',
        id: 'tenant_base_org' as OrganizationId,
        name: 'Testing Org',
      },
    ] satisfies NewOrganization[]);

  await knex('public.organization_user').insert(
    userIds.flatMap(
      ({ id: user_id }) =>
        orgIds.map(({ id: organization_id }) => ({
          organization_id,
          user_id,
        })) satisfies NewOrganizationUser[]
    )
  );

  await knex('public.organization_business').insert(
    businessIds.flatMap(
      ({ id: business_id }) =>
        orgIds.map(({ id: organization_id }) => ({
          business_id,
          organization_id,
        })) satisfies NewOrganizationBusiness[]
    )
  );

  // ERandomly ad 1-4 users to each business
  await knex('public.business_user').insert(
    businessIds.flatMap(({ id: business_id }) => {
      const numberOfBusinessUsers = Math.floor(Math.random() * 4) + 1;
      const users = new Set<UserId>();
      for (let index = 0; index < numberOfBusinessUsers; index++) {
        users.add(userIds[Math.floor(Math.random() * userIds.length)]!.id);
      }
      return Array.from(users).map(user_id => ({
        business_id,
        expense_average_monthly: faker.number.int({
          max: 15_000,
          min: 2000,
        }),
        income_average_monthly: faker.number.int({
          max: 50_000,
          min: 5000,
        }),
        job_title: faker.person.jobTitle(),
        owernship: faker.number.int({
          max: 100,
          min: 0,
        }),
        user_id,
      })) satisfies NewBusinessUser[];
    })
  );

  /* Insert Org Records */
  const statusRecords = await Promise.all(
    ORG_SCHEMAS.map(schema => {
      return knex(`${schema}.deal_status`).select<{ id: DealStatusId }[]>([
        'id',
      ]);
    })
  );

  const opportunities = await Promise.all(
    ORG_SCHEMAS.map((schema, index) => {
      faker.seed(index);

      return knex(`${schema}.opportunity`)
        .returning('id')
        .insert<{ id: OpportunityId }[]>(
          range(500).map(
            () =>
              ({
                id: faker.string.uuid() as OpportunityId,
                assignee_id: faker.helpers.arrayElement(userIds).id,
                created_by_id: faker.helpers.arrayElement(userIds).id,
                label: faker.number.int({
                  max: 1,
                  min: 0,
                })
                  ? faker.lorem.word()
                  : null,
                borrower_business_id:
                  faker.helpers.arrayElement(businessIds).id,
                borrower_id: faker.helpers.arrayElement(userIds).id,
              }) satisfies NewOpportunity
          )
        );
    })
  );

  const deals = await Promise.all(
    ORG_SCHEMAS.map((schema, index) => {
      faker.seed(index);

      return knex(`${schema}.deal`)
        .returning('id')
        .insert<{ id: DealId }[]>(
          range(500).map(
            (_, dealIndex) =>
              ({
                appetite: faker.number.int({
                  max: 100,
                  min: 0,
                }),
                opportunity_id: opportunities[index]![dealIndex]!.id,
                created_by_id: faker.helpers.arrayElement(userIds).id,
                interest_rate: faker.number
                  .float({
                    fractionDigits: 6,
                    max: 0.07,
                    min: 0.035,
                  })
                  .toFixed(4),
                loan_amount: faker.number
                  .float({
                    max: 10_000_000,
                    min: 100_000,
                  })
                  .toFixed(2),
                loan_processing_fee: faker.number
                  .float({
                    fractionDigits: 2,
                    max: 3000,
                    min: 15,
                  })
                  .toFixed(2),
                source: faker.lorem.word(),
                ssbs_score: faker.number.int({
                  max: 1000,
                  min: 500,
                }),
                status_id: faker.helpers.arrayElement(
                  statusRecords[index]!.map(s => s.id)
                ),
                winnability: faker.number.int({
                  max: 100,
                  min: 0,
                }),
              }) satisfies NewDeal
          )
        );
    })
  );

  await Promise.all(
    deals.map((dealList, schemaIndex) =>
      knex(`${ORG_SCHEMAS[schemaIndex]}.deal_user`)
        .returning('id')
        .insert<{ id: DealId }[]>(
          dealList.flatMap(deal =>
            range(
              faker.number.int({
                max: 20,
                min: 1,
              })
            ).map(
              () =>
                ({
                  deal_id: deal.id,
                  user_id: faker.helpers.arrayElement(userIds).id,
                }) satisfies NewDealUser
            )
          )
        )
    )
  );

  await Promise.all(
    ORG_SCHEMAS.map(async (schema, index) => {
      faker.seed(index);

      return knex(`${schema}.property`)
        .returning('id')
        .insert(
          range(100).map(
            (_, index_) =>
              ({
                amenities: faker.helpers.arrayElements([
                  'commercial',
                  'residential',
                ] as PropertyType[]),
                area_sq_km: faker.number.int({ max: 80, min: 1 }),
                deal_id: deals[index]![index_]!.id,
                description: faker.lorem.lines(),
                is_condo: faker.datatype.boolean(),
                last_census_at: faker.date
                  .past({ refDate, years: 80 })
                  .toDateString(),
                submitted_at: faker.date
                  .past({ refDate, years: 1 })
                  .toDateString(),
                tags: faker.lorem.words(3).split(' '),
                type: faker.helpers.arrayElement([
                  'commercial',
                  'residential',
                ] as PropertyType[]),
                year_built: faker.date
                  .past({ refDate, years: 60 })
                  .getFullYear(),
              }) satisfies NewProperty
          )
        );
    })
  );

  await Promise.all(
    ORG_SCHEMAS.map(async (schema, index) => {
      faker.seed(index);

      const taskStatuses = await knex(`${schema}.task_status`).select<
        {
          id: TaskStatusId;
        }[]
      >('id');

      const taskPriorities = await knex(`${schema}.task_priority`).select<
        {
          id: TaskPriorityId;
        }[]
      >('id');

      return knex(`${schema}.task`)
        .returning('id')
        .insert<{ id: TaskId }[]>(
          range(200).map(
            () =>
              ({
                assignee_id: faker.helpers.arrayElement(userIds).id,
                created_at: faker.date
                  .past({ refDate, years: 1 })
                  .toDateString(),
                deal_id: faker.helpers.arrayElement(
                  deals[index]!.map(d => d.id)
                ),
                description: faker.lorem.lines({
                  max: 12,
                  min: 1,
                }),
                priority_id: faker.helpers.arrayElement(
                  taskPriorities.map(p => p.id)
                ),
                status_id: faker.helpers.arrayElement(
                  taskStatuses.map(s => s.id)
                ),
                title: faker.lorem.lines(1),
                updated_at: faker.date
                  .past({ refDate, years: 1 })
                  .toDateString(),
              }) satisfies NewTask
          )
        );
    })
  );
}
