import type { Knex } from 'knex';

// !IMPORTANT: You cannot change these and expect old models to update - these CANNOT not be modified

/**
 * Represents a model that can poosibly be linked to a copy in an external system.
 *
 * We should only support upsert on either our interal id or this external_id column
 */
export function withUSAddress(knex: Knex, table: Knex.CreateTableBuilder) {
  table.text('address').nullable();
  table.text('address_line_2').nullable();
  table.string('city').nullable();
  table.string('zip_code').nullable();
  table.specificType('state', 'state_usa').nullable();
  table.text('county').nullable();
}
