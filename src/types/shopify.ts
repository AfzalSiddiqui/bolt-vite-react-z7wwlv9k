export interface ShopifyProduct {
  id: string;
  title: string;
  price: string;
  inventory_quantity: number;
  status: 'active' | 'archived' | 'draft';
  image_url?: string;
}

export interface ShopifyOrder {
  id: string;
  order_number: string;
  customer: {
    first_name: string;
    last_name: string;
    email: string;
  };
  total_price: string;
  created_at: string;
  status: 'pending' | 'paid' | 'fulfilled' | 'cancelled';
  line_items: Array<{
    title: string;
    quantity: number;
    price: string;
  }>;
}