import React from 'react';
import { format } from 'date-fns';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useInventoryStore } from '../../stores/inventoryStore';

export function InventoryMovementHistory() {
  const { movements, getItem } = useInventoryStore();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold">Movement History</h2>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Item</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Type</th>
                <th className="pb-3 text-right text-sm font-medium text-gray-500">Quantity</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Reference</th>
              </tr>
            </thead>
            <tbody>
              {movements.map((movement) => {
                const item = getItem(movement.itemId);
                return (
                  <tr key={movement.id} className="border-b border-gray-100 last:border-0">
                    <td className="py-4">
                      {format(new Date(movement.date), 'MMM d, yyyy HH:mm')}
                    </td>
                    <td className="py-4">
                      <div>
                        <p className="font-medium">{item?.name}</p>
                        <p className="text-sm text-gray-500">SKU: {item?.sku}</p>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${movement.type === 'purchase' ? 'bg-green-100 text-green-800' : 
                          movement.type === 'sale' ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {movement.type === 'purchase' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        {movement.type.charAt(0).toUpperCase() + movement.type.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <span className={movement.type === 'purchase' ? 'text-green-600' : 'text-blue-600'}>
                        {movement.type === 'purchase' ? '+' : '-'}{movement.quantity}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-500">
                      {movement.reference}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}