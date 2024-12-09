import React from 'react';
import { DashboardCard } from './DashboardCard';
import { RecentActivities } from './RecentActivities';
import { Users, DollarSign, Package, TrendingUp } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Revenue"
          value="$24,500"
          icon={DollarSign}
          trend="+12.5% from last month"
          trendUp={true}
        />
        <DashboardCard
          title="Active Users"
          value="1,234"
          icon={Users}
          trend="+3.2% from last week"
          trendUp={true}
        />
        <DashboardCard
          title="Inventory Items"
          value="856"
          icon={Package}
          trend="-2.1% from last week"
          trendUp={false}
        />
        <DashboardCard
          title="Sales Growth"
          value="15.2%"
          icon={TrendingUp}
          trend="+5.2% from last month"
          trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            {/* Placeholder for chart */}
            <p className="text-gray-400">Sales chart will be displayed here</p>
          </div>
        </div>
        <RecentActivities />
      </div>
    </div>
  );
}