import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ShopifyDashboard } from './components/shopify/ShopifyDashboard';
import { WhatsAppDashboard } from './components/whatsapp/WhatsAppDashboard';
import { ReportsDashboard } from './components/reports/ReportsDashboard';
import { InvoiceDashboard } from './components/invoicing/InvoiceDashboard';
import { PurchaseOrderDashboard } from './components/purchase-orders/PurchaseOrderDashboard';
import './i18n/config';

type View = 'dashboard' | 'shopify' | 'whatsapp' | 'reports' | 'invoices' | 'purchase-orders';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <div className={`flex min-h-screen bg-gray-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Sidebar onNavigate={setCurrentView} currentView={currentView} />
      <main className="flex-1 p-8">
        <div className="mb-4 flex justify-end">
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            {language === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'shopify' && <ShopifyDashboard />}
        {currentView === 'whatsapp' && <WhatsAppDashboard />}
        {currentView === 'reports' && <ReportsDashboard />}
        {currentView === 'invoices' && <InvoiceDashboard />}
        {currentView === 'purchase-orders' && <PurchaseOrderDashboard />}
      </main>
    </div>
  );
}

export default App;