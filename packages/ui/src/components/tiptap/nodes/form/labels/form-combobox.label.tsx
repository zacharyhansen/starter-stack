import type { NodeViewProps } from '@tiptap/core';
import { NodeViewWrapper } from '@tiptap/react';
import { z } from 'zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { DragHandleDots2Icon } from '@radix-ui/react-icons';
import { Trash2Icon } from 'lucide-react';

import type { ComboboxNodeAttributes } from '../types';

import {
  Footer,
  Header,
  InfoAndDeleteIcons,
  LabelInput,
  OptionsIcon,
  PencilIcon,
} from './common';
import { useFormLabel } from './use-form-label';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@repo/ui/components/form';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogBody,
} from '@repo/ui/components/reponsive-dialog';
import InputField from '@repo/ui/components/form-builder/fields/input.field';
import SwitchField from '@repo/ui/components/form-builder/fields/switch.field';
import { Switch } from '@repo/ui/components/switch';
import { Label } from '@repo/ui/components/label';
import TextareaField from '@repo/ui/components/form-builder/fields/textarea.field';
import { ComboboxOptionSchema } from '@repo/ui/components/combobox';
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from '@repo/ui/components/sortable';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';

const formSchema = z.object({
  name: z.string().min(5),
  label: z.string().min(1),
  defaultValue: z.string().optional(),
  description: z.string(),
  placeholder: z.string().optional(),
  required: z.boolean(),
  nameLocked: z.boolean(),
  options: z.array(ComboboxOptionSchema),
});

const OptionsFormSchema = z.object({
  options: z
    .array(ComboboxOptionSchema)
    .min(1, 'At least one option is required'),
});

// const useOptionsList = (initialOptions: ComboboxOption[] = []) => {
//   const [options, setOptions] = useState<ComboboxOption[]>(initialOptions);

//   const addOption = () => {
//     setOptions([...options, { label: '', value: '' }]);
//   };

//   const updateOption = (index: number, updatedOption: ComboboxOption) => {
//     const newOptions = [...options];
//     newOptions[index] = updatedOption;
//     setOptions(newOptions);
//   };

//   const deleteOption = (index: number) => {
//     setOptions(options.filter((_, index_) => index_ !== index));
//   };

//   const clearOptions = () => {
//     setOptions([]);
//   };

//   return { options, addOption, updateOption, deleteOption, clearOptions };
// };

