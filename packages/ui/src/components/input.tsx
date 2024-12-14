import * as React from 'react';

import { Label } from './label';
import { Button } from './button';

import { cn } from '@repo/ui/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  actionElement?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, actionElement, ...props }, ref) => {
    return (
      <div className="grid w-full items-center gap-1.5">
        {label ? <Label htmlFor={props.id}>{label}</Label> : null}
        <div className="flex w-full max-w-sm items-center space-x-2">
          <input
            type={type}
            className={cn(
              'border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            ref={ref}
            {...props}
          />
          {actionElement ?? null}
        </div>
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
