import './style.css'
import '../style.css'
import WidgetCloseButton from '../WidgetCloseButton'

function InvestmentPropositions({
  isHidden,
  setIsHidden,
  wasPressed,
  setWasPressed
}) {
  return (
    isHidden ?
      <></> :
      <div
        style={wasPressed ? { opacity: 0 } : { opacity: 1 }}
        className="InvestmentPropositions"
      >
        <WidgetCloseButton setIsHidden={setIsHidden} setWasPressed={setWasPressed} />
        <div className="Header">
          <img className="HeaderIcon" src="images\InvestmentPropositionsIcon.png" alt="Investment Icon" />
          <p className="HeaderTitle">Investment Propositions</p>
        </div>
        <div className="InvestmentContent">
          {/* Stocks */}
          <div className="InvestmentRow">
            <div className="InvestmentRowContent">Stocks</div>
            <div className="InvestmentRowValue">$10,000</div>
          </div>
          <div className="ProgressBar">
            <div className="Progress" style={{ width: '80%' }}></div>
          </div>

          {/* Bonds */}
          <div className="InvestmentRow">
            <div className="InvestmentRowContent">Bonds</div>
            <div className="InvestmentRowValue">$5,000</div>
          </div>
          <div className="ProgressBar">
            <div className="Progress" style={{ width: '50%' }}></div>
          </div>

          {/* Cash */}
          <div className="InvestmentRow">
            <div className="InvestmentRowContent">Cash</div>
            <div className="InvestmentRowValue">$2,500</div>
          </div>
          <div className="ProgressBar">
            <div className="Progress" style={{ width: '25%' }}></div>
          </div>
        </div>
      </div>
  )
}

export default InvestmentPropositions;
