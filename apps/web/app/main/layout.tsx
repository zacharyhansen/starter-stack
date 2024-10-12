'use client';

import {
  ClerkLoaded,
  OrganizationSwitcher,
  SignedIn,
  UserButton,
} from '@clerk/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  Component,
  Goal,
  Handshake,
  Layers3,
  LayoutDashboard,
  ListTodo,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type MenuGroupItem } from '@repo/ui/components/sidebar/menu';
import SideBarLayout from '@repo/ui/components/sidebar/side-bar-layout';
import Navbar from '@repo/ui/components/sidebar/navbar';
import MediaProvider from '@repo/ui/providers/media-provider';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@repo/ui/providers/theme-provider';
import { Toaster } from '@repo/ui/components/sonner';
import { Button } from '@repo/ui/components/button';
import { httpBatchLink, httpLink } from '@trpc/client';

import ThemeButton from './ThemeButton';

import { DEALS, GOALS, HOME, LAYOUTS, TASKS, VIEWS } from '~/constants/routes';
import { trpc } from '~/lib/trpc';
import { clientEnvironment } from '~/lib/env/clientEnvironment';

const queryClient = new QueryClient();

const trpcClient = trpc.createClient({
  links: [
    httpLink({
      url: `${clientEnvironment.NEXT_PUBLIC_CORE_SERVER_URL}/trpc`,
      // transformer,
    }),
    httpBatchLink({
      url: `${clientEnvironment.NEXT_PUBLIC_CORE_SERVER_URL}/trpc`,
    }),
  ],
});

const menuDefinition: MenuGroupItem[] = [
  {
    menus: [
      {
        href: HOME,
        icon: LayoutDashboard,
        label: 'Home',
      },
    ],
  },
  {
    groupLabel: 'My Work',
    menus: [
      {
        href: TASKS,
        icon: ListTodo,
        label: 'Tasks',
      },
      {
        href: DEALS,
        icon: Handshake,
        label: 'Deals',
      },
    ],
  },
  {
    groupLabel: 'Configure',
    menus: [
      {
        href: VIEWS,
        icon: Layers3,
        label: 'Views',
        submenus: [
          {
            href: 'todo',
            label: 'Tables',
          },
          {
            href: 'todo',
            label: 'Rules',
          },
        ],
      },
      {
        href: LAYOUTS,
        icon: Component,
        label: 'Layouts',
      },
      {
        href: GOALS,
        icon: Goal,
        label: 'Goals',
      },
    ],
  },
];

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <ClerkLoaded>
      <MediaProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false} />
              <Toaster />
              {/* <CurrentUserProvider> */}
              <SideBarLayout
                brandName="odigos.ai"
                pathname={pathname}
                menuDefinition={menuDefinition}
              >
                <Navbar pathname={pathname} menuDefinition={menuDefinition}>
                  <OrganizationSwitcher />
                  <UserProfileButton />
                  <ThemeButton />
                </Navbar>
                <div className="px-4 pb-8 pt-8 sm:px-8">{children}</div>
              </SideBarLayout>
              {/* </CurrentUserProvider> */}
            </QueryClientProvider>
          </trpc.Provider>
        </ThemeProvider>
      </MediaProvider>
    </ClerkLoaded>
  );
}

interface ISideBarItem {
  label: string;
  icon: ReactNode;
  href: string;
}

interface SideBarItemProps {
  item: ISideBarItem;
}

const SideBarItem = ({ item }: SideBarItemProps) => {
  const pathname = usePathname();

  return (
    <Link key={item.href} href={item.href}>
      <Button
        variant={pathname.includes(item.href) ? 'secondary' : 'ghost'}
        className="w-48 justify-start"
        size="sm"
        iconLeft={item.icon}
      >
        {item.label}
      </Button>
    </Link>
  );
};

const UserProfileButton = () => {
  return (
    <SignedIn>
      <UserButton />
    </SignedIn>
  );
};
