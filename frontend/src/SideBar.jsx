function SideBar({
  MailSettings,
  TransactionsSettings,
  FinancialOverviewSettings
}) {
  const handleToggle = ({ isHidden, setIsHidden, wasPressed, setWasPressed }) => {
    setIsHidden(prev => !prev);
    if (!isHidden) {
      setWasPressed(true);
    }
  }
  return (
    <div className="SideBar">
      <div
      className="VisibilityToggle"
      onClick={() => handleToggle(MailSettings)}  
      >
        <img src="images/MailIcon.png" />
      </div>
    </div>
  )
}

export default SideBar
