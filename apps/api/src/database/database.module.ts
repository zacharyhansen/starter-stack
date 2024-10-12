import { Global, Module } from '@nestjs/common';
import { CamelCasePlugin, PostgresDialect } from 'kysely';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

import { Database } from './database';

import { fetchGCPSecrets } from '~/config/gcp-secrets/fetchSecrets';

@Global()
@Module({
  exports: [Database],
  providers: [
    {
      inject: [ConfigService],
      provide: Database,
      useFactory: async (configService: ConfigService) => {
        if (configService.get('SECRET_SOURCE') === 'LOCAL') {
          return new Database({
            dialect: new PostgresDialect({
              pool: new Pool({
                database: process.env.DATABASE_NAME,
                host: process.env.DATABASE_HOST,
                password: process.env.DATABASE_PASSWORD,
                port: Number.parseInt(process.env.DATABASE_PORT!.toString()),
                user: process.env.DATABASE_USER,
              }),
            }),
            plugins: [new CamelCasePlugin()],
          });
        }

        const secrets = await fetchGCPSecrets();

        return new Database({
          dialect: new PostgresDialect({
            pool: new Pool({
              database: secrets.DATABASE_NAME,
              host: secrets.DATABASE_HOST,
              password: secrets.DATABASE_PASSWORD,
              port: Number.parseInt(secrets.DATABASE_PORT!.toString()),
              user: secrets.DATABASE_USER,
            }),
          }),
          plugins: [new CamelCasePlugin()],
        });
      },
    },
  ],
})
export class DbModule {}
