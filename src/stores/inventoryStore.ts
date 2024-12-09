import { create } from 'zustand';
import type { InventoryItem, InventoryMovement } from '../types/inventory';

interface InventoryState {
  items: InventoryItem[];
  movements: InventoryMovement[];
  updateInventory: (movement: Omit<InventoryMovement, 'id'>) => void;
  getItem: (id: string) => InventoryItem | undefined;
}

export const useInventoryStore = create<InventoryState>((set, get) => ({
  items: [
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
      lastUpdated: new Date().toISOString()
    }
  ],
  movements: [],
  updateInventory: (movement) => {
    const newMovement: InventoryMovement = {
      id: crypto.randomUUID(),
      ...movement
    };

    set((state) => {
      const updatedItems = state.items.map(item => {
        if (item.id === movement.itemId) {
          const quantityChange = movement.type === 'purchase' ? movement.quantity : -movement.quantity;
          return {
            ...item,
            quantity: item.quantity + quantityChange,
            lastUpdated: new Date().toISOString()
          };
        }
        return item;
      });

      return {
        items: updatedItems,
        movements: [...state.movements, newMovement]
      };
    });
  },
  getItem: (id) => get().items.find(item => item.id === id)
}));