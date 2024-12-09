import React from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import type { ShopifyProduct } from '../../types/shopify';

const mockProducts: ShopifyProduct[] = [
  {
    id: '1',
    title: 'Classic T-Shirt',
    price: '29.99',
    inventory_quantity: 100,
    status: 'active',
    image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200'
  },
  {
    id: '2',
    title: 'Denim Jeans',
    price: '89.99',
    inventory_quantity: 45,
    status: 'active',
    image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200'
  }
];

export function ProductSync() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Shopify Products</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Sync Products
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="grid gap-4">
          {mockProducts.map((product) => (
            <div key={product.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg">
              {product.image_url && (
                <img src={product.image_url} alt={product.title} className="w-16 h-16 object-cover rounded" />
              )}
              <div className="flex-1">
                <h3 className="font-medium">{product.title}</h3>
                <div className="flex gap-4 mt-1 text-sm text-gray-500">
                  <span>${product.price}</span>
                  <span>Stock: {product.inventory_quantity}</span>
                  <span className="capitalize">{product.status}</span>
                </div>
              </div>
              {product.inventory_quantity < 50 && (
                <div className="flex items-center gap-1 text-amber-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">Low Stock</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}