import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
}

const mockExpenses: Expense[] = [
  {
    id: '1',
    date: '2024-03-15',
    category: 'Office Supplies',
    description: 'Printer Paper',
    amount: 45.99,
    status: 'approved'
  },
  {
    id: '2',
    date: '2024-03-14',
    category: 'Travel',
    description: 'Client Meeting',
    amount: 125.50,
    status: 'pending'
  }
];

const columnHelper = createColumnHelper<Expense>();

export function ExpenseSheet() {
  const { t } = useTranslation();

  const columns = [
    columnHelper.accessor('date', {
      header: t('common.date'),
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('category', {
      header: t('common.category'),
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor('amount', {
      header: t('common.amount'),
      cell: (info) => `$${info.getValue().toFixed(2)}`
    }),
    columnHelper.accessor('status', {
      header: t('common.status'),
      cell: (info) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          info.getValue() === 'approved' ? 'bg-green-100 text-green-800' :
          info.getValue() === 'rejected' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {info.getValue()}
        </span>
      )
    })
  ];

  const table = useReactTable({
    data: mockExpenses,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">{t('reports.expenses')}</h2>
        <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
          {t('common.export')}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-t border-gray-100">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-2">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}