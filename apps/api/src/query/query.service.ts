import { Inject, Injectable } from '@nestjs/common';
import type { CompiledQuery } from 'kysely';
import type { Pool } from 'pg';

import { Database } from '~/database/database';

@Injectable()
export class QueryService {
  constructor(
    @Inject(Database) private readonly database: Database,
    @Inject('PoolReadOnly') private readonly poolReadOnly: Pool
  ) {}

  async execute<T extends unknown[] = unknown[]>({
    query,
  }: {
    query: CompiledQuery;
  }) {
    return await this.poolReadOnly.query<T>(
      {
        rowMode: 'array',
        text: query.sql,
      },
      query.parameters as unknown[]
    );
  }
}
