import React, { useState, useEffect } from 'react';
import './style.css';
import '../style.css';
import WidgetCloseButton from '../WidgetCloseButton';

function CurrencyConverter({
  isHidden,
  setIsHidden,
  wasPressed,
  setWasPressed
}) {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(1);

  const currencies = ['EUR', 'USD', 'PLN', 'UAH'];

  const handleCurrenciesSwap = () => {
    const _fromCurrency = fromCurrency;
    const _toCurrency = toCurrency;
    setFromCurrency(_toCurrency);
    setToCurrency(_fromCurrency);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const json = await response.json();
      setExchangeRate(json.rates[toCurrency]);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const json = await response.json();
      setExchangeRate(json.rates[toCurrency]);
      setConvertedAmount((amount * json.rates[toCurrency]).toFixed(2));
    }
    if (fromCurrency !== toCurrency) {
      fetchData();
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
          <div className="InputRow">
            <input
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

          <div
          className="SwapCurrencies"
          onClick={handleCurrenciesSwap}
          >
            <img src="images/TasksArrows1.png" className="SwapIcon" />
          </div>

          <div className="InputRow">
            <input
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
