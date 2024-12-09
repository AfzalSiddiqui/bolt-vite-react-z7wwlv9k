import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { InventoryItemSelector } from '../inventory/InventoryItemSelector';
import type { InventoryItem } from '../../types/inventory';
import type { PurchaseOrderItem } from '../../types/purchase-order';
import { useInventoryStore } from '../../stores/inventoryStore';

export function CreatePurchaseOrder() {
  const [selectedItems, setSelectedItems] = useState<Array<PurchaseOrderItem & { inventoryItem: InventoryItem }>>([]);
  const [supplierName, setSupplierName] = useState('');
  const [supplierEmail, setSupplierEmail] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const updateInventory = useInventoryStore(state => state.updateInventory);

  const handleAddItem = (item: InventoryItem) => {
    if (selectedItems.some(selected => selected.inventoryItem.id === item.id)) {
      return;
    }

    setSelectedItems([...selectedItems, {
      id: crypto.randomUUID(),
      productName: item.name,
      sku: item.sku,
      quantity: 1,
      unitPrice: item.costPrice,
      total: item.costPrice,
      inventoryItem: item
    }]);
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setSelectedItems(selectedItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity,
          total: quantity * item.unitPrice
        };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id: string) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  const handleCreatePurchaseOrder = () => {
    // Update inventory levels for each item
    selectedItems.forEach(item => {
      updateInventory({
        itemId: item.inventoryItem.id,
        quantity: item.quantity,
        type: 'purchase',
        reference: `PO-${Date.now()}`,
        date: new Date().toISOString()
      });
    });

    // Reset form
    setSelectedItems([]);
    setSupplierName('');
    setSupplierEmail('');
    setDeliveryDate('');
  };

  const subtotal = selectedItems.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.1; // 10% tax rate
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold">Create Purchase Order</h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Supplier Name</label>
              <input
                type="text"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Supplier Email</label>
              <input
                type="email"
                value={supplierEmail}
                onChange={(e) => setSupplierEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Expected Delivery Date</label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
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
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 text-right">${item.unitPrice.toFixed(2)}</td>
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
                  <span className="text-gray-500">Tax (10%)</span>
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
            <button
              onClick={handleCreatePurchaseOrder}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Purchase Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}