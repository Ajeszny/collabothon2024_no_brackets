import React from 'react'
import './style.css'

function WidgetCloseButton({ setIsHidden, setWasPressed }) {
  const handleHideWidget = () => {
    setWasPressed(true);
    setTimeout(() => {
      setIsHidden(true);
    }, 350);
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
