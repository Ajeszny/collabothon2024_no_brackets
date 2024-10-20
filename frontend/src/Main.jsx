import SideBar from './SideBar';
import WidgetsContainer from './WidgetsContainer';
import React, { useState } from 'react';

function Main() {
  const [MailIsHidden, setMailIsHidden] = useState(false);
  const [MailWasPressed, setMailWasPressed] = useState(false);
  const [TransactionsIsHidden, setTransactionsIsHidden] = useState(true);
  const [TransactionsWasPressed, setTransactionsWasPressed] = useState(true);
  const [FinancialOverviewIsHidden, setFinancialOverviewIsHidden] = useState(true);
  const [FinancialOverviewWasPressed, setFinancialOverviewWasPressed] = useState(true);
  const [TasksIsHidden, setTasksIsHidden] = useState(true);
  const [TasksWasPressed, setTasksWasPressed] = useState(true);
  const [InvestmentPropositionsIsHidden, setInvestmentPropositionsIsHidden] = useState(true);
  const [InvestmentPropositionsWasPressed, setInvestmentPropositionsWasPressed] = useState(true);
  const [CurrencyConverterIsHidden, setCurrencyConverterIsHidden] = useState(false);
  const [CurrencyConverterWasPressed, setCurrencyConverterWasPressed] = useState(false);
  const [StockRecommendationsIsHidden, setStockRecommendationsIsHidden] = useState(false);
  const [StockRecommendationsWasPressed, setStockRecommendationsWasPressed] = useState(false);

  const MailSettings = {
    isHidden: MailIsHidden,
    setIsHidden: setMailIsHidden,
    wasPressed: MailWasPressed,
    setWasPressed: setMailWasPressed,
  };

  const TransactionsSettings = {
    isHidden: TransactionsIsHidden,
    setIsHidden: setTransactionsIsHidden,
    wasPressed: TransactionsWasPressed,
    setWasPressed: setTransactionsWasPressed,
  };

  const FinancialOverviewSettings = {
    isHidden: FinancialOverviewIsHidden,
    setIsHidden: setFinancialOverviewIsHidden,
    wasPressed: FinancialOverviewWasPressed,
    setWasPressed: setFinancialOverviewWasPressed,
  };

  const TasksSettings = {
    isHidden: TasksIsHidden,
    setIsHidden: setTasksIsHidden,
    wasPressed: TasksWasPressed,
    setWasPressed: setTasksWasPressed,
  };

  const InvestmentPropositionsSettings = {
    isHidden:  InvestmentPropositionsIsHidden,
    setIsHidden: setInvestmentPropositionsIsHidden,
    wasPressed:  InvestmentPropositionsWasPressed,
    setWasPressed: setInvestmentPropositionsWasPressed,
  };

  
  const CurrencyConverterSettings = {
    isHidden: CurrencyConverterIsHidden,
    setIsHidden: setCurrencyConverterIsHidden,
    wasPressed: CurrencyConverterWasPressed,
    setWasPressed: setCurrencyConverterWasPressed,
  };

  const StockRecommendationsSettings = {
    isHidden: StockRecommendationsIsHidden,
    setIsHidden: setStockRecommendationsIsHidden,
    wasPressed: StockRecommendationsWasPressed,
    setWasPressed: setStockRecommendationsWasPressed,
  };

  return (
    <div className="Main">
      <div className="Greeting">Hello, User!</div>
      <div className="Container">
        <SideBar 
          MailSettings={MailSettings}
          TransactionsSettings={TransactionsSettings}
          FinancialOverviewSettings={FinancialOverviewSettings}
          TasksSettings={TasksSettings}
          InvestmentPropositionsSettings={InvestmentPropositionsSettings}
          CurrencyConverterSettings={CurrencyConverterSettings}
          StockRecommendationsSettings={StockRecommendationsSettings}
        />
        <WidgetsContainer 
          MailSettings={MailSettings}
          TransactionsSettings={TransactionsSettings}
          FinancialOverviewSettings={FinancialOverviewSettings}
          TasksSettings={TasksSettings}
          InvestmentPropositionsSettings={InvestmentPropositionsSettings}
          CurrencyConverterSettings={CurrencyConverterSettings}
          StockRecommendationsSettings={StockRecommendationsSettings}
        />
      </div>
    </div>
  )
}

export default Main
