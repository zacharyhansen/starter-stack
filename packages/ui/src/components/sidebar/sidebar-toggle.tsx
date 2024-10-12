import { ChevronLeft } from 'lucide-react';

import { Button } from '../button';

import { cn } from '@repo/ui/utils';

interface SidebarToggleProps {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}

export function SidebarToggle({
  isOpen,
  setIsOpen,
}: Readonly<SidebarToggleProps>) {
  return (
    <div className="invisible absolute -right-[12px] top-[12px] z-20 lg:visible">
      <Button
        onClick={() => setIsOpen?.()}
        className="h-6 w-6 rounded-full"
        variant="outline"
        size="icon"
      >
        <ChevronLeft
          className={cn(
            'h-4 w-4 transition-transform duration-700 ease-in-out',
            isOpen === false ? 'rotate-180' : 'rotate-0'
          )}
        />
      </Button>
    </div>
  );
}
