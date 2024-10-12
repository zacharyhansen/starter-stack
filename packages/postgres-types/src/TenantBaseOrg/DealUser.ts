// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import type { ColumnType, Selectable, Insertable, Updateable } from 'kysely';

import type { UserId } from '../Public/User';

import type { DealId } from './Deal';

/** Identifier type for tenant_base_org.deal_user */
export type DealUserId = string & { __brand: 'DealUserId' };

/**
 * PUBLIC:
 * Represents the table tenant_base_org.deal_user
 */
export default interface DealUserTable {
  /** Database type: pg_catalog.uuid */
  id: ColumnType<DealUserId, DealUserId | undefined, DealUserId>;

  /** Database type: pg_catalog.timestamptz */
  created_at: ColumnType<Date, Date | string | undefined, Date | string>;

  /** Database type: pg_catalog.timestamptz */
  updated_at: ColumnType<Date, Date | string | undefined, Date | string>;

  /** Database type: pg_catalog.uuid */
  user_id: ColumnType<UserId, UserId, UserId>;

  /** Database type: pg_catalog.uuid */
  deal_id: ColumnType<DealId, DealId, DealId>;
}

export type DealUser = Selectable<DealUserTable>;

export type NewDealUser = Insertable<DealUserTable>;

export type DealUserUpdate = Updateable<DealUserTable>;