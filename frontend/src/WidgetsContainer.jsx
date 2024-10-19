import React from 'react';
import FinancialOverview from './Widgets/FinancialOverview/FinancialOverview';
import Mail from './Widgets/Mail/Mail';
import Transactions from './Widgets/Transactions/Transactions';
import Tasks from './Widgets/Tasks/Tasks';

function WidgetsContainer({
  MailSettings,
  TransactionsSettings,
  FinancialOverviewSettings
}) {
  return (
    <div className="WidgetsContainer">
      <Mail 
      isHidden={MailSettings.isHidden}
      setIsHidden={MailSettings.setIsHidden}
      wasPressed={MailSettings.wasPressed}
      setWasPressed={MailSettings.setWasPressed}
      />
      <FinancialOverview 
      isHidden={FinancialOverviewSettings.isHidden}
      setIsHidden={FinancialOverviewSettings.setIsHidden}
      wasPressed={FinancialOverviewSettings.wasPressed}
      setWasPressed={FinancialOverviewSettings.setWasPressed}
      />
      <Transactions 
      isHidden={TransactionsSettings.isHidden}
      setIsHidden={TransactionsSettings.setIsHidden}
      wasPressed={TransactionsSettings.wasPressed}
      setWasPressed={TransactionsSettings.setWasPressed}
      />
    </div>
  )
}

export default WidgetsContainer
