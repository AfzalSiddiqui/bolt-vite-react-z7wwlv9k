import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { InventoryItemSelector } from '../inventory/InventoryItemSelector';
import type { InventoryItem } from '../../types/inventory';
import type { InvoiceItem } from '../../types/invoice';

export function CreateInvoice() {
  const [selectedItems, setSelectedItems] = useState<Array<InvoiceItem & { inventoryItem: InventoryItem }>>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAddItem = (item: InventoryItem) => {
    if (selectedItems.some(selected => selected.inventoryItem.id === item.id)) {
      return;
    }

    setSelectedItems([...selectedItems, {
      id: crypto.randomUUID(),
      description: item.name,
      quantity: 1,
      unitPrice: item.unitPrice,
      tax: item.unitPrice * 0.1, // 10% tax rate
      total: item.unitPrice * 1.1,
      inventoryItem: item
    }]);
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setSelectedItems(selectedItems.map(item => {
      if (item.id === id) {
        const subtotal = quantity * item.unitPrice;
        const tax = subtotal * 0.1;
        return {
          ...item,
          quantity,
          tax,
          total: subtotal + tax
        };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id: string) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  const subtotal = selectedItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const tax = selectedItems.reduce((sum, item) => sum + item.tax, 0);
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold">Create New Invoice</h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Email</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Add Items</label>
            <InventoryItemSelector onSelect={handleAddItem} selectedItems={selectedItems.map(item => item.inventoryItem)} />
          </div>

          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Tax</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{item.description}</p>
                        <p className="text-sm text-gray-500">SKU: {item.inventoryItem.sku}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="1"
                        max={item.inventoryItem.quantity}
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 text-right">${item.unitPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">${item.tax.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">${item.total.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-medium">Total</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Save as Draft
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Create Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}