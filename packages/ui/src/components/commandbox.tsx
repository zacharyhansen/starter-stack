'use client';
import * as React from 'react';
import { CheckIcon } from '@radix-ui/react-icons';
import type { LucideIcon } from 'lucide-react';

import { useHotkeys } from '../hooks/use-hot-keys';
import { cn } from '../utils';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/popover';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@repo/ui/components/command';
import { Button } from '@repo/ui/components/button';

interface CommandOption {
  value: string;
  label: string;
  icon: LucideIcon;
}

export interface CommandBoxProps {
  commandOptions: CommandOption[];
  commandKey?: string;
  placeholder?: React.ReactNode;
}

export const CommandBox = ({
  commandOptions,
  commandKey = 'P',
  placeholder = 'Select...',
}: CommandBoxProps) => {
  const [openPopover, setOpenPopover] = React.useState(false);

  const [selectedCommand, setSelectedCommand] =
    React.useState<CommandOption | null>(null);

  const [searchValue, setSearchValue] = React.useState('');

  const isSearching = searchValue.length > 0;

  useHotkeys([
    [
      commandKey,
      () => {
        setOpenPopover(true);
      },
    ],
  ]);

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <Button
          aria-label="Select"
          variant="outline"
          size="sm"
          className="h-8 w-fit px-2 text-[0.8125rem] font-medium leading-normal"
        >
          {selectedCommand ? (
            <div className="flex space-x-2">
              <selectedCommand.icon
                className={cn('mr-2 size-4')}
                aria-hidden="true"
              />
              {selectedCommand.label}
              <Kbd commandKey={commandKey} />
            </div>
          ) : (
            <div className="flex space-x-2">
              <span>{placeholder}</span> <Kbd commandKey={commandKey} />
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[206px] rounded-lg p-0"
        align="start"
        onCloseAutoFocus={event => {
          event.preventDefault();
        }}
        sideOffset={6}
      >
        <Command className="rounded-lg">
          <CommandInput
            value={searchValue}
            onValueChange={searchValue => {
              const key = Number.parseInt(searchValue);
              // If the user types a number, select the command like useHotkeys
              if (key >= 0 && key < commandOptions.length) {
                setSelectedCommand(commandOptions[key] ?? null);
                setOpenPopover(false);
                setSearchValue('');
                return;
              }
              setSearchValue(searchValue);
            }}
            className="text-[0.8125rem] leading-normal"
            placeholder="Search..."
          />
          <CommandList>
            <CommandGroup>
              {commandOptions.map((option, index) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={value => {
                    setSelectedCommand(
                      commandOptions.find(p => p.value === value) ?? null
                    );
                    setOpenPopover(false);
                    setSearchValue('');
                  }}
                  className="text-primary group flex w-full items-center justify-between rounded-md text-[0.8125rem] leading-normal"
                >
                  <div className="flex items-center">
                    <option.icon className="mr-2 size-4" />
                    <span>{option.label}</span>
                  </div>
                  <div className="flex items-center">
                    {selectedCommand?.value === option.value && (
                      <CheckIcon
                        id="Check"
                        className="fill-muted-foreground group-hover:fill-primary mr-3 size-4"
                      />
                    )}
                    {!isSearching && <span className="text-xs">{index}</span>}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const Kbd = ({ commandKey }: { commandKey: string }) => {
  return (
    <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
      {commandKey}
    </kbd>
  );
};
