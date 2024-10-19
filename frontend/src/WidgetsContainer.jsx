import React from 'react';
import Mail from './Widgets/Mail/Mail';

function WidgetsContainer({ isOpen }) {
  return (
    <div
    style={{ width: isOpen ? "90%" : "95%" }}
    className="WidgetsContainer"
    >
      <Mail />
    </div>
  )
}

export default WidgetsContainer
