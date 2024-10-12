'use client';

import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { AgGridReact } from 'ag-grid-react';
import type { TaskPriority, TaskStatus, User } from '@repo/postgres-types';

import {
  AgGridWrapper,
  dataTypeDefinitions,
  TaskPriorityCell,
  TaskStatusCell,
  UserCell,
} from '~/modules/ClientAgGrid';
import postgrest from '~/lib/postgrest';

export default function TaskTable() {
  const { data, isLoading, error } = useQuery(
    postgrest.schema('tenant_base_org').from('task').select(`
        id,
        task_status(
          id,
          label
        ),
        title,
        task_priority(
          id,
          label
        ),
        created_at,
        updated_at,
        view_organization_user(
          id,
          name,
          email
        )
      `)
  );

  return (
    <AgGridWrapper title="Tasks" error={error}>
      <AgGridReact
        dataTypeDefinitions={dataTypeDefinitions}
        rowData={data}
        loading={isLoading}
        columnDefs={[
          {
            cellRenderer: TaskPriorityCell,
            cellRendererParams: {
              format: 'full',
            },
            comparator: (a: TaskPriority, b: TaskPriority) =>
              ((a.id as unknown as number) || 0) -
              ((b.id as unknown as number) || 0),
            field: 'task_priority',
            filter: true,
            filterValueGetter: params => {
              // see https://github.com/supabase/postgrest-js/issues/546
              return (params.data?.task_priority as unknown as TaskPriority)
                .label;
            },

            headerName: 'Priority',
            width: 120,
          },
          {
            cellRenderer: TaskStatusCell,
            comparator: (a: TaskStatus, b: TaskStatus) =>
              ((a.id as unknown as number) || 0) -
              ((b.id as unknown as number) || 0),
            field: 'task_status',
            headerName: 'Status',
            width: 130,
          },
          { field: 'title', flex: 1 },
          {
            cellRenderer: UserCell,
            comparator: (a: User, b: User) =>
              ((a.name as unknown as string) || '') >
              ((b.name as unknown as string) || '')
                ? 1
                : -1,
            field: 'view_organization_user',
            headerName: 'Assignee',
          },
          {
            cellDataType: 'timeStamp',
            field: 'updated_at',
            headerName: 'Updated',
            width: 100,
          },
          {
            cellDataType: 'timeStamp',
            field: 'created_at',
            headerName: 'Created',
            width: 100,
          },
        ]}
      />
    </AgGridWrapper>
  );
}
