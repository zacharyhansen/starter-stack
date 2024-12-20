import { TiptapBasic, type TiptapBasicProps } from '../../tiptap';
import type { BaseFieldProps } from '../form-builder.types';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form';

export default function TiptapBasicField({
  name,
  label,
  description,
  ...props
}: Readonly<BaseFieldProps & TiptapBasicProps>) {
  return (
    <FormField
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <TiptapBasic {...props} {...field} />
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
