const BASE_URL = "https://v6.exchangerate-api.com/v6/0794e0f96acbb2670d3cd11a/latest"; // Base URL for the exchange rate API

const dropdowns = document.querySelectorAll(".dropdown select"); // Selecting all dropdown elements
const btn = document.querySelector("form button"); // Selecting the form button
const fromCurr = document.querySelector(".from select"); // Selecting the 'from' currency dropdown
const toCurr = document.querySelector(".to select"); // Selecting the 'to' currency dropdown
const msg = document.querySelector(".msg"); // Selecting the message display element

// Populating the dropdowns with currency options from countryList
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  // Adding event listener to update the flag when the currency changes
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Function to update the exchange rate
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input"); // Selecting the input field for amount
  let amtVal = amount.value; // Getting the value of the amount
  if (amtVal === "" || amtVal < 1) { // If the amount is empty or less than 1, set it to 1
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value}`; // Constructing the URL for the API call
  let response = await fetch(URL); // Fetching the data from the API
  let data = await response.json(); // Parsing the JSON data
  let rate = data.conversion_rates[toCurr.value]; // Getting the conversion rate for the selected currencies

  let finalAmount = amtVal * rate; // Calculating the final amount
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`; // Displaying the result
};

// Function to update the flag image based on the selected currency
const updateFlag = (element) => {
  let currCode = element.value; // Getting the currency code
  let countryCode = countryList[currCode]; // Getting the corresponding country code
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; // Constructing the flag image URL
  let img = element.parentElement.querySelector("img"); // Selecting the image element
  img.src = newSrc; // Setting the new source for the image
};

// Adding event listener to the button to prevent default form submission and update the exchange rate
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

// Updating the exchange rate on window load
window.addEventListener("load", () => {
  updateExchangeRate();
});
