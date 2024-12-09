import React, { useState } from 'react';
import { Search } from 'lucide-react';
import type { InventoryItem } from '../../types/inventory';

interface InventoryItemSelectorProps {
  onSelect: (item: InventoryItem) => void;
  selectedItems?: InventoryItem[];
}

const mockInventoryItems: InventoryItem[] = [
  {
    id: '1',
    sku: 'LAPTOP-001',
    name: 'Business Laptop Pro',
    description: 'High-performance laptop for business use',
    category: 'Electronics',
    unitPrice: 1200,
    costPrice: 900,
    quantity: 50,
    reorderPoint: 10,
    location: 'Warehouse A',
    supplier: 'Tech Supplies Inc',
    lastUpdated: '2024-03-15T10:00:00Z'
  },
  {
    id: '2',
    sku: 'DESK-001',
    name: 'Ergonomic Desk',
    description: 'Adjustable height desk',
    category: 'Furniture',
    unitPrice: 400,
    costPrice: 250,
    quantity: 30,
    reorderPoint: 5,
    location: 'Warehouse B',
    supplier: 'Office Furniture Co',
    lastUpdated: '2024-03-15T09:00:00Z'
  }
];

export function InventoryItemSelector({ onSelect, selectedItems = [] }: InventoryItemSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredItems = mockInventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="flex items-center border border-gray-200 rounded-lg">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="max-h-60 overflow-y-auto">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex justify-between items-center"
                onClick={() => {
                  onSelect(item);
                  setIsOpen(false);
                  setSearchQuery('');
                }}
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${item.unitPrice}</p>
                  <p className="text-sm text-gray-500">Stock: {item.quantity}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}