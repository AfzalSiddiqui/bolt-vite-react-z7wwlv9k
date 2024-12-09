import React from 'react';

const activities = [
  {
    id: 1,
    action: 'New Order',
    description: 'Client XYZ placed a new order',
    time: '2 hours ago',
  },
  {
    id: 2,
    action: 'Payment Received',
    description: 'Payment received from ABC Corp',
    time: '4 hours ago',
  },
  {
    id: 3,
    action: 'Inventory Update',
    description: 'Stock levels updated for Product A',
    time: '5 hours ago',
  },
];

export function RecentActivities() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="border-b border-gray-100 pb-4 last:border-0">
            <h3 className="font-medium text-gray-900">{activity.action}</h3>
            <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}