import * as React from 'react';

import { Label } from './label';
import type { BaseInputProps } from './input.types';

import { cn } from '@repo/ui/utils';

export interface InputProps
  extends BaseInputProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  actionElement?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, actionElement, ...props }, ref) => {
    useDisableNumberInputScroll();

    return (
      <div className="items-center gap-1.5">
        {label ? <Label htmlFor={props.id}>{label}</Label> : null}
        <div className="flex items-center space-x-2">
          <input
            type={type}
            className={cn(
              'border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            autoComplete="off"
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

const useDisableNumberInputScroll = () => {
  // Use the useEffect hook to manage side effects
  React.useEffect(() => {
    // Define a function to prevent the default scroll behavior
    const handleWheel = (event: { preventDefault: () => void }) => {
      event.preventDefault();
    };

    // Find all number input elements in the document
    const numberInputs = document.querySelectorAll('input[type="number"]');

    // Attach the handleWheel function as an event listener to each number input
    for (const input of numberInputs) {
      input.addEventListener('wheel', handleWheel, { passive: false });
    }

    // Clean up by removing the event listeners when the component unmounts
    return () => {
      for (const input of numberInputs) {
        input.removeEventListener('wheel', handleWheel);
      }
    };
  }, []); // The empty dependency array ensures that this effect runs once, like componentDidMount
};
