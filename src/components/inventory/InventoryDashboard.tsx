import React from 'react';
import { InventoryList } from './InventoryList';
import { InventoryMovementHistory } from './InventoryMovementHistory';
import { StockAlerts } from './StockAlerts';
import { InventoryStats } from './InventoryStats';

export function InventoryDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <p className="text-gray-500">Track and manage your inventory levels</p>
      </div>

      <InventoryStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <InventoryList />
        </div>
        <div>
          <StockAlerts />
        </div>
      </div>

      <InventoryMovementHistory />
    </div>
  );
}