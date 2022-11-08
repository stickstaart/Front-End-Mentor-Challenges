const apiUrl = "https://restcountries.com/v3.1/all";
const container = document.querySelector(".container");

// FETCHING DATA FROM API-SERVER //
async function getCountries() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log(data);
  return data;
}

getCountries().then(printLanguages);

function printLanguages(allCountries) {
  populateHTML(allCountries);
  checkCountry(allCountries);
  // const languages = Object.values(allCountries[18].languages);
  // console.log(languages);
  // const currencies = Object.values(allCountries[18].currencies);
  // console.log(currencies[0].name);
}

const populateHTML = (data) => {
  console.log(data[0]);
  const div = document.createElement("div");
  const btn = document.createElement("button");
  btn.innerHTML = data[0].name.common;
  div.appendChild(btn);
  container.appendChild(div);
  btn.addEventListener("click", detailCountry);
};

function checkCountry(data) {
  const borders = data[18].borders;
  console.log(borders);
  borders.map((x) => {
    for (i = 0; i < data.length; i++) {
      if (data[i].cca3 === x) {
        console.log(`This is country number ${i}: ${data[i].name.common}`);
      }
    }
  });
}

const detailCountry = (data) => {
  console.log(data);
};
