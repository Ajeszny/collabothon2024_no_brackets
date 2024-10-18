import React from 'react';
import DummyWidget from './DummyWidget';

function WidgetsContainer({ isOpen }) {
  return (
    <div
    style={{ width: isOpen ? "90%" : "95%" }}
    className="WidgetsContainer"
    >
      <DummyWidget />
      <DummyWidget />
    </div>
  )
}

export default WidgetsContainer
