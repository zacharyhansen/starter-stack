'use client';

import { Alert } from '@repo/ui/components/alert';
import type { PostgrestError } from '@supabase/postgrest-js';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import clsx from 'clsx';
import type { ReactNode } from 'react';

export default function PageWrapper({
  children,
  height,
  title,
  description,
  error,
}: Readonly<{
  height?: number;
  description?: ReactNode;
  children: ReactNode;
  title?: ReactNode;
  error?: PostgrestError | null;
}>) {
  if (error) {
    console.error({ error });
    return (
      <Alert variant="destructive">
        There was an error loading your data. If this issue persists please
        contact our support.
      </Alert>
    );
  }

  return (
    <div
      className={clsx('ag-theme-quartz shadow-md', {
        'rounded-lg border': title,
        'flex min-h-96 flex-col': !height,
      })} // applying the Data Grid theme
      style={{ height: height ?? 'calc(100vh - 100px)' }} //default is little less than the screen to account for the header bar
    >
      <div
        className={clsx({
          'p-2': title ?? description,
        })}
      >
        {title ? <h3 className="text-xl font-semibold">{title}</h3> : null}
        {description ? (
          <h4 className="text-secondary-foreground">{description}</h4>
        ) : null}
      </div>
      {children}
    </div>
  );
}
