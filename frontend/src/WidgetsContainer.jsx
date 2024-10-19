import React from 'react';
import Mail from './Widgets/Mail/Mail';
import Transactions from './Widgets/Transactions/Transactions';
import Tasks from './Widgets/Tasks/Tasks';

function WidgetsContainer({ isOpen }) {
  return (
    <div
    style={{ width: isOpen ? "90%" : "95%" }}
    className="WidgetsContainer"
    >
      <Mail />
      <Transactions />
      <Tasks />
    </div>
  )
}

export default WidgetsContainer
