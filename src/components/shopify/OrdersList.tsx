import React from 'react';
import { format } from 'date-fns';
import { Package, Clock } from 'lucide-react';
import type { ShopifyOrder } from '../../types/shopify';

const mockOrders: ShopifyOrder[] = [
  {
    id: '1',
    order_number: '#1001',
    customer: {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com'
    },
    total_price: '119.98',
    created_at: '2024-03-15T10:00:00Z',
    status: 'paid',
    line_items: [
      { title: 'Classic T-Shirt', quantity: 2, price: '29.99' },
      { title: 'Denim Jeans', quantity: 1, price: '89.99' }
    ]
  }
];

export function OrdersList() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold">Recent Shopify Orders</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div key={order.id} className="border border-gray-100 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">{order.order_number}</h3>
                  <p className="text-sm text-gray-500">
                    {order.customer.first_name} {order.customer.last_name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${order.total_price}</p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(order.created_at), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {order.line_items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.title} × {item.quantity}</span>
                    <span>${item.price}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2">
                {order.status === 'paid' ? (
                  <span className="flex items-center gap-1 text-green-600">
                    <Package className="w-4 h-4" />
                    Ready to fulfill
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-amber-600">
                    <Clock className="w-4 h-4" />
                    {order.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}