import { Waypoints } from 'lucide-react';
import Link from 'next/link';
import { useStore } from 'zustand';

import { Button } from '../button';

import type { MenuGroupItem } from './menu';
import { Menu } from './menu';
import { SidebarToggle } from './sidebar-toggle';
import { useSidebarToggle } from './use-sidebar-toggle';

import { cn } from '@repo/ui/utils';

export function Sidebar({
  brandName,
  menuDefinition,
  pathname,
}: Readonly<{
  menuDefinition: MenuGroupItem[];
  pathname: string;
  brandName: string;
}>) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const sidebar = useStore(useSidebarToggle, state => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0',
        sidebar.isOpen ? 'w-64' : 'w-[70px]'
      )}
    >
      <SidebarToggle isOpen={sidebar.isOpen} setIsOpen={sidebar.setIsOpen} />
      <div className="relative flex h-full flex-col overflow-y-auto border-r px-2 py-2">
        <Button
          className={cn(
            'mb-1 transition-transform duration-300 ease-in-out',
            sidebar.isOpen ? 'translate-x-0' : 'translate-x-1'
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <Waypoints className="h-6 w-6" />
            <h1
              className={cn(
                'whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out',
                sidebar.isOpen
                  ? 'translate-x-0 opacity-100'
                  : 'hidden -translate-x-96 opacity-0'
              )}
            >
              {brandName}
            </h1>
          </Link>
        </Button>
        <Menu
          isOpen={sidebar.isOpen}
          menuDefinition={menuDefinition}
          pathname={pathname}
        />
      </div>
    </aside>
  );
}
