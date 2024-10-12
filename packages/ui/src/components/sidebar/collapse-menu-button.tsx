'use client';

import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu';
import type { LucideIcon } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '../button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../tooltip';

import type { SubMenuItem } from './menu';

import { cn } from '@repo/ui/utils';

interface CollapseMenuButtonProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  submenus: SubMenuItem[];
  isOpen?: boolean;
  pathname: string;
}

export function CollapseMenuButton({
  active,
  icon: Icon,
  isOpen,
  label,
  pathname,
  submenus,
}: CollapseMenuButtonProps) {
  const isSubmenuActive = submenus.some(submenu =>
    pathname.includes(submenu.href)
  );
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);

  return isOpen ? (
    <Collapsible
      open={isCollapsed}
      onOpenChange={setIsCollapsed}
      className="w-full"
    >
      <CollapsibleTrigger
        className="mb-1 [&[data-state=open]>div>div>svg]:rotate-180"
        asChild
      >
        <Button
          variant={active ? 'secondary' : 'ghost'}
          className="h-10 w-full justify-start"
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <span className="mr-4">
                <Icon size={18} className="text-muted-foreground" />
              </span>
              <p
                className={cn(
                  'max-w-[150px] truncate',
                  'translate-x-0 opacity-100'
                )}
              >
                {label}
              </p>
            </div>
            <div
              className={cn('whitespace-nowrap', 'translate-x-0 opacity-100')}
            >
              <ChevronDown
                size={18}
                className="transition-transform duration-200"
              />
            </div>
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down w-full overflow-hidden">
        <div className="ml-6 w-full border-l-2">
          {submenus.map(({ href, label }, index) => (
            <Button
              key={index}
              variant={active ? 'secondary' : 'ghost'}
              className="mb-1 ml-2 h-10 w-full justify-start"
              asChild
            >
              <Link href={href}>{label}</Link>
            </Button>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  ) : (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant={active ? 'secondary' : 'ghost'}
                className="mb-1 h-10 w-full justify-start"
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <span className={cn(isOpen === false ? '' : 'mr-4')}>
                      <Icon size={18} />
                    </span>
                    <p
                      className={cn(
                        'max-w-[200px] truncate',
                        isOpen === false ? 'opacity-0' : 'opacity-100'
                      )}
                    >
                      {label}
                    </p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" alignOffset={2}>
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent side="right" sideOffset={25} align="start">
        <DropdownMenuLabel className="max-w-[190px] truncate">
          {label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {submenus.map(({ href, label }, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link className="cursor-pointer" href={href}>
              <p className="max-w-[180px] truncate">{label}</p>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuArrow className="fill-border" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
