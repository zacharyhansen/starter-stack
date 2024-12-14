import { Kysely } from 'kysely';
import type { DB } from 'kysely-codegen';

type DatabaseMultiTenant<T> = {
  [K in keyof T as K extends `foundation.${infer Table}` ? Table : never]: T[K];
} & {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [K in keyof T as K extends `foundation.${infer Table}` ? never : K]: T[K];
};

export type TDatabase = DatabaseMultiTenant<
  DB & {
    // Manually add some system catalog objects that kysely doesnt seem to include by default
    pg_views: {
      schemaname: string;
      viewname: string;
      definition: string;
      viewowner: string;
    };
  }
>;

export class Database extends Kysely<TDatabase> {}
