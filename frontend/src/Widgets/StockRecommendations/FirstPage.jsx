import React from 'react'

function FirstPage() {
  return (
    <div className="FirstPage">
      <div className="StockRow" style={{ "margin-bottom": "20px" }}>
        <div className="StockName">Commerzbank</div>
        <div className="StockGrowth">+5,8%</div>
        <div className="StockRisk">Risk Score: 0.8</div>
      </div>
      <div className="StockRow">
        <div className="StockName">Red Hat</div>
        <div className="StockGrowth">+4,9%</div>
        <div className="StockRisk">Risk Score: 0.9</div>
      </div>
    </div>
  )
}

export default FirstPage
