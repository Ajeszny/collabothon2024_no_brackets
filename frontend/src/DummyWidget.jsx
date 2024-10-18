import React, { useState } from 'react';

function DummyWidget() {
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
    style={ wasPressed ? { background: "gray" } : {} }
    className="DummyWidget"
    >
      <div className="WidgetCloseButton">
        <img 
        className="WidgetCloseButtonIcon"
        onClick={ handleHideWidget }
        src="images/WidgetCloseIcon.png"
        />
      </div>
      <div className="WidgetContent">
        <p>{ wasPressed ? "This windows will disappear in 3 seconds" : "Content" }</p>
      </div>
    </div>
  )
}

export default DummyWidget
