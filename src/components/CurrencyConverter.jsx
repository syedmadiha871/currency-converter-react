import { useEffect, useState } from "react";

const CurrencyConverter = () => {

  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [rates, setRates] = useState({});
  const [result, setResult] = useState("");

  const currencyList = [
    "USD",
    "INR",
    "EUR",
    "GBP",
    "JPY",
    "AUD",
    "CAD"
  ];

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then(res => res.json())
      .then(data => {
        setRates(data.rates);
      });
  }, []);

  const convertCurrency = () => {

    if (!amount || amount <= 0) {
      setResult("Enter a valid amount");
      return;
    }

    const usdAmount = amount / rates[from];
    const convertedAmount = usdAmount * rates[to];

    setResult(`${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`);
  };

  return (
    <div className="converter">

      <h2>Currency Converter</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br /><br />

      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        {currencyList.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>

      <select value={to} onChange={(e) => setTo(e.target.value)}>
        {currencyList.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>

      <br /><br />

      <button onClick={convertCurrency}>Convert</button>

      <p className="result">{result}</p>

    </div>
  );
};

export default CurrencyConverter;