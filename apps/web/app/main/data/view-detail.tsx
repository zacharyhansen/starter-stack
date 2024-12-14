import { AgGridReact } from 'ag-grid-react';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { Alert } from '@repo/ui/components/alert';
import { capitalCase } from 'change-case';
import { useMemo, type RefObject } from 'react';
import type { ValueGetterParams } from 'ag-grid-community';

import postgrest from '~/lib/database/postgrest';
import { type TablesFoundation } from '~/lib/database/helpers';
import { dataTypeDefinitions } from '~/modules/ClientAgGrid';
import { trpc } from '~/lib/trpc';

interface ViewDetailProps {
  /** The name of the postgres view/table */
  name: string;
  gridReference: RefObject<AgGridReact>;
}

export default function ViewDetail({
  name,
  gridReference,
}: Readonly<ViewDetailProps>) {
  const { data: mergedColumnsByRole } = trpc.view.columnByRoleView.useQuery({
    name,
  });

  const {
    data: roles,
    error: rolesError,
    isLoading: rolesLoading,
  } = useQuery(
    postgrest
      .schema('foundation')
      .from('role')
      .select(
        `
        slug,
        label
      `
      )
  );

  const columnDefs = useMemo(() => {
    return [
      {
        field: 'column_name',
        headerName: 'Column',
        flex: 1,
        minWidth: 150,
        valueFormatter: ({ value }: { value: string }) =>
          capitalCase(value || ''),
      },
      ...(roles?.map(role => ({
        field: role.slug,
        headerName: role.label,
        width: 150,
        cellDataType: 'boolean',
        cellRendererParams: { disabled: false },
        cellRenderer: 'agCheckboxCellRenderer',
        cellEditor: 'agCheckboxCellEditor',
        valueGetter: (params: ValueGetterParams) => !!params.data[role.slug],
      })) ?? []),
      {
        field: 'data_type',
        headerName: 'Data Type',
        width: 150,
        valueFormatter: ({ value }: { value: string }) =>
          capitalCase(value || ''),
      },
      {
        field: 'is_unique',
        headerName: 'Unique?',
        width: 150,
        cellDataType: 'boolean',
        valueGetter: (params: ValueGetterParams) => !!params.data.is_unique,
      },
      {
        field: 'is_nullable',
        headerName: 'Nullable?',
        cellDataType: 'boolean',
        valueGetter: (params: ValueGetterParams) => !!params.data.is_nullable,
        width: 100,
      },
      {
        field: 'is_primary_key',
        headerName: 'Primary Key?',
        width: 150,
        cellDataType: 'boolean',
        valueGetter: (params: ValueGetterParams) =>
          !!params.data.is_primary_key,
      },
      {
        field: 'foreign_table',
        headerName: 'References',
        valueFormatter: ({ value }: { value: string }) =>
          capitalCase(value || ''),
        width: 150,
      },
      {
        field: 'column_default',
        headerName: 'Default Value',
        width: 200,
      },
      {
        headerName: 'Generated? (Non Editable)',
        field: 'is_generated',
        width: 200,
        valueFormatter: ({ value }: { value: string }) =>
          capitalCase(value || ''),
      },
      {
        headerName: 'Generation Expression',
        field: 'generation_expression',
        width: 200,
      },
    ];
  }, [roles]);

  if (rolesError) {
    console.error({ rolesError });
    return (
      <Alert variant="destructive">There was an error loading your data.</Alert>
    );
  }

  return (
    <AgGridReact<TablesFoundation<'schema_columns'> & Record<string, unknown>>
      dataTypeDefinitions={dataTypeDefinitions}
      rowData={mergedColumnsByRole}
      loading={rolesLoading}
      columnDefs={columnDefs}
      getRowId={({ data }) => data.column_name as string}
      undoRedoCellEditing={true}
      undoRedoCellEditingLimit={100}
      ref={gridReference}
    />
  );
}
