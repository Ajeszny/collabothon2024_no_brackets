import SideBar from './SideBar';
import WidgetsContainer from './WidgetsContainer';
import React, { useState } from 'react';

function Main() {
  const [MailIsHidden, setMailIsHidden] = useState(false);
  const [MailWasPressed, setMailWasPressed] = useState(false);
  const [TransactionsIsHidden, setTransactionsIsHidden] = useState(false);
  const [TransactionsWasPressed, setTransactionsWasPressed] = useState(false);
  const [FinancialOverviewIsHidden, setFinancialOverviewIsHidden] = useState(false);
  const [FinancialOverviewWasPressed, setFinancialOverviewWasPressed] = useState(false);
  const [TasksIsHidden, setTasksIsHidden] = useState(false);
  const [TasksWasPressed, setTasksWasPressed] = useState(false);
  const [InvestmentPropositionsIsHidden, setInvestmentPropositionsIsHidden] = useState(false);
  const [InvestmentPropositionsWasPressed, setInvestmentPropositionsWasPressed] = useState(false);
  const [CurrencyConverterIsHidden, setCurrencyConverterIsHidden] = useState(false);
  const [CurrencyConverterWasPressed, setCurrencyConverterWasPressed] = useState(false);
  

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
        />
        <WidgetsContainer 
          MailSettings={MailSettings}
          TransactionsSettings={TransactionsSettings}
          FinancialOverviewSettings={FinancialOverviewSettings}
          TasksSettings={TasksSettings}
          InvestmentPropositionsSettings={InvestmentPropositionsSettings}
          CurrencyConverterSettings={CurrencyConverterSettings}
          
        />
      </div>
    </div>
  )
}

export default Main
