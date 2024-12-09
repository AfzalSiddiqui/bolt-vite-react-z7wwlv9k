import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { useInventoryStore } from '../../stores/inventoryStore';

export function InventoryList() {
  const items = useInventoryStore(state => state.items);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = Array.from(new Set(items.map(item => item.category)));
  
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Inventory Items</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>
        <div className="mt-4 flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Item</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Category</th>
                <th className="pb-3 text-right text-sm font-medium text-gray-500">Stock</th>
                <th className="pb-3 text-right text-sm font-medium text-gray-500">Unit Price</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Location</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-4">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                    </div>
                  </td>
                  <td className="py-4">{item.category}</td>
                  <td className="py-4 text-right">
                    <span className={`font-medium ${
                      item.quantity <= item.reorderPoint ? 'text-red-600' :
                      item.quantity <= item.reorderPoint * 2 ? 'text-amber-600' :
                      'text-green-600'
                    }`}>
                      {item.quantity}
                    </span>
                  </td>
                  <td className="py-4 text-right">${item.unitPrice.toFixed(2)}</td>
                  <td className="py-4">{item.location}</td>
                  <td className="py-4 text-sm text-gray-500">
                    {format(new Date(item.lastUpdated), 'MMM d, yyyy HH:mm')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}