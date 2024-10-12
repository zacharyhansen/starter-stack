'use client';

import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { AgGridReact } from 'ag-grid-react';
import { useRouter } from 'next/navigation';
import type { DealStatus, User } from '@repo/postgres-types';
import { Alert } from '@repo/ui/components/alert';

import { DEALS } from '~/constants/routes';
import postgrest from '~/lib/postgrest';
import {
  AgGridWrapper,
  dataTypeDefinitions,
  DealStatusCell,
  UserCell,
} from '~/modules/ClientAgGrid';
import { trpc } from '~/lib/trpc';

export default function OpportunityTable() {
  const router = useRouter();
  const { data: test, error: userError } = trpc.view.userById.useQuery({
    userId: 'id_bilbo',
  });

  console.log({ test, userError });
  const { data, error, isLoading } = useQuery(
    postgrest.schema('tenant_base_org').from('opportunity').select(`
      id,
      deal!opportunity_active_deal_id_foreign(
        created_at,
        updated_at,
        source,
        winnability,
        appetite,
        ssbs_score,
        loan_amount,
        interest_rate,
        loan_processing_fee,
        deal_status(
          id,
          label,
          order
        ),
        assignee:view_organization_user!deal_assignee_id_foreign(
          id,
          name,
          email,
          phone
        ),
        users:deal_user(
          user:view_organization_user(id)
        )
      )

      view_organization_business(
        id,
        name_display,
        name_legal,
        email,
        phone
      )
      `)
  );

  if (error) {
    return (
      <Alert variant="destructive">There was an error loading your data.</Alert>
    );
  }

  return (
    <AgGridWrapper title="Deals">
      <AgGridReact
        dataTypeDefinitions={dataTypeDefinitions}
        rowData={data}
        loading={isLoading}
        onRowClicked={row => {
          if (row.data) router.push(`${DEALS}/${row.data.id}`);
        }}
        rowClass="cursor-pointer"
        columnDefs={[
          {
            cellRenderer: DealStatusCell,
            comparator: (a: DealStatus, b: DealStatus) =>
              ((a.order as unknown as number) || 0) -
              ((b.order as unknown as number) || 0),
            field: 'deal_status',
            filter: true,
            filterValueGetter: params => {
              // see https://github.com/supabase/postgrest-js/issues/546
              // https://github.com/supabase/postgrest-js/pull/558
              return (params.data as unknown as DealStatus).label;
            },
            headerName: 'Status',
            width: 200,
          },
          {
            cellRenderer: UserCell,
            comparator: (a: User, b: User) =>
              ((a.name as unknown as string) || '') >
              ((b.name as unknown as string) || '')
                ? 1
                : -1,
            field: 'assignee',
            headerName: 'Assignee',
          },
          {
            field: 'ssbs_score',
            headerName: 'SSBS',
            width: 100,
          },
          {
            cellDataType: 'usd',
            field: 'loan_amount',
            headerName: 'Loan',
            width: 100,
          },
          {
            cellDataType: 'percentage',
            field: 'interest_rate',
            headerName: 'Rate',
            width: 100,
          },
          {
            cellDataType: 'percenta',
            field: 'winnability',
            width: 120,
          },
          {
            field: 'appetite',
            width: 120,
          },
          {
            cellDataType: 'usd',
            field: 'loan_processing_fee',
            headerName: 'Processing Fee',
            width: 100,
          },
          {
            cellRenderer: UserCell,
            comparator: (a: User, b: User) =>
              ((a.name as unknown as string) || '') >
              ((b.name as unknown as string) || '')
                ? 1
                : -1,
            field: 'borrower',
            headerName: 'Borrower',
          },
          {
            field: 'source',
            width: 100,
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
