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
    style={ wasPressed ? { opacity: 0 } : {} }
    className="Mail"
    >
      <WidgetCloseButton setIsHidden={setIsHidden} setWasPressed={setWasPressed} />
      <div className="Header">
        <img className="HeaderIcon" src="images/MailIcon.png" />
        <p className="HeaderTitle">Mail</p>
      </div>
      <div className="MailContent">
        <div className="MailRow">
          <div className="MailRowIcon"><img src="images/MailRowUrgentIcon.png" /></div>
          <div className="MailRowContent">Urgent message</div>
        </div>
        <div className="MailRow">
          <div className="MailRowIcon"><img src="images/MailRowRegularIcon.png" /></div>
          <div className="MailRowContent">Regular message</div>
        </div>
        <div className="MailRow">
          <div className="MailRowIcon"><img src="images/MailRowRegularIcon.png" /></div>
          <div className="MailRowContent">Empty message</div>
        </div>
        <div className="MailRow">
          <div className="MailRowIcon"><img src="images/MailRowRegularIcon.png" /></div>
          <div className="MailRowContent">Empty message</div>
        </div>
        <div className="MailRow">
          <div className="MailRowIcon"><img src="images/MailRowRegularIcon.png" /></div>
          <div className="MailRowContent">Empty message</div>
        </div>
      </div>
    </div>
  )
}

export default Mail
