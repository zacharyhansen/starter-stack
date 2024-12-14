import type { CustomCellRendererProps } from 'ag-grid-react';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import {
  Circle,
  CircleCheckBig,
  CircleEllipsis,
  CircleX,
  Dot,
  Loader,
  ScanEye,
} from 'lucide-react';

import type { TablesFoundation } from '~/lib/database/helpers';

const statusIdToIcon: Record<string, LucideIcon> = {
  '0': Loader,
  '1': Circle,
  '2': CircleEllipsis,
  '3': ScanEye,
  '4': CircleCheckBig,
  '5': CircleX,
};

export default function TaskStatusCell({
  format = 'full',
  value,
}: CustomCellRendererProps<unknown, TablesFoundation<'task_status'>> & {
  format?: 'icon' | 'full';
}) {
  const { id, label } = value ?? {};

  if (id === undefined) return null;

  const Icon = statusIdToIcon[id] ?? Dot;

  return (
    <div className="flex h-full space-x-2">
      <div className="content-center">
        <Icon
          size={28}
          className={clsx(
            'rounded-full stroke-2 p-1',
            id === 2 ? 'bg-yellow-500 text-white' : 'text-muted-foreground',
            id === 3 ? 'bg-green-500 text-white' : 'text-muted-foreground',
            id === 4 ? 'bg-primary' : 'text-muted-foreground'
          )}
        />
      </div>
      <div>{format === 'full' && label}</div>
    </div>
  );
}
