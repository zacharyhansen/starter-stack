import * as React from 'react';
import type { Editor } from '@tiptap/react';
import type { VariantProps } from 'class-variance-authority';
import { CaretDownIcon } from '@radix-ui/react-icons';
import type { toggleVariants } from '@repo/ui/components/toggle.variants';

import type { FormatAction } from '../types';
import { getShortcutKey } from '../utils';

import { ToolbarButton } from './toolbar-button';
import { ShortcutKey } from './shortcut-key';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import { cn } from '@repo/ui/utils';

interface ToolbarSectionProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
  actions: FormatAction[];
  activeActions?: string[];
  mainActionCount?: number;
  dropdownIcon?: React.ReactNode;
  dropdownTooltip?: string;
  dropdownClassName?: string;
}

export const ToolbarSection: React.FC<ToolbarSectionProps> = ({
  editor,
  actions,
  activeActions = actions.map(action => action.value),
  mainActionCount = 0,
  dropdownIcon,
  dropdownTooltip = 'More options',
  dropdownClassName = 'w-12',
  size,
  variant,
}) => {
  const { mainActions, dropdownActions } = React.useMemo(() => {
    const sortedActions = actions
      .filter(action => activeActions.includes(action.value))
      .sort(
        (a, b) =>
          activeActions.indexOf(a.value) - activeActions.indexOf(b.value)
      );

    return {
      mainActions: sortedActions.slice(0, mainActionCount),
      dropdownActions: sortedActions.slice(mainActionCount),
    };
  }, [actions, activeActions, mainActionCount]);

  const renderToolbarButton = React.useCallback(
    (action: FormatAction) => (
      <ToolbarButton
        key={action.label}
        onClick={() => {
          action.action(editor);
        }}
        disabled={!action.canExecute(editor)}
        isActive={action.isActive(editor)}
        tooltip={`${action.label} ${action.shortcuts.map(s => getShortcutKey(s).symbol).join(' ')}`}
        aria-label={action.label}
        size={size}
        variant={variant}
      >
        {action.icon}
      </ToolbarButton>
    ),
    [editor, size, variant]
  );

  const renderDropdownMenuItem = React.useCallback(
    (action: FormatAction) => (
      <DropdownMenuItem
        key={action.label}
        onClick={() => {
          action.action(editor);
        }}
        disabled={!action.canExecute(editor)}
        className={cn('flex flex-row items-center justify-between gap-4', {
          'bg-accent': action.isActive(editor),
        })}
        aria-label={action.label}
      >
        <span className="grow">{action.label}</span>
        <ShortcutKey keys={action.shortcuts} />
      </DropdownMenuItem>
    ),
    [editor]
  );

  const isDropdownActive = React.useMemo(
    () => dropdownActions.some(action => action.isActive(editor)),
    [dropdownActions, editor]
  );

  return (
    <>
      {mainActions.map(action => renderToolbarButton(action))}
      {dropdownActions.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ToolbarButton
              isActive={isDropdownActive}
              tooltip={dropdownTooltip}
              aria-label={dropdownTooltip}
              className={cn(dropdownClassName)}
              size={size}
              variant={variant}
            >
              {dropdownIcon ?? <CaretDownIcon className="size-5" />}
            </ToolbarButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-full">
            {dropdownActions.map(action => renderDropdownMenuItem(action))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default ToolbarSection;
