import { SeedPg } from '@snaplet/seed/adapter-pg';
import { defineConfig } from '@snaplet/seed/config';
import { Client } from 'pg';

export default defineConfig({
  adapter: async () => {
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
    return new SeedPg(client);
  },
  // TODO: This doesnt seem to work
  select: [
    '!*_prisma_migrations',
    // We want to alter all the tables under public schema
    'public*',
    // We also want to alter some of the tables under the auth schema
    'auth.*',
  ],
});
