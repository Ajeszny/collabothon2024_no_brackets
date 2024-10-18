import React, { useState } from 'react';
import './style.css';

function WidgetTemplate({ icon, title, width, height, Content }) {
  const [isHidden, setIsHidden] = useState(false);
  const [wasPressed, setWasPressed] = useState(false);

  const handleHideWidget = async () => {
    setWasPressed(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsHidden(true);
      }, 3000);
    });
  };

  return (
    isHidden ?
    <></> :
    <div
    style={ wasPressed ? { width, height, background: "gray" } : { width, height } }
    className="WidgetTemplate"
    >
      <div className="WidgetCloseButton">
        <img 
        className="WidgetCloseButtonIcon"
        onClick={ handleHideWidget }
        src="images/WidgetCloseIcon.png"
        />
      </div>
      <div className="WidgetHeader">
        <img className="WidgetHeaderIcon" src={icon} />
        <p className="WidgetHeaderTitle">{title}</p>
      </div>
      { Content }
    </div>
  )
}

export default WidgetTemplate
