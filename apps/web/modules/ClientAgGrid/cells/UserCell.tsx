import type { CustomCellRendererProps } from 'ag-grid-react';
import clsx from 'clsx';
import { Copy } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import { Button } from '@repo/ui/components/button';
import { toast } from '@repo/ui/components/sonner';

import { stringToTailwindColor } from '~/modules/utils/tailwind';
import type { TablesFoundation } from '~/lib/database/helpers';

const UserCell = ({
  value,
}: CustomCellRendererProps<unknown, TablesFoundation<'q_user'>>) => {
  const { email, id, name } = value || {};
  return (
    <div className="flex items-center space-x-2 p-1">
      <div className="flex-shrink-0">
        <Avatar className="h-8 w-8">
          {/* TODO: add image to user model */}
          <AvatarImage src={undefined} alt="avatar" />
          <AvatarFallback
            className={clsx(
              'uppercase',
              stringToTailwindColor(id?.toString() ?? '')
            )}
          >
            {name
              ?.split(' ')
              .map(name => name[0])
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col">
        <div className="truncate text-xs font-medium">{name}</div>
        <Button
          variant="ghost"
          className="h-4 rounded-sm p-0 text-xs"
          iconLeft={<Copy size={12} />}
          onClick={async event => {
            event.preventDefault();
            event.stopPropagation();
            await navigator.clipboard.writeText(email ?? '');
            toast.info('Copied email to clipboard.');
          }}
        >
          {email}
        </Button>
      </div>
    </div>
  );
};

export default UserCell;
