import type { CustomCellRendererProps } from 'ag-grid-react';
import type { DealStatus } from '@repo/postgres-types';
import { Badge } from '@repo/ui/components/badge';

export default function DealStatusCell({
  value,
}: CustomCellRendererProps<unknown, DealStatus> & {
  statusCount?: number;
}) {
  const { id, label } = value ?? {};

  if (id === undefined) return null;

  return <Badge>{label}</Badge>;
}
