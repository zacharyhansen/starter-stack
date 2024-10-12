import type { AgGridReactProps } from 'ag-grid-react';

import { DateFormatter } from '../utils/DateFormatter';

export const dataTypeDefinitions = {
  percentage_rounded: {
    baseDataType: 'number',
    extendsDataType: 'number',
    valueFormatter: params =>
      params.value == null ? '' : `${Math.round(params.value * 100)}%`,
  },
  percentage: {
    baseDataType: 'number',
    extendsDataType: 'number',
    valueFormatter: params =>
      params.value == null ? '' : `${(params.value * 100).toFixed(3)}%`,
  },
  usd: {
    baseDataType: 'text',
    extendsDataType: 'text',
    valueFormatter: ({ value }) =>
      value
        ? new Intl.NumberFormat('en-US', {
            currency: 'USD',
            style: 'currency',
          }).format(Number.parseFloat(value))
        : '-',
  },
  timeStamp: {
    baseDataType: 'dateString',
    extendsDataType: 'dateString',
    valueFormatter: params =>
      params.value == null ? '' : DateFormatter.shortDay(params.value),
  },
} satisfies AgGridReactProps['dataTypeDefinitions'];
