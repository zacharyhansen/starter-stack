import { createSuggestionsItems } from '@harshtalks/slash-tiptap';
import {
  CaseSensitive,
  Binary,
  SquareMousePointer,
  Layers,
  ChevronDown,
  CalendarCheck,
  CalendarRange,
  KeyRound,
  Phone,
  ChevronsLeftRightEllipsis,
  ToggleLeft,
  ScanText,
  PencilRuler,
} from 'lucide-react';

export const formCommands = createSuggestionsItems([
  {
    title: 'Text',
    searchTerms: ['text', 'input', 'string'],
    icon: CaseSensitive,
    command: ({ editor, range }) => {
      editor
        .chain()
        .deleteRange(range)
        .insertContentAt(range.from, [
          {
            type: 'textInputNode',
          },
        ])
        .run();

      // After inserting the content, we set the selection (cursor) inside the editable part of the node
      const node = editor.view.nodeDOM(range.from - 1);
      // @ts-expect-error this works so gonna come back to it
      const editableDiv = node?.querySelector('div[contenteditable="true"]');

      if (editableDiv) {
        editableDiv.focus();
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(editableDiv);
        range.collapse(false); // Move the cursor to the end of the content
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    },
  },
  {
    title: 'Number',
    searchTerms: ['number', 'input'],
    icon: Binary,
    command: ({ editor, range }) => {
      editor
        .chain()
        .deleteRange(range)
        .insertContentAt(range.from, [
          {
            type: 'paragraph',
          },
        ])
        .run();
    },
  },
  {
    title: 'Checkbox',
    searchTerms: [],
    icon: SquareMousePointer,
    command: ({ editor, range }) => {
      editor
        .chain()
        .deleteRange(range)
        .insertContentAt(range.from, [
          {
            type: 'paragraph',
          },
        ])
        .run();
    },
  },
  {
    title: 'Multi Select',
    searchTerms: [],
    icon: Layers,
    command: ({ editor, range }) => {
      editor
        .chain()
        .deleteRange(range)
        .insertContentAt(range.from, [
          {
            type: 'paragraph',
          },
        ])
        .run();
    },
  },
  {
    title: 'Select',
    searchTerms: [],
    icon: ChevronDown,
    command: ({ editor, range }) => {
      editor
        .chain()
        .deleteRange(range)
        .insertContentAt(range.from, [
          {
            type: 'paragraph',
          },
        ])
        .run();
    },
  },
  {
    title: 'Calendar',
    searchTerms: [],
    icon: CalendarCheck,
    command: ({ editor, range }) => {
      editor
        .chain()
        .deleteRange(range)
        .insertContentAt(range.from, [
          {
            type: 'paragraph',
          },
        ])
        .run();
    },
  },
  {
    title: 'Calendar Range',
    searchTerms: [],
    icon: CalendarRange,
    command: ({ editor, range }) => {
      editor
        .chain()
        .deleteRange(range)
        .insertContentAt(range.from, [
          {
            type: 'paragraph',
          },
        ])
        .run();
    },
  },
  {
    title: 'Password',
    searchTerms: [],
    icon: KeyRound,
    command: ({ editor, range }) => {
      editor
        .chain()
        .deleteRange(range)
        .insertContentAt(range.from, [
          {
            type: 'paragraph',
          },
        ])
        .run();
    },
  },
  {
    title: 'Phone',
    searchTerms: [],
    icon: Phone,
    command: ({ editor, range }) => {
      editor
        .chain()
        .deleteRange(range)
        .insertContentAt(range.from, [
          {
            type: 'paragraph',
          },
        ])
        .run();
    },
  },
  {
    title: 'Slider',
    searchTerms: [],
    icon: ChevronsLeftRightEllipsis,
    command: ({ editor, range }) => {
      editor
        .chain()
        .deleteRange(range)
        .insertContentAt(range.from, [
          {
            type: 'paragraph',
          },
        ])
        .run();
    },
  },
  {
    title: 'Switch',
    searchTerms: [],
    icon: ToggleLeft,
    command: ({ editor, range }) => {
      editor
        .chain()
        .deleteRange(range)
        .insertContentAt(range.from, [
          {
            type: 'paragraph',
          },
        ])
        .run();
    },
  },
  {
    title: 'Text Area',
    searchTerms: [],
    icon: ScanText,
    command: ({ editor, range }) => {
      editor
        .chain()
        .deleteRange(range)
        .insertContentAt(range.from, [
          {
            type: 'paragraph',
          },
        ])
        .run();
    },
  },

  {
    title: 'Rich Editor',
    searchTerms: [],
    icon: PencilRuler,
    command: ({ editor, range }) => {
      editor
        .chain()
        .deleteRange(range)
        .insertContentAt(range.from, [
          {
            type: 'paragraph',
          },
        ])
        .run();
    },
  },
]);
