'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '../utils';

import type { BaseInputProps } from './input.types';

import { Button } from '@repo/ui/components/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@repo/ui/components/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/popover';

export interface Option {
  label: React.ReactNode;
  value: string;
}

export interface ComboboxProps extends BaseInputProps {
  options: Option[];
  value?: string;
  onChange: (value?: string) => void;
}

const Combobox = React.forwardRef<HTMLButtonElement, Readonly<ComboboxProps>>(
  ({ options, placeholder, disabled, value, onChange }, ref) => {
    const [open, setOpen] = React.useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full min-w-[240px] justify-between"
            ref={ref}
          >
            {value
              ? options.find(option => option.value === value)?.label
              : (placeholder ?? 'Select...')}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={placeholder ?? 'Search...'} />
            <CommandList>
              <CommandEmpty>No results.</CommandEmpty>
              <CommandGroup>
                {options.map(option => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={currentValue => {
                      onChange(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === option.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

Combobox.displayName = 'Combobox';

export { Combobox };
