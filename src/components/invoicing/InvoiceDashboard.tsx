import React, { useState } from 'react';
import { InvoiceList } from './InvoiceList';
import { CreateInvoice } from './CreateInvoice';

export function InvoiceDashboard() {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Invoicing</h1>
        <p className="text-gray-500">Manage your invoices and track payments</p>
      </div>
      
      {isCreating ? (
        <CreateInvoice />
      ) : (
        <InvoiceList onCreateNew={() => setIsCreating(true)} />
      )}
    </div>
  );
}