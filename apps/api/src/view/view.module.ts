import { Module } from '@nestjs/common';

import { ViewService } from './view.service';

import { DatabaseModule } from '~/database/database.module';
import { QueryModule } from '~/query/query.module';

@Module({
  exports: [ViewService],
  imports: [DatabaseModule, QueryModule],
  providers: [ViewService],
})
export class ViewModule {}
