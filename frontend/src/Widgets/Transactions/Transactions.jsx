import React, { useState, useCallback, useEffect } from 'react';
import './style.css'; // Your existing styles
import '../style.css'; // Your existing styles
import WidgetCloseButton from '../WidgetCloseButton';

function Transactions() {
  const [isHidden, setIsHidden] = useState(false);
  const [wasPressed, setWasPressed] = useState(false);
  const [transactions, setTransactions] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:8000/get_transactions", {method: "GET"});
      const json = await data.json();
      setTransactions(json);
      //console.log({ json });
    };

    fetchData()
      .catch(err => {
        console.error({ err });
      });
  }, []);


  return (
    isHidden ? null : (
      <div style={wasPressed ? { opacity: 0 } : {}} className="TransactionWidget">
        <WidgetCloseButton setIsHidden={setIsHidden} setWasPressed={setWasPressed} />
        <div className="Header">
          <img className="HeaderIcon" src="images/TransactionIcon.png" alt="Transaction Icon" />
          <p className="HeaderTitle">Transactions</p>
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
