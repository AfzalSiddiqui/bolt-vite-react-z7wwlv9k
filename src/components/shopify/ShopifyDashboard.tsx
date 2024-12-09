import React from 'react';
import { ProductSync } from './ProductSync';
import { OrdersList } from './OrdersList';

export function ShopifyDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Shopify Integration</h1>
        <p className="text-gray-500">Manage your Shopify store synchronization</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductSync />
        <OrdersList />
      </div>
    </div>
  );
}