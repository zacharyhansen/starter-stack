'use client';

import { Alert } from '@repo/ui/components/alert';
import type { PostgrestError } from '@supabase/postgrest-js';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import clsx from 'clsx';
import type { ReactNode } from 'react';

export default function AgGridWrapper({
  children,
  height,
  title,
  error,
}: Readonly<{
  height?: number;
  children: ReactNode;
  title?: string;
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
      style={{ height: height || 'calc(100vh - 150px)' }} //default is little less than the screen to account for the header bar
    >
      {title ? <h3 className="p-2 text-xl font-semibold">{title}</h3> : null}
      {children}
    </div>
  );
}
