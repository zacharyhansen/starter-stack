import { useFormContext } from 'react-hook-form';

import { Combobox, type ComboboxProps } from '../../combobox';
import type { BaseFieldProps } from '../form-builder.types';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form';

/**
 * CONTROLLED
 */
export default function ComboboxField({
  name,
  label,
  description,
  ...props
}: Readonly<BaseFieldProps & Pick<ComboboxProps, 'options' | 'placeholder'>>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div>
                <Combobox
                  {...props}
                  {...field}
                  onChange={value => {
                    form.setValue(name, value);
                  }}
                />
              </div>
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
