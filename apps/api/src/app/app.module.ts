import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TRPCModule } from 'nestjs-trpc';

import { AppRouter } from './app.router';

import { EnvModule, envSchema } from '~/config/env';
import { ViewRouter } from '~/view/view.router';
import { ViewModule } from '~/view/view.module';
import { DatabaseModule } from '~/database/database.module';
import getConfigService from '~/config/gcp-secrets/get-config-service';
import { QueryModule } from '~/query/query.module';
import { QueryRouter } from '~/query/query.router';

@Module({
  imports: [
    TRPCModule.forRoot({
      autoSchemaFile: './@generated',
    }),
    ConfigModule.forRoot({
      load: [getConfigService],
      validate: env => envSchema.parse(env),
      isGlobal: true,
    }),
    DatabaseModule,
    EnvModule,
    QueryModule,
    ViewModule,
  ],
  providers: [AppRouter, ViewRouter, QueryRouter],
})
export class AppModule {}
