import type { CustomCellRendererProps } from 'ag-grid-react';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import {
  CircleAlert,
  Dot,
  SignalHigh,
  SignalLow,
  SignalMedium,
} from 'lucide-react';

import type { TablesFoundation } from '~/lib/database/helpers';

const taskIdToIcon: Record<string, LucideIcon> = {
  '0': CircleAlert,
  '1': SignalHigh,
  '2': SignalMedium,
  '3': SignalLow,
  '4': Dot,
};

export default function TaskPriorityCell({
  format = 'full',
  value,
}: CustomCellRendererProps<unknown, TablesFoundation<'task_priority'>> & {
  format?: 'icon' | 'full';
}) {
  const { id, label } = value ?? {};

  if (id === undefined) return null;

  const Icon = taskIdToIcon[id] ?? Dot;

  return (
    <div className="flex h-full space-x-2">
      <div className="content-center">
        <Icon
          size={28}
          className={clsx(
            'p-1',
            id === 0
              ? 'text-background rounded-full bg-red-500'
              : 'text-muted-foreground'
          )}
        />
      </div>
      <div>{format === 'full' && label}</div>
    </div>
  );
}
