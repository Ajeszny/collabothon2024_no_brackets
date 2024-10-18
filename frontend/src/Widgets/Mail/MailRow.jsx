import React from 'react';
import './style.css';

function MailRow({ content, type }) {
  let image = "";
  if (type == "urgent") {
    image = "images/MailRowUrgentIcon.png";
  } else {
    image = "images/MailRowRegularIcon.png";
  }
  return (
    <div className="MailRow">
      { 
        type == "empty" ?
        <div style={{width: "8px", "margin-right": "20px"}}></div> :
        <img src={image} className="MailRowIcon" />
      }
      <div className="MailRowContent">{ content }</div>
    </div>
  )
}

export default MailRow
