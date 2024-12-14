import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { z } from 'zod';
import { Inject } from '@nestjs/common';

import { ViewService, type ColumnEnabledRecord } from './view.service';

@Router({ alias: 'view' })
export class ViewRouter {
  constructor(@Inject(ViewService) private viewService: ViewService) {}

  @Query({
    input: z.object({ name: z.string() }),
    output: z.any(),
  })
  columnByRoleView(@Input('name') name: string) {
    return this.viewService.columnsByRoleView({ name });
  }

  @Mutation({
    input: z.object({
      name: z.string(),
      columnEnabledRecords: z
        .object({
          column_name: z.string(),
        })
        .catchall(z.any())
        .array(),
    }),
    output: z.literal('ok'),
  })
  async mutateViewsForRoles(
    @Input('name') name: string,
    @Input('columnEnabledRecords') columnEnabledRecords: ColumnEnabledRecord[]
  ) {
    await this.viewService.mutateViewsForRoles({ name, columnEnabledRecords });
    return 'ok';
  }
}
