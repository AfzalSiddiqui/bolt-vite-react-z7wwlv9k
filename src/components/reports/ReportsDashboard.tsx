import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProfitLossReport } from './ProfitLossReport';
import { MonthlySalesReport } from './MonthlySalesReport';
import { ExpenseSheet } from './ExpenseSheet';

export function ReportsDashboard() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfitLossReport />
        <MonthlySalesReport />
      </div>
      <ExpenseSheet />
    </div>
  );
}