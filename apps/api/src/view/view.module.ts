import { Module } from '@nestjs/common';

import { ViewRouter } from './view.router';

@Module({
  exports: [ViewRouter],
  imports: [],
  providers: [ViewRouter],
})
export class ViewModule {}
