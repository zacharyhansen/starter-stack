import { Slider, type SliderProps } from '../../slider';
import type { BaseFieldProps } from '../form-builder.types';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form';

export default function SliderField({
  name,
  label,
  description,
  ...props
}: Readonly<BaseFieldProps & Omit<SliderProps, 'defaultValue'>>) {
  return (
    <FormField
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>
              {label} - {field.value}
            </FormLabel>
            <FormControl>
              <Slider
                {...props}
                onValueChange={vals => {
                  field.onChange(vals[0]);
                }}
                defaultValue={[field.value]}
              />
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
