import React from 'react';
import { format } from 'date-fns';
import { FileText, MoreVertical } from 'lucide-react';
import type { Invoice } from '../../types/invoice';

interface InvoiceListProps {
  onCreateNew: () => void;
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    customerName: 'Tech Solutions Inc',
    customerEmail: 'billing@techsolutions.com',
    date: '2024-03-15',
    dueDate: '2024-04-15',
    items: [
      {
        id: '1',
        description: 'Web Development Services',
        quantity: 1,
        unitPrice: 2500,
        tax: 250,
        total: 2750
      }
    ],
    subtotal: 2500,
    tax: 250,
    total: 2750,
    status: 'sent'
  }
];

export function InvoiceList({ onCreateNew }: InvoiceListProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Invoices</h2>
          <button 
            onClick={onCreateNew}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            New Invoice
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Invoice #</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Customer</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Due Date</th>
                <th className="pb-3 text-right text-sm font-medium text-gray-500">Amount</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="pb-3 text-right text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span>{invoice.invoiceNumber}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div>
                      <p className="font-medium">{invoice.customerName}</p>
                      <p className="text-sm text-gray-500">{invoice.customerEmail}</p>
                    </div>
                  </td>
                  <td className="py-4">{format(new Date(invoice.date), 'MMM d, yyyy')}</td>
                  <td className="py-4">{format(new Date(invoice.dueDate), 'MMM d, yyyy')}</td>
                  <td className="py-4 text-right">${invoice.total.toFixed(2)}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                        invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'}`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}