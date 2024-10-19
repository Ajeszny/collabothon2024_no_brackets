import React from 'react';
import FinancialOverview from './Widgets/FinancialOverview/FinancialOverview';
import Mail from './Widgets/Mail/Mail';

function WidgetsContainer({ isOpen }) {
  return (
    <div
    style={{ width: isOpen ? "90%" : "95%" }}
    className="WidgetsContainer"
    >
      <Mail />
      <FinancialOverview />
    </div>
  )
}

export default WidgetsContainer
