import React from 'react';
import FinancialOverview from './Widgets/FinancialOverview/FinancialOverview';
import Mail from './Widgets/Mail/Mail';
import Transactions from './Widgets/Transactions/Transactions';

function WidgetsContainer() {
  return (
    <div className="WidgetsContainer">
      <Mail />
      <FinancialOverview />
      <Transactions />
    </div>
  )
}

export default WidgetsContainer
