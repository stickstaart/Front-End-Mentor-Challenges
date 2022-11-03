const apiUrl = "https://restcountries.com/v3.1/all";

// FETCHING DATA FROM API-SERVER //
async function getCountries() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log(data);
  return data;
}

getCountries().then(printLanguages);

function printLanguages(allCountries) {
  checkCountry(allCountries);
  const languages = Object.values(allCountries[18].languages);
  console.log(languages);
  const currencies = Object.values(allCountries[18].currencies);
  console.log(currencies[0].name);
}

function checkCountry(data) {
  const borders = Object.values(data[18].borders);
  console.log(borders);
  borders.map((x) => {
    for (i = 0; i < data.length; i++) {
      if (data[i].cca3 === x) {
        console.log(`This is country number ${i}: ${data[i].name.common}`);
      }
    }
  });
}
