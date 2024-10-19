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

  const MailSettings = {
    isHidden: MailIsHidden,
    setIsHidden: setMailIsHidden,
    MailWasPressed: MailWasPressed,
    setMailWasPressed: setMailWasPressed,
  };

  const TransactionsSettings = {
    isHidden: TransactionsIsHidden,
    setIsHidden: setTransactionsIsHidden,
    MailWasPressed: TransactionsWasPressed,
    setMailWasPressed: setTransactionsWasPressed,
  };

  const FinancialOverviewSettings = {
    isHidden: FinancialOverviewIsHidden,
    setIsHidden: setFinancialOverviewIsHidden,
    MailWasPressed: FinancialOverviewWasPressed,
    setMailWasPressed: setFinancialOverviewWasPressed,
  };

  return (
    <div className="Main">
      <div className="Greeting">Hello, User!</div>
      <div className="Container">
        <SideBar 
          MailSettings={MailSettings}
          TransactionsSettings={TransactionsSettings}
          FinancialOverviewSettings={FinancialOverviewSettings}
        />
        <WidgetsContainer 
          MailSettings={MailSettings}
          TransactionsSettings={TransactionsSettings}
          FinancialOverviewSettings={FinancialOverviewSettings}
        />
      </div>
    </div>
  )
}

export default Main
