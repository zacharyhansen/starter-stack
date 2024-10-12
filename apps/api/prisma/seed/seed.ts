import {
  createSeedClient,
  type roleEnum,
  type state_usaEnum,
  type tenantEnum,
  type userScalars,
} from '@snaplet/seed';
import { copycat, faker } from '@snaplet/copycat';

faker.seed(0);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const range = (n: number) => Array.from({ length: n }, (_, index) => index);

const organizations: tenantEnum[] = ['example_uat', 'example_prod'];

const deal_statuses = [
  'Pre Qualification',
  'Pricing',
  'Approved',
  'Underwriting',
  'Contract',
  'Contract Out',
  'Contract In',
  'Final Underwriting Approval',
  'Pre-Funding',
  'Funded',
];

async function main() {
  const seed = await createSeedClient();
  const bussinessCount = 500;
  // Truncate all tables in the database
  await seed.$resetDatabase();

  const dbas = Array.from(genUniqueNumeric(bussinessCount, 6));
  const duns = Array.from(genUniqueNumeric(bussinessCount, 9));
  const tins = Array.from(genUniqueNumeric(bussinessCount, 9));

  const { business: businesses } = await seed.business(x =>
    x(bussinessCount, {
      business_type: faker.company.buzzNoun(),
      date_business_began: new Date(faker.date.birthdate()),
      dba: () => `DBA_${dbas.pop()}`,
      debt: faker.number.int({
        max: 10_000_000,
        min: 100_000,
      }),
      duns: () => duns.pop()!,
      email: faker.internet.email(),
      industry: faker.commerce.department(),
      name_display: faker.company.name(),
      name_legal: faker.company.name(),
      phone: faker.phone.number(),
      revenue_average: faker.number.int({
        max: 10_000_000,
        min: 100_000,
      }),
      tin: () => tins.pop()!,
    })
  );

  const { user: borrowers } = await seed.user(x =>
    x(500, {
      email: context => copycat.email(context.seed),
      date_of_birth: faker.date.birthdate(),
      credit_score: context =>
        copycat.int(context.seed, {
          max: 820,
          min: 380,
        }),
      name: context => copycat.fullName(context.seed),
      phone: context => copycat.phoneNumber(context.seed),
      ssn: faker.string.numeric(9),
      address: faker.location.streetAddress(),
      address_line_2: faker.location.secondaryAddress(),
      zip_code: faker.location.zipCode(),
      state: faker.location.state({
        abbreviated: true,
      }) as state_usaEnum,
      city: faker.location.city(),
      county: faker.location.county(),
      clerk_id: context => copycat.uuid(context.seed),
    })
  );

  const { user: agents } = await seed.user(x =>
    x(500, {
      email: context => copycat.email(context.seed),
      date_of_birth: faker.date.birthdate(),
      credit_score: context =>
        copycat.int(context.seed, {
          max: 820,
          min: 380,
        }),
      name: context => copycat.fullName(context.seed),
      phone: context => copycat.phoneNumber(context.seed),
      ssn: faker.string.numeric(9),
      address: faker.location.streetAddress(),
      address_line_2: faker.location.secondaryAddress(),
      zip_code: faker.location.zipCode(),
      state: faker.location.state({
        abbreviated: true,
      }) as state_usaEnum,
      city: faker.location.city(),
      county: faker.location.county(),
      clerk_id: context => copycat.uuid(context.seed),
    })
  );

  const { user: admins } = await seed.user(x =>
    x(50, {
      email: context => copycat.email(context.seed),
      date_of_birth: faker.date.birthdate(),
      credit_score: context =>
        copycat.int(context.seed, {
          max: 820,
          min: 380,
        }),
      name: context => copycat.fullName(context.seed),
      phone: context => copycat.phoneNumber(context.seed),
      ssn: faker.string.numeric(9),
      address: faker.location.streetAddress(),
      address_line_2: faker.location.secondaryAddress(),
      zip_code: faker.location.zipCode(),
      state: faker.location.state({
        abbreviated: true,
      }) as state_usaEnum,
      city: faker.location.city(),
      county: faker.location.county(),
      clerk_id: context => copycat.uuid(context.seed),
    })
  );

  const { user: underwriters } = await seed.user(x =>
    x(500, {
      email: context => copycat.email(context.seed),
      date_of_birth: faker.date.birthdate(),
      credit_score: context =>
        copycat.int(context.seed, {
          max: 820,
          min: 380,
        }),
      name: context => copycat.fullName(context.seed),
      phone: context => copycat.phoneNumber(context.seed),
      ssn: faker.string.numeric(9),
      address: faker.location.streetAddress(),
      address_line_2: faker.location.secondaryAddress(),
      zip_code: faker.location.zipCode(),
      state: faker.location.state({
        abbreviated: true,
      }) as state_usaEnum,
      city: faker.location.city(),
      county: faker.location.county(),
      clerk_id: context => copycat.uuid(context.seed),
    })
  );

  // Do common stuff we can abstract for each org
  for (const [orgNumber, organization] of organizations.entries()) {
    const { org_admins, org_agents, org_borrowers, org_underwriters } =
      genUserGroups({
        underwriters,
        borrowers,
        agents,
        admins,
        orgNumber,
      });

    const organization_user = [
      ...org_underwriters,
      ...org_agents,
      ...org_admins,
      ...org_borrowers,
    ];

    const org_businesses = copycat
      // Pick some of the users for uat
      .someOf(orgNumber, [businesses.length / 2, businesses.length], businesses)
      .map(b => ({
        id: b.id,
      }));

    await seed.organization(
      x =>
        x(orgNumber, {
          clerk_id: 'org_2ko38RckCbvGDqbOE3WO4XXpjKP',
          id: organization,
          organization_user,
          organization_business: x =>
            x({
              min: businesses.length / 2,
              max: businesses.length,
            }),
        }),
      {
        connect: {
          business: businesses,
        },
      }
    );

    await seed[`${organization}_task_status`]([
      { id: 0, label: 'Backlog' },
      { id: 1, label: 'Todo' },
      { id: 2, label: 'In Progress' },
      { id: 3, label: 'In Review' },
      { id: 4, label: 'Done' },
      { id: 5, label: 'Cancelled' },
    ]);

    await seed[`${organization}_task_priority`]([
      { id: 0, label: 'Urgent' },
      { id: 1, label: 'High' },
      { id: 2, label: 'Medium' },
      { id: 3, label: 'Low' },
      { id: 4, label: 'No Priority' },
    ]);

    // Do more complex stuff per env for now
    // TODO: maybe figure out how to loop this but its also useful to create differences in orgs
    switch (organization) {
      case 'example_prod': {
        const { example_prod_deal_status } =
          await seed.example_prod_deal_status(
            deal_statuses.map((status, index) => ({
              label: status,
              order: index,
            }))
          );
        await seed.example_prod_opportunity(x =>
          x(500, ({ seed }) => ({
            assignee_id: copycat.oneOf(seed, organization_user).user_id,
            creator_id: copycat.oneOf(seed, organization_user).user_id,
            borrower_user_id: copycat.int(seed, {
              min: 0,
              max: 10,
            })
              ? copycat.oneOf(seed, org_borrowers).user_id
              : null,
            agent_id: copycat.int(seed, {
              min: 0,
              max: 10,
            })
              ? copycat.oneOf(seed, org_agents).user_id
              : null,
            borrower_business_id: copycat.int(seed, {
              min: 0,
              max: 1,
            })
              ? copycat.oneOf(seed, org_businesses).id
              : null,
            label: context =>
              copycat.int(context.seed, {
                min: 0,
                max: 1,
              })
                ? copycat.word(context.seed)
                : null,
            example_prod_deal: ({ seed }) => ({
              appetite: faker.number.int({
                max: 100,
                min: 0,
              }),
              creator_id: copycat.oneOf(seed, organization_user).user_id,
              interest_rate: Number.parseFloat(
                faker.number
                  .float({
                    fractionDigits: 6,
                    max: 0.07,
                    min: 0.035,
                  })
                  .toFixed(4)
              ),
              loan_amount: Number.parseFloat(
                faker.number
                  .float({
                    max: 10_000_000,
                    min: 100_000,
                  })
                  .toFixed(2)
              ),
              loan_processing_fee: Number.parseFloat(
                faker.number
                  .float({
                    fractionDigits: 2,
                    max: 3000,
                    min: 15,
                  })
                  .toFixed(2)
              ),
              source: faker.lorem.word(),
              ssbs_score: faker.number.int({
                max: 1000,
                min: 500,
              }),
              status_id: copycat.oneOf(seed, example_prod_deal_status).id,
              winnability: copycat.int(seed, {
                max: 100,
                min: 0,
              }),
            }),
          }))
        );
        break;
      }
      case 'example_uat': {
        // await seed.example_uat_opportunity(x =>
        //   x(500, {
        //     assignee_id: context =>
        //       copycat.oneOf(context.seed, organization_user).user_id,
        //     creator_id: context =>
        //       copycat.oneOf(context.seed, organization_user).user_id,
        //     borrower_user_id: context =>
        //       copycat.int(context.seed, {
        //         min: 0,
        //         max: 10,
        //       })
        //         ? copycat.oneOf(context.seed, org_borrowers).user_id
        //         : null,
        //     agent_id: context =>
        //       copycat.int(context.seed, {
        //         min: 0,
        //         max: 10,
        //       })
        //         ? copycat.oneOf(context.seed, org_agents).user_id
        //         : null,
        //     borrower_business_id: context =>
        //       copycat.int(context.seed, {
        //         min: 0,
        //         max: 1,
        //       })
        //         ? copycat.oneOf(context.seed, org_businesses).id
        //         : null,
        //     label: context =>
        //       copycat.int(context.seed, {
        //         min: 0,
        //         max: 1,
        //       })
        //         ? copycat.word(context.seed)
        //         : null,
        //     example_uat_deal: {
        //       appetite: faker.number.int({
        //         max: 100,
        //         min: 0,
        //       }),
        //       creator_id: context =>
        //         copycat.oneOf(context.seed, organization_user).user_id,
        //       interest_rate: Number.parseFloat(
        //         faker.number
        //           .float({
        //             fractionDigits: 6,
        //             max: 0.07,
        //             min: 0.035,
        //           })
        //           .toFixed(4)
        //       ),
        //       loan_amount: Number.parseFloat(
        //         faker.number
        //           .float({
        //             max: 10_000_000,
        //             min: 100_000,
        //           })
        //           .toFixed(2)
        //       ),
        //       loan_processing_fee: Number.parseFloat(
        //         faker.number
        //           .float({
        //             fractionDigits: 2,
        //             max: 3000,
        //             min: 15,
        //           })
        //           .toFixed(2)
        //       ),
        //       source: faker.lorem.word(),
        //       ssbs_score: faker.number.int({
        //         max: 1000,
        //         min: 500,
        //       }),
        //       status_id: context => copycat.oneOf(context.seed, deal_statuses),
        //       winnability: context =>
        //         copycat.int(context.seed, {
        //           max: 100,
        //           min: 0,
        //         }),
        //     },
        //   })
        // );
        break;
      }
    }
  }
}

