function SideBar({
  MailSettings,
  TransactionsSettings,
  FinancialOverviewSettings,
  TasksSettings,
  InvestmentPropositionsSettings,
  CurrencyConverterSettings,
  StockRecommendationsSettings,
}) {
  const handleToggle = ({ isHidden, setIsHidden, wasPressed, setWasPressed }) => {
    if (isHidden) {
      setIsHidden(false);
      setTimeout(() => {
        setWasPressed(false);
      }, 1);
      return;
    }
    setWasPressed(true);
    setTimeout(() => {
      setIsHidden(true);
    }, 350);
  }
  return (
    <div className="SideBar">
      <div
      style={ {background: MailSettings.isHidden ? "#002E3C" : "#608081"}}
      className="VisibilityToggle"
      onClick={() => handleToggle(MailSettings)}
      >
        <img src="images/MailIcon.png" />
      </div>
      <div
      style={ {background: FinancialOverviewSettings.isHidden ? "#002E3C" : "#608081"}}
      className="VisibilityToggle"
      onClick={() => handleToggle(FinancialOverviewSettings)}
      >
        <img src="images/FinancialOverviewIcon.png" />
      </div>
      <div
      style={ {background: TransactionsSettings.isHidden ? "#002E3C" : "#608081"}}
      className="VisibilityToggle"
      onClick={() => handleToggle(TransactionsSettings)}
      >
        <img src="images/TransactionsIcon.png" />
      </div>
      <div
      style={ {background: TasksSettings.isHidden ? "#002E3C" : "#608081"}}
      className="VisibilityToggle"
      onClick={() => handleToggle(TasksSettings)}
      >
        <img src="images/TasksIcon.png" />
      </div>
      <div
      style={ {background: InvestmentPropositionsSettings.isHidden ? "#002E3C" : "#608081"}}
      className="VisibilityToggle"
      onClick={() => handleToggle(InvestmentPropositionsSettings)}
      >
        <img src="images/InvestmentPropositionsIcon.png" />
      </div>

      <div
      style={ {background: CurrencyConverterSettings.isHidden ? "#002E3C" : "#608081"}}
      className="VisibilityToggle"
      onClick={() => handleToggle(CurrencyConverterSettings)}
      >
        <img src="images/CurrencyConverterIcon.png" />
      </div>

      <div
      style={ {background: StockRecommendationsSettings.isHidden ? "#002E3C" : "#608081"}}
      className="VisibilityToggle"
      onClick={() => handleToggle(StockRecommendationsSettings)}
      >
        <img src="images/StockRecommendations.png" />
      </div>

    </div>
  )
}

export default SideBar
