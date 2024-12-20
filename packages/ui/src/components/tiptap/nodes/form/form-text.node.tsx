import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import { generateRandomFieldName } from '../../utils';

import type { BaseTextNodeAttributes } from './types';
import { InputWrapper } from './input.wrapper';
import { useFormKeyDown } from './hooks/use-form-key-down';

import { Input } from '@repo/ui/components/input';
import InputField from '@repo/ui/components/form-builder/fields/input.field';

// Define the FormTextNode extension
export const FormTextNode = Node.create<BaseTextNodeAttributes>({
  name: 'formTextNode', // Unique name for your node
  group: 'block', // Allow it to act like a block element
  atom: true, // Treat as a single unit (atomic)

  addAttributes() {
    return {
      name: { default: generateRandomFieldName('field', 10) },
      label: { default: '' },
      defaultValue: { default: '' },
      placeholder: { default: '' },
      required: { default: true },
      description: { default: '' },
      nameLocked: { default: false },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'form-text-node',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['form-text-node', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(props => {
      const { node, updateAttributes } = props;
      const { placeholder } = node.attrs as BaseTextNodeAttributes;
      const { handleKeyDown } = useFormKeyDown(props);

      if (!props.editor.isEditable) {
        return <InputField {...(props.node.attrs as BaseTextNodeAttributes)} />;
      }

      return (
        <InputWrapper {...props} type="text">
          <Input
            placeholder={'Type placeholder text'}
            onChange={event => {
              updateAttributes({ placeholder: event.target.value });
            }}
            onKeyDown={handleKeyDown}
            value={placeholder}
            className="text-muted-foreground transition-all duration-200 placeholder:text-transparent focus:placeholder-gray-400 focus:outline-none"
          />
        </InputWrapper>
      );
    });
  },
});