const genUserGroups = ({
  underwriters,
  admins,
  borrowers,
  agents,
  orgNumber,
}: {
  admins: userScalars[];
  agents: userScalars[];
  underwriters: userScalars[];
  borrowers: userScalars[];
  orgNumber: number;
}) => ({
  org_admins: copycat
    // Pick some of the users for uat
    .someOf(orgNumber, [admins.length / 2, admins.length], admins)
    .map(u => ({
      user_id: u.id,
      role: 'organization_admin' as roleEnum,
    })),
  org_underwriters: copycat
    // Pick some of the users for uat
    .someOf(
      orgNumber,
      [underwriters.length / 2, underwriters.length],
      underwriters
    )
    .map(u => ({
      user_id: u.id,
      role: 'underwriter' as roleEnum,
    })),
  org_agents: copycat
    // Pick some of the users for uat
    .someOf(orgNumber, [agents.length / 2, agents.length], agents)
    .map(u => ({ user_id: u.id, role: 'agent' as roleEnum })),
  org_borrowers: copycat
    // Pick some of the users for uat
    .someOf(orgNumber, [borrowers.length / 2, borrowers.length], borrowers)
    .map(u => ({ user_id: u.id, role: 'borrower' as roleEnum })),
});

const genUniqueNumeric = (number: number, length: number) => {
  const set = new Set<string>();
  while (set.size < number) {
    set.add(faker.string.numeric(length));
  }
  return Array.from(set);
};

main()
  .then(() => {
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit();
  })
  .catch((error: unknown) => {
    console.error(error);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  });
