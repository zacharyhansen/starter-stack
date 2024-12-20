import * as React from 'react';
import type { Content, Editor } from '@tiptap/react';
import { EditorContent } from '@tiptap/react';
import { SlashCmd, SlashCmdProvider } from '@harshtalks/slash-tiptap';
import { Search } from 'lucide-react';

import { MeasuredContainer } from '../components/measured-container';
import {
  useTiptapEditor,
  type SlashCommands,
  type UseTiptapEditorProps,
} from '../hooks/use-tiptap';
import { Separator } from '../../separator';

import { tiptapBaseVariants } from './tiptap-base.variants';

import { SectionOne } from '@repo/ui/components/tiptap/components/section/one';
import { SectionTwo } from '@repo/ui/components/tiptap/components/section/two';
import { SectionThree } from '@repo/ui/components/tiptap/components/section/three';
import { SectionFour } from '@repo/ui/components/tiptap/components/section/four';
import { SectionFive } from '@repo/ui/components/tiptap/components/section/five';
import { LinkBubbleMenu } from '@repo/ui/components/tiptap/components/bubble-menu/link-bubble-menu';
import { cn } from '@repo/ui/utils';

export interface TiptapBaseProps
  extends Omit<UseTiptapEditorProps, 'onUpdate'> {
  value?: Content;
  onChange?: (value: Content) => void;
  className?: string;
  editorContentClassName?: string;
  variant?: 'mini' | 'max' | 'default';
  slashCommands?: SlashCommands;
}

export const TiptapBase = React.forwardRef<HTMLDivElement, TiptapBaseProps>(
  (
    {
      value,
      onChange,
      className,
      editorClassName,
      editorContentClassName,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const editor = useTiptapEditor({
      value,
      onUpdate: onChange,
      editorClassName: cn(
        'h-full px-5 py-4 focus:outline-none',
        editorClassName
      ),
      ...props,
    });

    if (!editor) {
      return null;
    }

    return (
      <SlashCmdProvider>
        <MeasuredContainer
          as="div"
          name="editor"
          ref={ref}
          className={cn(tiptapBaseVariants({ variant }), className)}
        >
          {/* TOP TOOLBAR */}
          {props.editable && variant !== 'mini' ? (
            variant === 'max' ? (
              <ToolbarMax editor={editor} />
            ) : (
              <ToolbarBasic editor={editor} />
            )
          ) : null}

          {/* EDITOR */}
          <EditorContent
            editor={editor}
            className={cn(
              'minimal-tiptap-editor h-full overflow-auto',
              {
                'minimal-tiptap-editor-slash-command':
                  props.slashCommands?.length,
                'min-h-40': variant === 'mini',
              },
              editorContentClassName
            )}
          />

          {/* BOTTOM TOOLBAR */}
          {props.editable && variant === 'mini' ? (
            <ToolbarMini editor={editor} />
          ) : null}

          {/* LINK BUBBLE */}
          <LinkBubbleMenu editor={editor} />

          {/* SLASH COMMANDS */}
          {props.slashCommands?.length && props.editable ? (
            <SlashCmd.Root editor={editor}>
              <SlashCmd.Cmd className="border-muted bg-background z-50 h-auto max-h-[330px] overflow-y-auto rounded-lg border bg-white p-1 shadow-[rgba(100,_100,_111,_0.2)_0px_7px_29px_0px] transition-all">
                <SlashCmd.Empty className="flex w-full min-w-72 cursor-pointer items-center space-x-2 rounded-md p-1 text-left text-sm">
                  <Search size={18} className="mr-4" /> No search results
                </SlashCmd.Empty>
                <SlashCmd.List>
                  {props.slashCommands.map(({ title, command, icon: Icon }) => {
                    return (
                      <SlashCmd.Item
                        value={title}
                        onCommand={value_ => {
                          command(value_);
                        }}
                        key={title}
                        className="hover:bg-muted aria-selected:bg-secondary flex w-full min-w-72 cursor-pointer items-center space-x-2 rounded-md p-1 text-left text-sm"
                      >
                        {/* @ts-ignore its an icon */}
                        <Icon size={18} className="ml-2" />
                        <span>{title}</span>
                      </SlashCmd.Item>
                    );
                  })}
                </SlashCmd.List>
              </SlashCmd.Cmd>
            </SlashCmd.Root>
          ) : null}
        </MeasuredContainer>
      </SlashCmdProvider>
    );
  }
);

TiptapBase.displayName = 'TiptapBase';

const ToolbarBasic = ({ editor }: { editor: Editor }) => (
  <div className="border-border shrink-0 overflow-x-auto border-b p-2">
    <div className="flex w-max items-center gap-px">
      <SectionOne editor={editor} activeLevels={[1, 2, 3, 4, 5, 6]} />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionTwo
        editor={editor}
        activeActions={[
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'code',
          'clearFormatting',
        ]}
        mainActionCount={3}
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionThree editor={editor} />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFour
        editor={editor}
        activeActions={['orderedList', 'bulletList']}
        mainActionCount={0}
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFive
        editor={editor}
        activeActions={['codeBlock', 'blockquote', 'horizontalRule']}
        mainActionCount={0}
      />
    </div>
  </div>
);

const ToolbarMini = ({ editor }: { editor: Editor }) => (
  <div className="border-border shrink-0 overflow-x-auto border-t p-2">
    <div className="flex w-max items-center gap-px">
      <SectionTwo
        editor={editor}
        activeActions={['bold', 'italic', 'underline', 'strikethrough', 'code']}
        mainActionCount={5}
      />
    </div>
  </div>
);

const ToolbarMax = ({ editor }: { editor: Editor }) => (
  <div className="border-border shrink-0 overflow-x-auto border-b p-2">
    <div className="flex w-max items-center gap-px">
      <SectionOne editor={editor} activeLevels={[1, 2, 3]} variant="outline" />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionTwo
        editor={editor}
        activeActions={[
          'italic',
          'bold',
          'underline',
          'code',
          'strikethrough',
          'clearFormatting',
        ]}
        mainActionCount={5}
        variant="outline"
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionThree editor={editor} variant="outline" />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFour
        editor={editor}
        activeActions={['bulletList', 'orderedList']}
        mainActionCount={2}
        variant="outline"
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFive
        editor={editor}
        activeActions={['blockquote', 'codeBlock', 'horizontalRule']}
        mainActionCount={3}
        variant="outline"
      />
    </div>
  </div>
);
