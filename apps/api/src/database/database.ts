import { Kysely } from 'kysely';
import type { Database as TDatabase } from '@repo/postgres-types';

export class Database extends Kysely<TDatabase> {}
