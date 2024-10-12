'use client';

import type { MenuGroupItem } from './menu';
import { Sidebar } from './sidebar';
import { useSidebarToggle } from './use-sidebar-toggle';
import { useStore } from './use-store';

import { cn } from '@repo/ui/utils';

export default function SideBarLayout({
  brandName,
  children,
  menuDefinition,
  pathname,
}: Readonly<{
  menuDefinition: MenuGroupItem[];
  pathname: string;
  children: React.ReactNode;
  brandName: string;
}>) {
  const sidebar = useStore(useSidebarToggle, state => state);

  if (!sidebar) return null;

  return (
    <>
      <Sidebar
        menuDefinition={menuDefinition}
        pathname={pathname}
        brandName={brandName}
      />
      <main
        className={cn(
          'min-h-[calc(100vh_-_56px)] transition-[margin-left] duration-300 ease-in-out',
          sidebar.isOpen ? 'lg:ml-64' : 'lg:ml-[70px]'
        )}
      >
        {children}
      </main>
    </>
  );
}
