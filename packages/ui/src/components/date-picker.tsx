'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '../utils';

import { Button } from './button';
import { Calendar, type CalendarProps } from './calendar';
import { Label } from './label';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import type { BaseInputPropsType } from './input.types';

export type DatePickerProps = CalendarProps &
  BaseInputPropsType & {
    label?: React.ReactNode;
    value?: Date;
    onChange: (value: Date) => void;
  };

export function DatePicker({
  label,
  mode = 'single',
  placeholder,
  value,
  onChange,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex flex-col space-y-2">
          {label ? <Label>{label}</Label> : null}
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !value && 'text-muted-foreground'
            )}
            type="button"
            disabled={props.disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? (
              format(value, 'PPP')
            ) : (
              <span>{placeholder ?? 'Pick a date'}</span>
            )}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode={mode}
          // @ts-expect-error this is always going to be date for now
          onSelect={currentValue => {
            onChange(currentValue === value ? '' : currentValue);
            setOpen(false);
          }}
          // @ts-expect-error this is always going to be date for now
          selected={value}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
}
