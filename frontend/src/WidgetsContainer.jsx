import React from 'react';
import Mail from './Widgets/Mail/Mail';
import Transactions from './Widgets/Transactions/Transactions';

function WidgetsContainer({ isOpen }) {
  return (
    <div
    style={{ width: isOpen ? "90%" : "95%" }}
    className="WidgetsContainer"
    >
      <Mail />
      <Transactions />
    </div>
  )
}

export default WidgetsContainer
