import React from 'react'
import './style.css'

function WidgetCloseButton({ setIsHidden, setWasPressed }) {
  const handleHideWidget = async () => {
    setWasPressed(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsHidden(true);
      }, 3000);
    });
  };

  return (
    <div className="WidgetCloseButton">
      <img 
      className="WidgetCloseButtonIcon"
      onClick={ handleHideWidget }
      src="images/WidgetCloseIcon.png"
      />
    </div>
  )
}

export default WidgetCloseButton
