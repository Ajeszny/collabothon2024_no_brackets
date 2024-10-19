import React from 'react';

function DropDown({ selectedCurrency, setSelectedCurrency, handleFetch }) {
  const currencies = ['EUR', 'USD', 'PLN', 'UAH'];

  const handleChange = (event) => {
    setSelectedCurrency(event.target.value);
    handleFetch();
  };

  return (
    <div className="DropDown">
      <select value={selectedCurrency} onChange={handleChange} className="DropDownMenu">
        {currencies.map((currency, index) => (
          <option key={index} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropDown;
