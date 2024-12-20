import { type NodeViewProps } from '@tiptap/core';
import { NodeViewWrapper } from '@tiptap/react';
import type { ReactNode } from 'react';

import { FormTextLabel } from './labels/form-text.label';
import { FormNumberLabel } from './labels/form-number.label';
import type { BaseTextNodeAttributes } from './types';

export const InputWrapper = (
  props: NodeViewProps & { children: ReactNode; type: 'text' | 'number' }
) => {
  const { node, type, children } = props;
  const { description } = node.attrs as BaseTextNodeAttributes;

  return (
    <NodeViewWrapper className="form-text-node group mb-2">
      {type === 'text' ? <FormTextLabel {...props} /> : null}
      {type === 'number' ? <FormNumberLabel {...props} /> : null}
      {children}
      {description ? (
        <p className="text-muted-foreground text-xs">{description}</p>
      ) : null}
    </NodeViewWrapper>
  );
};
