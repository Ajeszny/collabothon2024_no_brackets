import React, { useState, useEffect } from 'react';
import './style.css';
import '../style.css';
import WidgetCloseButton from '../WidgetCloseButton';
import axios from 'axios';

function CurrencyConverter({
  isHidden,
  setIsHidden,
  wasPressed,
  setWasPressed
}) {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(1);

  useEffect(() => {
    // Fetch available currencies and the initial exchange rate
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => {
        const currencyList = Object.keys(response.data.rates);
        setCurrencies(currencyList);
        setExchangeRate(response.data.rates[toCurrency]);
      });
  }, []);

  useEffect(() => {
    // Update the exchange rate when the selected currencies change
    if (fromCurrency !== toCurrency) {
      axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => {
          setExchangeRate(response.data.rates[toCurrency]);
          setConvertedAmount((amount * response.data.rates[toCurrency]).toFixed(2));
        });
    }
  }, [fromCurrency, toCurrency, amount]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setConvertedAmount((e.target.value * exchangeRate).toFixed(2));
  };

  const handleConvertedAmountChange = (e) => {
    setConvertedAmount(e.target.value);
    setAmount((e.target.value / exchangeRate).toFixed(2));
  };

  return (
    isHidden ? <></> :
      <div
        style={wasPressed ? { opacity: 0 } : { opacity: 1 }}
        className="CurrencyConverter"
      >
        <WidgetCloseButton setIsHidden={setIsHidden} setWasPressed={setWasPressed} />
        <div className="Header">
          <img className="HeaderIcon" src="images/CurrencyConverterIcon.png" alt="Currency Icon" />
          <p className="HeaderTitle">Currency Converter</p>
        </div>

        <div className="CurrencyContent">
          {/* First row: Amount input and from currency selection */}
          <div className="InputRow">
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Amount to convert"
              className="AmountInput"
            />
            <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)} className="CurrencySelect">
              {currencies.map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          {/* Second row: Converted amount input and to currency selection */}
          <div className="InputRow">
            <input
              type="number"
              value={convertedAmount}
              onChange={handleConvertedAmountChange}
              placeholder="Converted amount"
              className="AmountInput"
              readOnly
            />
            <select value={toCurrency} onChange={e => setToCurrency(e.target.value)} className="CurrencySelect">
              {currencies.map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div className="ExchangeRate">
            <p >
              Exchange Rate: {amount} {fromCurrency} = {(amount * exchangeRate).toFixed(2)} {toCurrency}
            </p>
          </div>

        </div>
      </div>
  );
}

export default CurrencyConverter;
