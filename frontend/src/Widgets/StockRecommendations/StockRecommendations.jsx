import React, { useState } from 'react'
import './style.css'
import '../style.css'
import WidgetCloseButton from '../WidgetCloseButton'
import FirstPage from './FirstPage'
import SecondPage from './SecondPage'
import ThirdPage from './ThirdPage'

function StockRecommendations({
  isHidden,
  setIsHidden,
  wasPressed,
  setWasPressed
}) {
  const [page, setPage] = useState(1);

  return (
    isHidden ?
    <></> :
    <div
    style={ wasPressed ? { opacity: 0 } : {} }
    className="StockRecommendations"
    >
      <WidgetCloseButton setIsHidden={setIsHidden} setWasPressed={setWasPressed} />
      <div className="pagePicker">
        <div 
          onClick={() => setPage(1)}
          className={ page == 1 ? "pageSelector active" : "pageSelector" }
        >Stock picks</div>
        <div 
          onClick={() => setPage(2)}
          className={ page == 2 ? "pageSelector active" : "pageSelector" }
        >Saving tips</div>
        <div 
          onClick={() => setPage(3)}
          className={ page == 3 ? "pageSelector active" : "pageSelector" }
        >Risk assessment</div>
      </div>
      <div className="StockRecommendationsContainer">
        <div className="Header">
          <img className="HeaderIcon" src="images/StockRecommendations.png" />
          <p className="HeaderTitle">Stock recommendations</p>
        </div>
        <div className="StockRecommendationsContent">
          { page == 1 ? <FirstPage /> : page == 2 ? <SecondPage /> : <ThirdPage /> }
        </div>
      </div>
    </div>
  )
}

export default StockRecommendations
