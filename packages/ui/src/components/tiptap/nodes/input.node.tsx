import { Node, mergeAttributes, type NodeViewProps } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';
import { Asterisk, Info, Pencil, Trash2 } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipTrigger } from '../../tooltip';
import { generateRandomFieldName } from '../utils';

import { Input } from '@repo/ui/components/input';

// Define an interface for the node attributes
interface InputBlockAttributes {
  name: string | null;
  label: string;
  defaultValue: string;
  placeholder: string;
  required: boolean;
}

// Define the InputBlock extension
export const InputBlock = Node.create<InputBlockAttributes>({
  name: 'textInputNode', // Unique name for your node
  group: 'block', // Allow it to act like a block element
  atom: true, // Treat as a single unit (atomic)

  addAttributes() {
    return {
      name: { default: generateRandomFieldName('field', 10) },
      label: { default: '' },
      defaultValue: { default: '' },
      placeholder: { default: '' },
      required: { default: true },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'input-block',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['input-block', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(props => {
      if (props.editor.isEditable) {
        return <InputBlockComponent {...props} />;
      }

      const { placeholder, label, defaultValue, required } = props.node
        .attrs as InputBlockAttributes;

      return (
        <Input
          placeholder={placeholder}
          label={label}
          defaultValue={defaultValue}
          required={required}
        />
      );
    });
  },
});

const InputBlockComponent = (props: NodeViewProps) => {
  const { node, updateAttributes, getPos } = props;
  const { placeholder } = node.attrs as InputBlockAttributes;
  const nodeEndPos = getPos() + node.nodeSize;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      props.editor
        .chain()
        .focus(nodeEndPos)
        .insertContent([
          {
            type: 'paragraph',
          },
        ])
        .run();
    }
  };

  return (
    <NodeViewWrapper className="input-block group mb-2">
      <InputLabel {...props} />
      <Input
        placeholder={'Type placeholder text'}
        onChange={event => {
          updateAttributes({ placeholder: event.target.value });
        }}
        onKeyDown={handleKeyDown}
        value={placeholder}
        className="text-muted-foreground transition-all duration-200 placeholder:text-transparent focus:placeholder-gray-400 focus:outline-none"
      />
    </NodeViewWrapper>
  );
};

export const InputLabel = ({
  node,
  updateAttributes,
  editor,
  getPos,
}: NodeViewProps) => {
  const { label, required, name, defaultValue } =
    node.attrs as InputBlockAttributes;

  const nodeEndPos = getPos() + node.nodeSize;

  const handleEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      editor
        .chain()
        .focus(nodeEndPos)
        .insertContent([
          {
            type: 'paragraph',
          },
        ])
        .run();
    }
  };

  return (
    <NodeViewWrapper className="relative flex min-h-[18.5px] items-center text-lg font-medium text-gray-900">
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        onKeyDown={handleEnter}
        contentEditable="true"
        suppressContentEditableWarning
        onBlur={event => {
          updateAttributes({
            label: event.currentTarget.textContent,
          });
        }}
        className="w-fit min-w-12 pr-2 outline-none"
        aria-placeholder="Add a label"
      >
        {label}
      </div>
      {required ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Asterisk
              onClick={() => {
                updateAttributes({
                  required: !required,
                });
              }}
              className="text-muted-foreground hover:bg-muted hover:text-foreground h-6 w-6 cursor-pointer rounded-md p-1"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Required</p>
          </TooltipContent>
        </Tooltip>
      ) : null}
      <div className="ml-auto flex transform gap-1 opacity-0 group-hover:opacity-100">
        <Tooltip>
          <TooltipTrigger asChild>
            <Pencil className="text-muted hover:bg-muted hover:text-foreground h-6 w-6 cursor-pointer rounded-md p-1" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Advanced</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="text-muted hover:text-foreground hover:bg-muted h-6 w-6 cursor-pointer rounded-md p-1" />
          </TooltipTrigger>
          <TooltipContent>
            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-sm">
              <dt className="text-muted font-medium">Name:</dt>
              <dd className="text-gray-900">{name}</dd>
              <dt className="text-muted font-medium">Default value:</dt>
              <dd className="text-gray-900">{defaultValue}</dd>
            </dl>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Trash2
              onClick={() => {
                editor
                  .chain()
                  .deleteRange({
                    to: nodeEndPos,
                    from: getPos(),
                  })
                  .run();
              }}
              className="hover:bg-muted h-6 w-6 cursor-pointer rounded-md p-1 text-red-400"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove Field</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </NodeViewWrapper>
  );
};
