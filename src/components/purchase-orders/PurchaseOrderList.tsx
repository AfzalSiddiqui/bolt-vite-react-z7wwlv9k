import React from 'react';
import { format } from 'date-fns';
import { Package, MoreVertical } from 'lucide-react';
import type { PurchaseOrder } from '../../types/purchase-order';

const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: '1',
    poNumber: 'PO-2024-001',
    supplierName: 'Global Supplies Co.',
    supplierEmail: 'orders@globalsupplies.com',
    orderDate: '2024-03-15',
    deliveryDate: '2024-03-30',
    items: [
      {
        id: '1',
        productName: 'Office Chairs',
        sku: 'CHR-001',
        quantity: 10,
        unitPrice: 200,
        total: 2000
      }
    ],
    subtotal: 2000,
    tax: 200,
    total: 2200,
    status: 'sent'
  }
];

export function PurchaseOrderList() {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Purchase Orders</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            New Purchase Order
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-3 text-left text-sm font-medium text-gray-500">PO #</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Supplier</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Order Date</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Delivery Date</th>
                <th className="pb-3 text-right text-sm font-medium text-gray-500">Amount</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="pb-3 text-right text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockPurchaseOrders.map((po) => (
                <tr key={po.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-400" />
                      <span>{po.poNumber}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div>
                      <p className="font-medium">{po.supplierName}</p>
                      <p className="text-sm text-gray-500">{po.supplierEmail}</p>
                    </div>
                  </td>
                  <td className="py-4">{format(new Date(po.orderDate), 'MMM d, yyyy')}</td>
                  <td className="py-4">{format(new Date(po.deliveryDate), 'MMM d, yyyy')}</td>
                  <td className="py-4 text-right">${po.total.toFixed(2)}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${po.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        po.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'}`}>
                      {po.status.charAt(0).toUpperCase() + po.status.slice(1)}
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