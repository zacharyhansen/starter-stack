import {
  CaseSensitive,
  Binary,
  SquareMousePointer,
  Grid2X2,
  Square,
  CalendarCheck,
  CalendarRange,
  KeyRound,
  Phone,
  ChevronsLeftRightEllipsis,
  ToggleLeft,
  ScanText,
  PencilRuler,
  type LucideIcon,
} from 'lucide-react';

import type { ComboboxOption } from '@repo/ui/components/combobox';

export enum FormNode {
  Text = 'formTextNode',
  Combobox = 'formComboboxNode',
  Checkbox = 'formCheckboxNode',
  Number = 'formNumberNode',
  ComboboxMulti = 'formComboboxMultiNode',
  Switch = 'formSwitchNode',
  Password = 'formPasswordNode',
  Textarea = 'formTextareaNode',
  DatePicker = 'formDatePickerNode',
  DateRangePicker = 'formDateRangePickerNode',
  Phone = 'formPhoneNode',
  Tiptap = 'formTiptapNode',
  Slider = 'formSliderNode',
}
export interface BaseFormNodeAttributes {
  name: string;
  label: string;
  description: string;
  required: boolean;
  nameLocked: boolean;
}

export interface TextNodeAttributes extends BaseFormNodeAttributes {
  defaultValue: string;
  placeholder: string;
}

export interface NumberNodeAttributes extends BaseFormNodeAttributes {
  defaultValue: number;
  placeholder: string;
}

export interface BooleanNodeAttributes extends BaseFormNodeAttributes {
  defaultValue: boolean;
}

export interface ComboboxNodeAttributes extends BaseFormNodeAttributes {
  options: ComboboxOption[];
  placeholder: string;
  defaultValue: string;
}

export const formCommandIcon: Record<FormNode, LucideIcon> = {
  [FormNode.Text]: CaseSensitive,
  [FormNode.Number]: Binary,
  [FormNode.Checkbox]: SquareMousePointer,
  [FormNode.ComboboxMulti]: Grid2X2,
  [FormNode.Combobox]: Square,
  [FormNode.DatePicker]: CalendarCheck,
  [FormNode.DateRangePicker]: CalendarRange,
  [FormNode.Password]: KeyRound,
  [FormNode.Phone]: Phone,
  [FormNode.Slider]: ChevronsLeftRightEllipsis,
  [FormNode.Switch]: ToggleLeft,
  [FormNode.Textarea]: ScanText,
  [FormNode.Tiptap]: PencilRuler,
};

export const formCommandLabel: Record<FormNode, string> = {
  [FormNode.Text]: 'Text',
  [FormNode.Number]: 'Number',
  [FormNode.Checkbox]: 'Checkbox',
  [FormNode.ComboboxMulti]: 'Multi Select',
  [FormNode.Combobox]: 'Select',
  [FormNode.DatePicker]: 'Date',
  [FormNode.DateRangePicker]: 'Date Range',
  [FormNode.Password]: 'Password',
  [FormNode.Phone]: 'Phone',
  [FormNode.Slider]: 'Slider',
  [FormNode.Switch]: 'Switch',
  [FormNode.Textarea]: 'Textarea',
  [FormNode.Tiptap]: 'Rich Text',
};
