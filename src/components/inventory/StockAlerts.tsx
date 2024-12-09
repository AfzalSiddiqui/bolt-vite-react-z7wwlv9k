import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useInventoryStore } from '../../stores/inventoryStore';

export function StockAlerts() {
  const items = useInventoryStore(state => state.items);
  const lowStockItems = items.filter(item => item.quantity <= item.reorderPoint);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold">Stock Alerts</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {lowStockItems.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No low stock alerts</p>
          ) : (
            lowStockItems.map(item => (
              <div key={item.id} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    Current stock: {item.quantity} units
                    <br />
                    Reorder point: {item.reorderPoint} units
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}