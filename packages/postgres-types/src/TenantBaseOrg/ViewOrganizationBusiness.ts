// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import type { ColumnType, Selectable } from 'kysely';

import type { BusinessId } from '../Public/Business';
import type { default as StateUsa } from '../Public/StateUsa';

/**
 * PUBLIC:
 * Represents the view tenant_base_org.view_organization_business
 */
export default interface ViewOrganizationBusinessTable {
  /** Database type: pg_catalog.uuid */
  id: ColumnType<BusinessId, never, never>;

  /** Database type: pg_catalog.text */
  external_id: ColumnType<string, never, never>;

  /** Database type: pg_catalog.timestamptz */
  created_at: ColumnType<Date, never, never>;

  /** Database type: pg_catalog.timestamptz */
  updated_at: ColumnType<Date, never, never>;

  /** Database type: pg_catalog.text */
  address: ColumnType<string, never, never>;

  /** Database type: pg_catalog.text */
  address_line_2: ColumnType<string, never, never>;

  /** Database type: pg_catalog.varchar */
  city: ColumnType<string, never, never>;

  /** Database type: pg_catalog.varchar */
  zip_code: ColumnType<string, never, never>;

  /** Database type: public.state_usa */
  state: ColumnType<StateUsa, never, never>;

  /** Database type: pg_catalog.text */
  county: ColumnType<string, never, never>;

  /** Database type: pg_catalog.varchar */
  email: ColumnType<string, never, never>;

  /** Database type: pg_catalog.text */
  name_display: ColumnType<string, never, never>;

  /** Database type: pg_catalog.text */
  name_legal: ColumnType<string, never, never>;

  /** Database type: pg_catalog.varchar */
  duns: ColumnType<string, never, never>;

  /** Database type: pg_catalog.varchar */
  dba: ColumnType<string, never, never>;

  /** Database type: pg_catalog.varchar */
  tin: ColumnType<string, never, never>;

  /** Database type: pg_catalog.text */
  phone: ColumnType<string, never, never>;

  /** Database type: pg_catalog.text */
  business_type: ColumnType<string, never, never>;

  /** Database type: pg_catalog.text */
  industry: ColumnType<string, never, never>;

  /** Database type: pg_catalog.date */
  date_business_began: ColumnType<Date, never, never>;

  /** Database type: pg_catalog.float8 */
  revenue_average: ColumnType<number, never, never>;

  /** Database type: pg_catalog.float8 */
  debt: ColumnType<number, never, never>;
}

export type ViewOrganizationBusiness =
  Selectable<ViewOrganizationBusinessTable>;
