import React, { useState } from 'react'
import './style.css'
import '../style.css'
import WidgetCloseButton from '../WidgetCloseButton'

function Mail() {
  const [isHidden, setIsHidden] = useState(false);
  const [wasPressed, setWasPressed] = useState(false);

  return (
    isHidden ?
    <></> :
    <div
    style={ wasPressed ? { background: "gray" } : {} }
    className="Mail"
    >
      <WidgetCloseButton setIsHidden={setIsHidden} setWasPressed={setWasPressed} />
      <div className="Header">
        <img className="HeaderIcon" src="images/MailIcon.png" />
        <p className="HeaderTitle">Mail</p>
      </div>
      <div className="MailContent">
        something
      </div>
    </div>
  )
}

export default Mail