export const FormComboboxLabel = (props: NodeViewProps) => {
  const { node, editor } = props;

  const {
    label,
    required,
    name,
    defaultValue,
    description,
    placeholder,
    nameLocked,
    options,
  } = node.attrs as ComboboxNodeAttributes;

  const { isEditable } = editor;

  const [open, setOpen] = useState(false);

  const { form, handleSubmit, handleKeyDown, handleOpen } = useFormLabel({
    schema: formSchema,
    setOpen,
    defaultValues: {
      name,
      label,
      defaultValue,
      description,
      placeholder,
      required,
      nameLocked,
    },
    ...props,
  });
  const { formState } = form;

  // Options Stuff
  const [optionsOpen, setOptionsOpen] = useState(false);

  const optionsForm = useForm<z.infer<typeof OptionsFormSchema>>({
    resolver: zodResolver(OptionsFormSchema),
    defaultValues: {
      options,
    },
  });

  const { fields, append, move, remove } = useFieldArray({
    control: optionsForm.control,
    name: 'options',
  });

  return (
    <NodeViewWrapper className="relative flex min-h-[18.5px] items-center text-lg font-medium text-gray-900">
      <LabelInput {...props} onKeyDown={handleKeyDown} />
      <div className="ml-auto flex transform gap-1 opacity-0 group-hover:opacity-100">
        {isEditable ? (
          <>
            <ResponsiveDialog open={open} onOpenChange={handleOpen}>
              <PencilIcon />
              <ResponsiveDialogContent>
                <FormProvider {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="flex-flex-col space-y-4"
                  >
                    <Header />
                    <ResponsiveDialogBody className="flex flex-col space-y-2">
                      <SwitchField
                        name="required"
                        label="Required"
                        description="Is a value required for this field to submit?."
                      />
                      <InputField
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                        autoFocus
                        name="label"
                        label="Label"
                        description="The label of the field."
                      />
                      <InputField
                        name="name"
                        label={
                          <div className="flex items-center">
                            <Label htmlFor="name">Slug</Label>
                            <div className="ml-auto">
                              <FormField
                                name="nameLocked"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-center space-x-2">
                                    <FormLabel>Locked?</FormLabel>
                                    <FormControl>
                                      <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        }
                        description="This is the slug/key the value will appear under in the submit payload of the form. It must follow the 'snake_case' convention. Lock the field if you want it to remain the same when changing the label."
                      />
                      <TextareaField
                        name="description"
                        label="Description"
                        description="The description of the field that describes its purppose/context."
                      />
                      <InputField
                        name="placeholder"
                        label="Placeholder"
                        description="The muted value that shows in the field when it is empty."
                      />
                      <InputField
                        name="defaultValue"
                        label="Default Value"
                        description="A value to pre-populate the field with when the form is loaded."
                      />
                    </ResponsiveDialogBody>
                    <Footer isDirty={formState.isDirty} setOpen={setOpen} />
                  </form>
                </FormProvider>
              </ResponsiveDialogContent>
            </ResponsiveDialog>
            <ResponsiveDialog open={optionsOpen} onOpenChange={setOptionsOpen}>
              <OptionsIcon />
              <ResponsiveDialogContent>
                <FormProvider {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="flex-flex-col space-y-4"
                  >
                    <Header />
                    <ResponsiveDialogBody className="flex flex-col space-y-2">
                      <Sortable
                        value={fields}
                        onMove={({ activeIndex, overIndex }) => {
                          move(activeIndex, overIndex);
                        }}
                        overlay={
                          <div className="grid grid-cols-[0.5fr,1fr,auto,auto] items-center gap-2">
                            <div className="bg-primary/10 h-8 w-full rounded-sm" />
                            <div className="bg-primary/10 h-8 w-full rounded-sm" />
                            <div className="bg-primary/10 size-8 shrink-0 rounded-sm" />
                            <div className="bg-primary/10 size-8 shrink-0 rounded-sm" />
                          </div>
                        }
                      >
                        <div className="flex w-full flex-col gap-2 py-1">
                          <div className="grid grid-cols-[0.5fr,1fr,auto,auto] items-center gap-2">
                            <div>Label</div>
                            <div>Value</div>
                          </div>
                          {fields.map((option, index) => (
                            <SortableItem
                              key={option.id}
                              value={option.id}
                              asChild
                            >
                              <div className="grid grid-cols-[0.5fr,1fr,auto,auto] items-center gap-2">
                                <FormField
                                  control={form.control}
                                  name={`options.${index}.label`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input className="h-8" {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name={`options.${index}.value`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input className="h-8" {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <SortableDragHandle
                                  variant="outline"
                                  size="icon"
                                  className="size-8 shrink-0"
                                >
                                  <DragHandleDots2Icon
                                    className="size-4"
                                    aria-hidden="true"
                                  />
                                </SortableDragHandle>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="size-8 shrink-0"
                                  onClick={() => {
                                    remove(index);
                                  }}
                                >
                                  <Trash2Icon
                                    className="text-destructive size-4"
                                    aria-hidden="true"
                                  />
                                  <span className="sr-only">Remove</span>
                                </Button>
                              </div>
                            </SortableItem>
                          ))}
                        </div>
                      </Sortable>
                    </ResponsiveDialogBody>
                    <Footer isDirty={formState.isDirty} setOpen={setOpen} />
                  </form>
                </FormProvider>
              </ResponsiveDialogContent>
            </ResponsiveDialog>
          </>
        ) : null}

        <InfoAndDeleteIcons
          name={name}
          defaultValue={defaultValue}
          {...props}
        />
      </div>
    </NodeViewWrapper>
  );
};
