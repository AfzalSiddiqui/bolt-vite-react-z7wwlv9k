import React from 'react';
import { Home, Users, Package, BarChart3, Settings, MessageSquare, MessageCircle, ShoppingBag, FileText, ClipboardList } from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: 'dashboard' | 'shopify' | 'whatsapp' | 'reports' | 'invoices' | 'purchase-orders') => void;
}

const menuItems = [
  { icon: Home, label: 'Dashboard', view: 'dashboard' },
  { icon: ShoppingBag, label: 'Shopify', view: 'shopify' },
  { icon: MessageCircle, label: 'WhatsApp', view: 'whatsapp' },
  { icon: FileText, label: 'Invoices', view: 'invoices' },
  { icon: ClipboardList, label: 'Purchase Orders', view: 'purchase-orders' },
  { icon: Package, label: 'Inventory', view: 'inventory' },
  { icon: BarChart3, label: 'Reports', view: 'reports' },
  { icon: MessageSquare, label: 'Messages', view: 'messages' },
  { icon: Settings, label: 'Settings', view: 'settings' },
] as const;

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  return (
    <div className="bg-white h-screen w-64 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">BusinessOS</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => ['dashboard', 'shopify', 'whatsapp', 'reports', 'invoices', 'purchase-orders'].includes(item.view)
                  ? onNavigate(item.view as any)
                  : undefined}
                className={clsx(
                  'w-full flex items-center space-x-3 p-2 rounded-lg transition-colors',
                  currentView === item.view
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}