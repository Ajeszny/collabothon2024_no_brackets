import React, { useEffect, useState } from 'react';
import './style.css';
import '../style.css';
import WidgetCloseButton from '../WidgetCloseButton';

function Transactions({ isHidden, setIsHidden, wasPressed, setWasPressed }) {
  const [transactions, setTransactions] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track which transaction is hovered

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:8000/get_transactions", { method: "GET" });
      const json = await data.json();
      setTransactions(json);
    };

    fetchData().catch(err => {
      console.error({ err });
    });
  }, []);

  return (
    isHidden ? null : (
      <div style={wasPressed ? { opacity: 0 } : { opacity: 1 }} className="TransactionWidget">
        <WidgetCloseButton setIsHidden={setIsHidden} setWasPressed={setWasPressed} />
        <div className="Header">
          <img className="HeaderIcon" src="images/TransactionsIcon.png" alt="Transaction Icon" />
          <p className="HeaderTitle">Transactions</p>
        </div>
        <div className="TransactionsContent">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className="Transaction"
              onMouseEnter={() => setHoveredIndex(index)} // Set hovered index on hover
              onMouseLeave={() => setHoveredIndex(null)}  // Reset hovered index when mouse leaves
            >
              <div className="TransactionDetails">
                <p className="Description">
                  {transaction.description}
                </p>
                {/* Show the additional text when hovering */}
                {hoveredIndex === index && (
                  <p className="AdditionalInfo">Additional details about this transaction</p>
                )}
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
