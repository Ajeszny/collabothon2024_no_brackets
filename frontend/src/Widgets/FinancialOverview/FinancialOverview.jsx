import React, { useState } from 'react'
import './style.css'
import '../style.css'
import WidgetCloseButton from '../WidgetCloseButton'
import InteractivePieChart from './Chart';
import BarChart from './BarChart'
import DropDown from './DropDown';

function FinancialOverview({
  isHidden,
  setIsHidden,
  wasPressed,
  setWasPressed
}) {
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');

  return (
    isHidden ?
    <></> :
    <div
    style={ wasPressed ? { opacity: 0 } : {} }
    className="FinancialOverview"
    >
      <WidgetCloseButton setIsHidden={setIsHidden} setWasPressed={setWasPressed} />
      <div className="Header">
        <img className="HeaderIcon" src="images/FinancialOverviewIcon.png" />
        <p className="HeaderTitle">FinancialOverview</p>
        <DropDown selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
      </div>
      <div className="FinancialOverviewContent">
        <div className="FinancialOverviewChart"><InteractivePieChart /></div>
        <div className="FinancialOverviewBarChart"><BarChart /></div>
      </div>
    </div>
  )
}

export default FinancialOverview
