import React, { useState } from 'react'; 
import './style.css'; // Your existing styles
import '../style.css'; // Your existing styles
import WidgetCloseButton from '../WidgetCloseButton';

function Transactions() {
  const [isHidden, setIsHidden] = useState(false);
  const [wasPressed, setWasPressed] = useState(false);

  const transactions = [
    { description: "kupno czegos tam", account: "account: **** 1111", amount: "-7590.0", currency: "eur", positive: false },
    { description: "odsetki", account: "account: **** 2222", amount: "+10.0", currency: "usd", positive: true },
    { description: "prewalutowanie", account: "account: **** 1111", amount: "-12.0", currency: "usd", positive: false },
    { description: "lorem ipsum", account: "account: **** 2222", amount: "+10.0", currency: "usd", positive: true },
    { description: "lorem ipsum", account: "account: **** 2222", amount: "+10.0", currency: "usd", positive: true }
  ];

  return (
    isHidden ? null : (
      <div style={wasPressed ? { background: "gray" } : {}} className="TransactionWidget">
        <WidgetCloseButton setIsHidden={setIsHidden} setWasPressed={setWasPressed} />
        <div className="Header">
          <a 
            href="https://www.commerzbank.de/" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center' }} 
          >
            <img className="HeaderIcon" src="images/TransactionIcon.png" alt="Transaction Icon" />
            <p className="HeaderTitle" style={{ marginLeft: '8px' }}>Transactions</p> {}
          </a>
        </div>
        <div className="TransactionsContent">
          {transactions.map((transaction, index) => (
            <div key={index} className="Transaction">
              <div className="TransactionDetails">
                <p className="Description">{transaction.description}</p>
                {transaction.account && <p className="Account">{transaction.account}</p>}
              </div>
              <div className={`Amount ${transaction.positive ? "positive" : "negative"}`}>
                {transaction.amount} {transaction.currency}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default Transactions;
