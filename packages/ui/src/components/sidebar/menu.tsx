'use client';

import type { LucideIcon } from 'lucide-react';
import { Ellipsis } from 'lucide-react';
import Link from 'next/link';

import { Button } from '../button';
import { ScrollArea } from '../scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../tooltip';

import { CollapseMenuButton } from './collapse-menu-button';

import { cn } from '@repo/ui/utils';

export interface MenuGroupItem {
  groupLabel?: string;
  menus: MenuItem[];
}

interface MenuItem {
  href: string;
  icon: LucideIcon;
  label: string;
  submenus?: SubMenuItem[];
}

export interface SubMenuItem {
  href: string;
  label: string;
}

interface MenuProps {
  isOpen: boolean | undefined;
  pathname: string;
  menuDefinition: MenuGroupItem[];
}

export function Menu({
  isOpen,
  menuDefinition,
  pathname,
}: Readonly<MenuProps>) {
  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="h-full w-full">
        <ul className="flex flex-col items-start space-y-1 px-1">
          {menuDefinition.map(({ groupLabel, menus }, index) => (
            <li className={cn('w-full', groupLabel ? 'pt-4' : '')} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-muted-foreground max-w-[248px] truncate px-4 pb-2 text-sm">
                  {groupLabel}
                </p>
              ) : // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
              !isOpen && isOpen != undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="flex w-full items-center justify-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(({ href, icon: Icon, label, submenus }, index) =>
                submenus?.length ? (
                  <div className="w-full" key={index}>
                    <CollapseMenuButton
                      icon={Icon}
                      label={label}
                      active={pathname.includes(href)}
                      submenus={submenus}
                      isOpen={isOpen}
                      pathname={pathname}
                    />
                  </div>
                ) : (
                  <div className="w-full" key={index}>
                    <TooltipProvider disableHoverableContent>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={
                              pathname.includes(href) ? 'secondary' : 'ghost'
                            }
                            className="mb-1 h-10 w-full justify-start p-3.5"
                            asChild
                          >
                            <Link href={href}>
                              <span
                                className={cn(isOpen === false ? '' : 'mr-4')}
                              >
                                <Icon
                                  size={18}
                                  className="text-muted-foreground"
                                />
                              </span>
                              <p
                                className={cn(
                                  'max-w-[200px] truncate',
                                  isOpen === false
                                    ? '-translate-x-96 opacity-0'
                                    : 'translate-x-0 opacity-100'
                                )}
                              >
                                {label}
                              </p>
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        {isOpen === false && (
                          <TooltipContent side="right">{label}</TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )
              )}
            </li>
          ))}
        </ul>
      </nav>
    </ScrollArea>
  );
}
