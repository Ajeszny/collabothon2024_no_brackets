import React, { useState, useEffect } from 'react'
import './style.css'
import '../style.css'
import WidgetCloseButton from '../WidgetCloseButton'
import InteractivePieChart from './Chart';
import BarChart from './BarChart'
import DropDown from './DropDown';
import { BeatLoader } from 'react-spinners';

function FinancialOverview({
  isHidden,
  setIsHidden,
  wasPressed,
  setWasPressed
}) {
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

   
  const handleFetch = () => {
    setLoading(true);
    const fetchData = async () => {
      const data = await fetch(`http://localhost:8000/get_balance?currency=${selectedCurrency}`, {method: "GET"});
        const json = await data.json();
      setData(json);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    };
    fetchData()
    .catch(err => {
      console.error({ err });
    });
  }

  useEffect(() => {
    handleFetch();
  }, [isHidden]);

  if (loading) {
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
        <DropDown 
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        handleFetch={handleFetch}
        />
      </div>
      <div className="FinancialOverviewContent">
        <div className="FinancialOverviewChart">
          <BeatLoader color={"#FED601"}/>
        </div>
        <div className="FinancialOverviewBarChart"><BarChart /></div>
      </div>
    </div>
    );
  }

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
        <DropDown 
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        handleFetch={handleFetch}
        />
      </div>
      <div className="FinancialOverviewContent">
        <div className="FinancialOverviewChart"><InteractivePieChart data={data} /></div>
        <div className="FinancialOverviewBarChart"><BarChart /></div>
      </div>
    </div>
  )
}

export default FinancialOverview
