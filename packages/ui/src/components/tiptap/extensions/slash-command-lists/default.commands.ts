import { createSuggestionsItems } from '@harshtalks/slash-tiptap';

export const defaultCommands = createSuggestionsItems([
  {
    title: 'Text',
    searchTerms: ['paragraph'],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode('paragraph', 'paragraph')
        .run();
    },
  },
  {
    title: 'Bullet List',
    searchTerms: ['unordered', 'point'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: 'Ordered List',
    searchTerms: ['ordered', 'point', 'numbers'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
]);
