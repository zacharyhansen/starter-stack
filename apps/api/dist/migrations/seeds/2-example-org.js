"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "seed", {
    enumerable: true,
    get: function() {
        return seed;
    }
});
const _faker = require("@faker-js/faker");
const _migrate = require("../migrate");
const refDate = new Date(2024, 9, 9);
const range = (n)=>Array.from({
        length: n
    }, (_, index)=>index);
async function seed(knex) {
    /* Insert Public Records */ await knex('public.user').returning([
        'id'
    ]).insert([
        {
            clerk_id: 'user_2knzyrM6qHCsCDd1vIh6lKc7JpD',
            email: 'test@test.com',
            name: 'username',
            phone: null
        }
    ]);
    const userIds = await knex('public.user').returning([
        'id'
    ]).insert(range(200).map(()=>({
            clerk_id: crypto.randomUUID(),
            credit_score: _faker.faker.number.int({
                max: 820,
                min: 380
            }),
            date_of_birth: _faker.faker.date.birthdate(),
            email: _faker.faker.internet.email(),
            name: _faker.faker.person.fullName(),
            phone: _faker.faker.phone.number(),
            ssn: _faker.faker.string.numeric(9)
        })));
    const businessIds = await knex('public.business').returning([
        'id'
    ]).insert(range(200).map(()=>({
            business_type: _faker.faker.company.buzzNoun(),
            date_business_began: new Date(_faker.faker.date.birthdate()),
            dba: `DBA_${_faker.faker.string.numeric(6)}`,
            debt: _faker.faker.number.int({
                max: 10_000_000,
                min: 100_000
            }),
            duns: _faker.faker.string.numeric(9),
            email: _faker.faker.internet.email(),
            industry: _faker.faker.commerce.department(),
            name_display: _faker.faker.company.name(),
            name_legal: _faker.faker.company.name(),
            phone: _faker.faker.phone.number(),
            revenue_average: _faker.faker.number.int({
                max: 10_000_000,
                min: 100_000
            }),
            tin: _faker.faker.string.numeric(9)
        })));
    const orgIds = await knex('public.organization').returning('id').insert([
        {
            clerk_id: 'org_2ko38RckCbvGDqbOE3WO4XXpjKP',
            id: 'tenant_base_org',
            name: 'Testing Org'
        }
    ]);
    await knex('public.organization_user').insert(userIds.flatMap(({ id: user_id })=>orgIds.map(({ id: organization_id })=>({
                organization_id,
                user_id
            }))));
    await knex('public.organization_business').insert(businessIds.flatMap(({ id: business_id })=>orgIds.map(({ id: organization_id })=>({
                business_id,
                organization_id
            }))));
    // ERandomly ad 1-4 users to each business
    await knex('public.business_user').insert(businessIds.flatMap(({ id: business_id })=>{
        const numberOfBusinessUsers = Math.floor(Math.random() * 4) + 1;
        const users = new Set();
        for(let index = 0; index < numberOfBusinessUsers; index++){
            users.add(userIds[Math.floor(Math.random() * userIds.length)].id);
        }
        return Array.from(users).map((user_id)=>({
                business_id,
                expense_average_monthly: _faker.faker.number.int({
                    max: 15_000,
                    min: 2000
                }),
                income_average_monthly: _faker.faker.number.int({
                    max: 50_000,
                    min: 5000
                }),
                job_title: _faker.faker.person.jobTitle(),
                owernship: _faker.faker.number.int({
                    max: 100,
                    min: 0
                }),
                user_id
            }));
    }));
    /* Insert Org Records */ const statusRecords = await Promise.all(_migrate.ORG_SCHEMAS.map((schema)=>{
        return knex(`${schema}.deal_status`).select([
            'id'
        ]);
    }));
    const opportunities = await Promise.all(_migrate.ORG_SCHEMAS.map((schema, index)=>{
        _faker.faker.seed(index);
        return knex(`${schema}.opportunity`).returning('id').insert(range(500).map(()=>({
                id: _faker.faker.string.uuid(),
                assignee_id: _faker.faker.helpers.arrayElement(userIds).id,
                created_by_id: _faker.faker.helpers.arrayElement(userIds).id,
                label: _faker.faker.number.int({
                    max: 1,
                    min: 0
                }) ? _faker.faker.lorem.word() : null,
                borrower_business_id: _faker.faker.helpers.arrayElement(businessIds).id,
                borrower_id: _faker.faker.helpers.arrayElement(userIds).id
            })));
    }));
    const deals = await Promise.all(_migrate.ORG_SCHEMAS.map((schema, index)=>{
        _faker.faker.seed(index);
        return knex(`${schema}.deal`).returning('id').insert(range(500).map((_, dealIndex)=>({
                appetite: _faker.faker.number.int({
                    max: 100,
                    min: 0
                }),
                opportunity_id: opportunities[index][dealIndex].id,
                created_by_id: _faker.faker.helpers.arrayElement(userIds).id,
                interest_rate: _faker.faker.number.float({
                    fractionDigits: 6,
                    max: 0.07,
                    min: 0.035
                }).toFixed(4),
                loan_amount: _faker.faker.number.float({
                    max: 10_000_000,
                    min: 100_000
                }).toFixed(2),
                loan_processing_fee: _faker.faker.number.float({
                    fractionDigits: 2,
                    max: 3000,
                    min: 15
                }).toFixed(2),
                source: _faker.faker.lorem.word(),
                ssbs_score: _faker.faker.number.int({
                    max: 1000,
                    min: 500
                }),
                status_id: _faker.faker.helpers.arrayElement(statusRecords[index].map((s)=>s.id)),
                winnability: _faker.faker.number.int({
                    max: 100,
                    min: 0
                })
            })));
    }));
    await Promise.all(deals.map((dealList, schemaIndex)=>knex(`${_migrate.ORG_SCHEMAS[schemaIndex]}.deal_user`).returning('id').insert(dealList.flatMap((deal)=>range(_faker.faker.number.int({
                max: 20,
                min: 1
            })).map(()=>({
                    deal_id: deal.id,
                    user_id: _faker.faker.helpers.arrayElement(userIds).id
                }))))));
    await Promise.all(_migrate.ORG_SCHEMAS.map(async (schema, index)=>{
        _faker.faker.seed(index);
        return knex(`${schema}.property`).returning('id').insert(range(100).map((_, index_)=>({
                amenities: _faker.faker.helpers.arrayElements([
                    'commercial',
                    'residential'
                ]),
                area_sq_km: _faker.faker.number.int({
                    max: 80,
                    min: 1
                }),
                deal_id: deals[index][index_].id,
                description: _faker.faker.lorem.lines(),
                is_condo: _faker.faker.datatype.boolean(),
                last_census_at: _faker.faker.date.past({
                    refDate,
                    years: 80
                }).toDateString(),
                submitted_at: _faker.faker.date.past({
                    refDate,
                    years: 1
                }).toDateString(),
                tags: _faker.faker.lorem.words(3).split(' '),
                type: _faker.faker.helpers.arrayElement([
                    'commercial',
                    'residential'
                ]),
                year_built: _faker.faker.date.past({
                    refDate,
                    years: 60
                }).getFullYear()
            })));
    }));
    await Promise.all(_migrate.ORG_SCHEMAS.map(async (schema, index)=>{
        _faker.faker.seed(index);
        const taskStatuses = await knex(`${schema}.task_status`).select('id');
        const taskPriorities = await knex(`${schema}.task_priority`).select('id');
        return knex(`${schema}.task`).returning('id').insert(range(200).map(()=>({
                assignee_id: _faker.faker.helpers.arrayElement(userIds).id,
                created_at: _faker.faker.date.past({
                    refDate,
                    years: 1
                }).toDateString(),
                deal_id: _faker.faker.helpers.arrayElement(deals[index].map((d)=>d.id)),
                description: _faker.faker.lorem.lines({
                    max: 12,
                    min: 1
                }),
                priority_id: _faker.faker.helpers.arrayElement(taskPriorities.map((p)=>p.id)),
                status_id: _faker.faker.helpers.arrayElement(taskStatuses.map((s)=>s.id)),
                title: _faker.faker.lorem.lines(1),
                updated_at: _faker.faker.date.past({
                    refDate,
                    years: 1
                }).toDateString()
            })));
    }));
}

//# sourceMappingURL=2-example-org.js.map