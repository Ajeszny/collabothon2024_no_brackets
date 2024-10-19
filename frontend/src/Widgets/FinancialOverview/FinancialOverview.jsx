import React, { useState } from 'react'
import './style.css'
import '../style.css'
import WidgetCloseButton from '../WidgetCloseButton'
import InteractivePieChart from './Chart';

function FinancialOverview() {
  const [isHidden, setIsHidden] = useState(false);
  const [wasPressed, setWasPressed] = useState(false);

  return (
    isHidden ?
    <></> :
    <div
    style={ wasPressed ? { background: "gray" } : {} }
    className="FinancialOverview"
    >
      <WidgetCloseButton setIsHidden={setIsHidden} setWasPressed={setWasPressed} />
      <div className="Header">
        <img className="HeaderIcon" src="images/FinancialOverviewIcon.png" />
        <p className="HeaderTitle">FinancialOverview</p>
      </div>
      <div className="FinancialOverviewContent">
        <div className="FinancialOverviewChart"><InteractivePieChart /></div>
      </div>
    </div>
  )
}

export default FinancialOverview
