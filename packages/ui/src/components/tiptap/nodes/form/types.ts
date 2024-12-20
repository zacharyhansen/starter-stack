export interface BaseFormNodeAttributes {
  name: string;
  label: string;
  description: string;
  required: boolean;
  nameLocked: boolean;
}

export interface BaseTextNodeAttributes extends BaseFormNodeAttributes {
  defaultValue: string;
  placeholder: string;
}

export interface BaseNumberNodeAttributes extends BaseFormNodeAttributes {
  defaultValue: number;
  placeholder: string;
}

export interface BaseBooleanNodeAttributes extends BaseFormNodeAttributes {
  defaultValue: boolean;
}
