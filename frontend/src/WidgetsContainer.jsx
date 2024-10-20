import React, { useState } from 'react';
import FinancialOverview from './Widgets/FinancialOverview/FinancialOverview';
import Mail from './Widgets/Mail/Mail';
import Draggable from 'react-draggable';
import Transactions from './Widgets/Transactions/Transactions';
import Tasks from './Widgets/Tasks/Tasks';
import InvestmentPropositions from './Widgets/InvestmentPropositions/InvestmentPropositions';
import CurrencyConverter from './Widgets/CurrencyConverter/CurrencyConverter';
import StockRecommendations from './Widgets/StockRecommendations/StockRecommendations'


const GRID_SIZE = 1; 

function WidgetsContainer({
  MailSettings,
  TransactionsSettings,
  FinancialOverviewSettings,
  TasksSettings,
  InvestmentPropositionsSettings,
  CurrencyConverterSettings,
  StockRecommendationsSettings,
}) {
  const [TransactionsPosition, setTransactionsPosition] = useState({ x: 0, y: 0 });
  const [MailPosition, setMailPosition] = useState({ x: 0, y: 0 });
  const [TasksPosition, setTasksPosition] = useState({ x: 0, y: 0 });
  const [InvestmentPropositionsPosition, setInvestmentPropositionsPosition] = useState({ x: 0, y: 0 });
  const [CurrencyConverterPosition, setCurrencyConverterPosition] = useState({ x: 0, y: 0 });
  const [FinancialOverviewPosition, setFinancialOverviewPosition] = useState({ x: 0, y: 0 });
  const [StockRecommendationsPosition, setStockRecommendationsPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (e, data, setPosition) => {
    const newX = Math.round(data.x / GRID_SIZE) * GRID_SIZE;
    const newY = Math.round(data.y / GRID_SIZE) * GRID_SIZE;
    setPosition({ x: newX, y: newY });
  };

  return (
    <>
      <Draggable
        position={InvestmentPropositionsPosition}
        onStop={(e, data) => handleDrag(e, data, setInvestmentPropositionsPosition)}
        grid={[GRID_SIZE, GRID_SIZE]}
      >
        <div className="tile">
          <InvestmentPropositions
          isHidden={InvestmentPropositionsSettings.isHidden}
          setIsHidden={InvestmentPropositionsSettings.setIsHidden}
          wasPressed={InvestmentPropositionsSettings.wasPressed}
          setWasPressed={InvestmentPropositionsSettings.setWasPressed}
          />
        </div>
      </Draggable>
      <Draggable
        position={TransactionsPosition}
        onStop={(e, data) => handleDrag(e, data, setTransactionsPosition)}
        grid={[GRID_SIZE, GRID_SIZE]} // Snap to grid
      >
        <div className="tile">
          <Transactions 
          isHidden={TransactionsSettings.isHidden}
          setIsHidden={TransactionsSettings.setIsHidden}
          wasPressed={TransactionsSettings.wasPressed}
          setWasPressed={TransactionsSettings.setWasPressed}
          />
        </div>
      </Draggable>
      <Draggable
        position={TasksPosition}
        onStop={(e, data) => handleDrag(e, data, setTasksPosition)}
        grid={[GRID_SIZE, GRID_SIZE]}
      >
        <div className="tile">
          <Tasks
          isHidden={TasksSettings.isHidden}
          setIsHidden={TasksSettings.setIsHidden}
          wasPressed={TasksSettings.wasPressed}
          setWasPressed={TasksSettings.setWasPressed}
          />
        </div>
      </Draggable>
      <Draggable
        position={CurrencyConverterPosition}
        onStop={(e, data) => handleDrag(e, data, setCurrencyConverterPosition)}
        grid={[GRID_SIZE, GRID_SIZE]}
      >
        <div className="tile">
          <CurrencyConverter
          isHidden={CurrencyConverterSettings.isHidden}
          setIsHidden={CurrencyConverterSettings.setIsHidden}
          wasPressed={CurrencyConverterSettings.wasPressed}
          setWasPressed={CurrencyConverterSettings.setWasPressed}
          />
        </div>
      </Draggable>
      <Draggable
        position={FinancialOverviewPosition}
        onStop={(e, data) => handleDrag(e, data, setFinancialOverviewPosition)}
        grid={[GRID_SIZE, GRID_SIZE]}
      >
        <div className="tile">
          <FinancialOverview 
          isHidden={FinancialOverviewSettings.isHidden}
          setIsHidden={FinancialOverviewSettings.setIsHidden}
          wasPressed={FinancialOverviewSettings.wasPressed}
          setWasPressed={FinancialOverviewSettings.setWasPressed}
          />
        </div>
      </Draggable>
      <Draggable
        position={MailPosition}
        onStop={(e, data) => handleDrag(e, data, setMailPosition)}
        grid={[GRID_SIZE, GRID_SIZE]}
      >
        <div className="tile">
          <Mail 
          isHidden={MailSettings.isHidden}
          setIsHidden={MailSettings.setIsHidden}
          wasPressed={MailSettings.wasPressed}
          setWasPressed={MailSettings.setWasPressed}
          />
        </div>
      </Draggable>
      <Draggable
        position={StockRecommendationsPosition}
        onStop={(e, data) => handleDrag(e, data, setStockRecommendationsPosition)}
        grid={[GRID_SIZE, GRID_SIZE]}
      >
        <div className="tile">
          <StockRecommendations 
          isHidden={StockRecommendationsSettings.isHidden}
          setIsHidden={StockRecommendationsSettings.setIsHidden}
          wasPressed={StockRecommendationsSettings.wasPressed}
          setWasPressed={StockRecommendationsSettings.setWasPressed}
          />
        </div>
      </Draggable>
    </>
  );
}

export default WidgetsContainer
