import type { Meta, StoryObj } from '@storybook/react';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Toaster } from 'sonner';

import { formCommands } from '../extensions/slash-command-lists/form.commands';

import { TiptapBase } from './tiptap-base';

const meta = {
  title: 'TipTap/Molecules/Form Builder',
  args: {
    throttleDelay: 1000,
    output: 'html',
    placeholder: "Type '/' to insert blocks",
    editable: true,
    editorClassName: 'my-12 mx-24',
    onChange: content => {
      console.log({ content });
    },
  },
  tags: ['autodocs'],
  component: TiptapBase,
  parameters: {
    layout: 'centered',
  },
  render: args => (
    <TooltipProvider delayDuration={100}>
      <Toaster />
      <TiptapBase {...args} />
    </TooltipProvider>
  ),
} satisfies Meta<typeof TiptapBase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    slashCommands: formCommands,
    content: ``,
  },
};

export const InputBlocks: Story = {
  args: {
    editorContentClassName: 'minimal-tiptap-editor-slash-command',
    placeholder: "Press '/' for commands.",
    value: `
   <form-text-node name="field_6ZBXjmzVfZ" label="Text Input Label" defaultvalue="" placeholder="Placeholder..." required="true" description=""></form-text-node><p class="text-node">Paragraph element</p>
  `,
  },
};

export const InputBlocksRendered: Story = {
  args: {
    editorContentClassName: 'minimal-tiptap-editor-slash-command',
    placeholder: "Press '/' for commands.",
    editable: false,
    value: `
<p class="text-node">Text Field Label</p><input-block label="Default Label" placeholder="Enter some text..."></input-block>  `,
  },
};

export const NotEditable: Story = {
  args: {
    editorContentClassName: 'minimal-tiptap-editor-slash-command',
    placeholder: "Press '/' for commands.",
    editable: false,
    value: `
    <p>This is an example of how custom input nodes appear.</p>
    <p>text</p>
  `,
  },
};
