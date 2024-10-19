import React, { useState } from 'react';
import FinancialOverview from './Widgets/FinancialOverview/FinancialOverview';
import Mail from './Widgets/Mail/Mail';
import Transactions from './Widgets/Transactions/Transactions';
import Tasks from './Widgets/Tasks/Tasks';
import InvestmentPropositions from './Widgets/InvestmentPropositions/InvestmentPropositions';
import Grid from 'react-easy-grid-dnd'


function WidgetsContainer({
  MailSettings,
  TransactionsSettings,
  FinancialOverviewSettings,
  TasksSettings,
  InvestmentPropositionsSettings
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
      <Tasks
      isHidden={TasksSettings.isHidden}
      setIsHidden={TasksSettings.setIsHidden}
      wasPressed={TasksSettings.wasPressed}
      setWasPressed={TasksSettings.setWasPressed}
      />
      <InvestmentPropositions
      isHidden={InvestmentPropositionsSettings.isHidden}
      setIsHidden={InvestmentPropositionsSettings.setIsHidden}
      wasPressed={InvestmentPropositionsSettings.wasPressed}
      setWasPressed={InvestmentPropositionsSettings.setWasPressed}
      />
    </div>
  )
}

export default WidgetsContainer
