import React, { useState } from 'react';
import { PurchaseOrderList } from './PurchaseOrderList';
import { CreatePurchaseOrder } from './CreatePurchaseOrder';

export function PurchaseOrderDashboard() {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Purchase Orders</h1>
        <p className="text-gray-500">Manage your purchase orders and track deliveries</p>
      </div>
      
      {isCreating ? (
        <CreatePurchaseOrder />
      ) : (
        <PurchaseOrderList onCreateNew={() => setIsCreating(true)} />
      )}
    </div>
  );
}