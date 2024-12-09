import React from 'react';
import { Package, AlertTriangle, TrendingUp, ArrowDownUp } from 'lucide-react';
import { useInventoryStore } from '../../stores/inventoryStore';

export function InventoryStats() {
  const items = useInventoryStore(state => state.items);
  
  const totalItems = items.length;
  const lowStockItems = items.filter(item => item.quantity <= item.reorderPoint).length;
  const totalValue = items.reduce((sum, item) => sum + (item.quantity * item.costPrice), 0);
  const averageTurnover = 12; // This would be calculated based on actual sales data

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Items</p>
            <h3 className="text-2xl font-bold text-gray-900">{totalItems}</h3>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Low Stock Alerts</p>
            <h3 className="text-2xl font-bold text-gray-900">{lowStockItems}</h3>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Value</p>
            <h3 className="text-2xl font-bold text-gray-900">${totalValue.toFixed(2)}</h3>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Inventory Turnover</p>
            <h3 className="text-2xl font-bold text-gray-900">{averageTurnover}x</h3>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <ArrowDownUp className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
}