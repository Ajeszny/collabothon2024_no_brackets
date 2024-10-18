import SideBar from './SideBar';
import WidgetsContainer from './WidgetsContainer';
import React, { useState } from 'react';

function Main() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="Main">
      <div className="Greeting">Hello, User!</div>
      <div className="Container">
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <WidgetsContainer isOpen={isOpen} />
      </div>
    </div>
  )
}

export default Main
