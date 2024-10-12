import type { Knex } from 'knex';

// !IMPORTANT: You cannot change these and expect old models to update - these CANNOT not be modified

/**
 * Represents a model that can poosibly be linked to a copy in an external system.
 *
 * We should only support upsert on either our interal id or this external_id column
 */
export function withIds(knex: Knex, table: Knex.CreateTableBuilder) {
  table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
  table.text('external_id').nullable().unique();
}
