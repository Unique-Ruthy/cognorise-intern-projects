// script.js

const apiKey = "82d397ffaf10fde5b627b581";
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");
const convertButton = document.getElementById("convert");

let exchangeRates = {};

// Fetch the exchange rates and populate the currency options
async function fetchExchangeRates() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    exchangeRates = data.conversion_rates;
    populateCurrencyOptions();
  } catch (error) {
    result.textContent = "Error fetching exchange rates.";
  }
}

function populateCurrencyOptions() {
  const currencies = Object.keys(exchangeRates);
  currencies.forEach((currency) => {
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    option1.value = option2.value = currency;
    option1.textContent = option2.textContent = currency;
    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  });
  fromCurrency.value = "USD";
  toCurrency.value = "EUR";
}

function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;
  if (isNaN(amount) || amount <= 0) {
    result.textContent = "Please enter a valid amount.";
    return;
  }
  const rate = exchangeRates[to] / exchangeRates[from];
  const convertedAmount = (amount * rate).toFixed(2);
  result.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
}

convertButton.addEventListener("click", convertCurrency);

// Fetch exchange rates when the page loads
fetchExchangeRates();
