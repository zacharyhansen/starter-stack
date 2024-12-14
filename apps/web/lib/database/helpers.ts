import type { Database } from './database.types';

type FoundationSchema = Database[Extract<keyof Database, 'foundation'>];

export type TablesFoundation<
  FoundationTableNameOrOptions extends
    | keyof (FoundationSchema['Tables'] & FoundationSchema['Views'])
    | { schema: keyof Database },
  TableName extends FoundationTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[FoundationTableNameOrOptions['schema']]['Tables'] &
        Database[FoundationTableNameOrOptions['schema']]['Views'])
    : never = never,
> = FoundationTableNameOrOptions extends { schema: keyof Database }
  ? (Database[FoundationTableNameOrOptions['schema']]['Tables'] &
      Database[FoundationTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : FoundationTableNameOrOptions extends keyof (FoundationSchema['Tables'] &
        FoundationSchema['Views'])
    ? (FoundationSchema['Tables'] &
        FoundationSchema['Views'])[FoundationTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;
