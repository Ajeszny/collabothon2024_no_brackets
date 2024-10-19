function SideBar({
  MailSettings,
  TransactionsSettings,
  FinancialOverviewSettings,
  TasksSettings,
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
      style={ {background: MailSettings.isHidden ? "#1f322e" : "rgba(62,172,145,175)"}}
      className="VisibilityToggle"
      onClick={() => handleToggle(MailSettings)}
      >
        <img src="images/MailIcon.png" />
      </div>
      <div
      style={ {background: FinancialOverviewSettings.isHidden ? "#1f322e" : "rgba(62,172,145,175)"}}
      className="VisibilityToggle"
      onClick={() => handleToggle(FinancialOverviewSettings)}
      >
        <img src="images/FinancialOverviewIcon.png" />
      </div>
      <div
      style={ {background: TransactionsSettings.isHidden ? "#1f322e" : "rgba(62,172,145,175)"}}
      className="VisibilityToggle"
      onClick={() => handleToggle(TransactionsSettings)}
      >
        <img src="images/TransactionsIcon.png" />
      </div>
      <div
      style={ {background: TasksSettings.isHidden ? "#1f322e" : "rgba(62,172,145,175)"}}
      className="VisibilityToggle"
      onClick={() => handleToggle(TasksSettings)}
      >
        <img src="images/TasksIcon.png" />
      </div>
    </div>
  )
}

export default SideBar
