'use client';

import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { AgGridReact } from 'ag-grid-react';
import { useRouter } from 'next/navigation';
import { Alert } from '@repo/ui/components/alert';

import { DEALS } from '~/constants/routes';
import postgrest from '~/lib/database/postgrest';
import {
  AgGridWrapper,
  dataTypeDefinitions,
  DealStatusCell,
  UserCell,
} from '~/modules/ClientAgGrid';
import type { TablesFoundation } from '~/lib/database/helpers';

export default function OpportunityTable() {
  const router = useRouter();

  const { data, error, isLoading } = useQuery(
    postgrest.schema('foundation').from('opportunity').select(`
      id,
      deal!opportunity_active_deal_id_fkey(
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
        assignee:user!deal_assignee_id_fkey(
          id,
          name,
          email,
          phone
        ),
        users:deal_user(
          user:user(id)
        )
      ),
      creator:user!opportunity_creator_id_fkey(
        id,
        name,
        email,
        phone
      ),
      borrower:user!opportunity_borrower_user_id_fkey(
        id,
        name,
        email,
        phone
      ),
      agent:user!opportunity_agent_id_fkey(
        id,
        name,
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
            comparator: (a, b) =>
              ((a.order as unknown as number) || 0) -
              ((b.order as unknown as number) || 0),
            field: 'deal.deal_status',
            filter: true,
            filterValueGetter: params => {
              return params.data?.deal?.deal_status?.label;
            },
            headerName: 'Status',
            width: 200,
          },
          {
            cellRenderer: UserCell,
            comparator: (
              a: TablesFoundation<'q_user'>,
              b: TablesFoundation<'q_user'>
            ) =>
              ((a.name as unknown as string) || '') >
              ((b.name as unknown as string) || '')
                ? 1
                : -1,
            field: 'deal.assignee',
            headerName: 'Assignee',
            flex: 1,
            minWidth: 200,
          },
          {
            cellRenderer: UserCell,
            comparator: (
              a: TablesFoundation<'q_user'>,
              b: TablesFoundation<'q_user'>
            ) =>
              ((a.name as unknown as string) || '') >
              ((b.name as unknown as string) || '')
                ? 1
                : -1,
            field: 'borrower',
            headerName: 'Borrower',
          },
          {
            field: 'deal.ssbs_score',
            headerName: 'SSBS',
            width: 100,
          },
          {
            cellDataType: 'usd',
            field: 'deal.loan_amount',
            headerName: 'Loan',
            width: 100,
          },
          {
            cellDataType: 'percentage',
            field: 'deal.interest_rate',
            headerName: 'Rate',
            width: 100,
          },
          {
            field: 'deal.winnability',
            width: 120,
          },
          {
            field: 'deal.appetite',
            width: 120,
          },
          {
            cellDataType: 'usd',
            field: 'deal.loan_processing_fee',
            headerName: 'Processing Fee',
            width: 100,
          },
          {
            cellRenderer: UserCell,
            comparator: (
              a: TablesFoundation<'q_user'>,
              b: TablesFoundation<'q_user'>
            ) =>
              ((a.name as unknown as string) || '') >
              ((b.name as unknown as string) || '')
                ? 1
                : -1,
            field: 'agent',
            headerName: 'Agent',
          },
          {
            field: 'deal.source',
            width: 100,
          },
          {
            cellDataType: 'timeStamp',
            field: 'deal.updated_at',
            headerName: 'Updated',
            width: 100,
          },
          {
            cellDataType: 'timeStamp',
            field: 'deal.created_at',
            headerName: 'Created',
            width: 100,
          },
        ]}
      />
    </AgGridWrapper>
  );
}
