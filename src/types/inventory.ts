export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  unitPrice: number;
  costPrice: number;
  quantity: number;
  reorderPoint: number;
  location: string;
  supplier: string;
  lastUpdated: string;
}

export interface InventoryMovement {
  id: string;
  itemId: string;
  type: 'purchase' | 'sale' | 'adjustment' | 'transfer';
  quantity: number;
  reference: string;
  date: string;
  notes?: string;
}

export interface InventoryAdjustment {
  id: string;
  date: string;
  reason: string;
  items: Array<{
    itemId: string;
    quantity: number;
    type: 'increase' | 'decrease';
  }>;
  status: 'draft' | 'confirmed';
  notes?: string;
}