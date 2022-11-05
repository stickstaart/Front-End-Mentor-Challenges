const countrycardContainer = document.querySelector(".country-card-container");
const countrydetailContainer = document.querySelector(
  ".country-detail-container"
);
const backBtn = document.querySelector(".back-btn");

backBtn.addEventListener("click", () => {
  const countryDetail = document.querySelector(".country-detail");
  countryDetail.parentNode.removeChild(countryDetail);
  const borderCountries = document.querySelector(".border-countries");
  borderCountries.parentNode.removeChild(borderCountries);
  countrycardContainer.classList.remove("invisible");
  countrydetailContainer.classList.add("invisible");
});

const apiUrl = "https://restcountries.com/v3.1/all";

// FETCHING DATA FROM API-SERVER //
async function getCountries() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

// INJECTING CODE INTO HTML //
function populateHTML(allCountries) {
  displayCountries(allCountries);
}

getCountries().then(populateHTML);

function displayCountries(countriesdata) {
  let id = 0;

  countriesdata.forEach((country) => {
    let div = document.createElement("div");
    div.classList.add("country-card");
    div.id = id;
    div.insertAdjacentHTML(
      "beforeend",
      `<img src=${country.flags.png} alt="flag" class="flag" id="${id}" />
    <div class="text-container" id="${id}">
        <h1 class="name" id="${id}">${country.name.common}</h1>
        <h2 class="population" id="${id}">Population: <span class="h2text" id="${id}">${country.population.toLocaleString()}</span></h2>
        <h2 class="region" id="${id}">Region: <span class="h2text" id="${id}">${
        country.region
      }</span></h2>
        <h2 class="capital" id="${id}">Capital: <span class="h2text" id="${id}">${
        country.capital
      }</span></h2>
    </div>`
    );

    countrycardContainer.appendChild(div);

    div.addEventListener("click", (e) => {
      countrycardContainer.classList.add("invisible");
      countrydetailContainer.classList.remove("invisible");

      console.log(e.target.id);
      console.log(country.name.common);

      const languages = Object.values(country.languages);
      const currencies = Object.values(country.currencies);

      let div = document.createElement("div");
      div.classList.add("country-detail");
      div.id = e.target.id;
      div.insertAdjacentHTML(
        "beforeend",
        `
        <img src=${country.flags.png} alt="flag-detail" class="flag-detail"/>

        <div class="text-detail-top">
          <h1 class="name">${country.name.common}</h1>
          <h2 class="native-name">Native Name: <span class="h2text">${
            country.name.official
          }</span></h2>
          <h2 class="population">Population: <span class="h2text">${country.population.toLocaleString()}</span></h2>
          <h2 class="region">Region: <span class="h2text">${
            country.region
          }</span></h2>
          <h2 class="sub-region">Sub Region: <span class="h2text" id="">${
            country.subregion
          }</span></h2>
          <h2 class="capital" id="">Capital: <span class="h2text" id="">${
            country.capital
          }</span></h2>
        </div>

        <div class="text-detail-bottom">
          <h2 class="top-level-domain">Top Level Domain: <span class="h2text">${
            country.tld
          }</span></h2>
          <h2 class="currencies" id="">Currencies: <span class="h2text">${
            currencies[0].name
          }</span></h2>
          <h2 class="languages" id="">Languages: <span class="h2text">${languages.join(
            ", "
          )}</span></h2>
        </div>
      `
      );

      let div2 = document.createElement("div");
      div2.classList.add("border-countries");

      if (country.borders) {
        console.log(`These are my neighbors: ${country.borders}`);
        div2.insertAdjacentHTML(
          "beforeend",
          `<h2 class="border-countries-title">Border Countries:</h2>`
        );

        country.borders.map((x) => {
          for (i = 0; i < countriesdata.length; i++) {
            if (countriesdata[i].cca3 === x) {
              let btn = document.createElement("button");
              btn.classList.add("border-country");
              btn.id = i;
              btn.innerHTML = countriesdata[i].name.common;
              btn.addEventListener("click", (e) => {
                console.log(
                  `You clicked ${countriesdata[e.target.id].name.common}`
                );
              });
              div2.appendChild(btn);
            }
          }
        });
      } else {
        console.log("I have no neighbors.");
      }
      countrydetailContainer.appendChild(div);
      countrydetailContainer.appendChild(div2);
    });
    id++;
  });
}

// let borderbtn = document.querySelector(".border-country");
// borderbtn.addEventListener("click", () => {
//   console.log("I work");
// });

// div2.insertAdjacentHTML(
//   "beforeend",
//   `<button class="border-country" id=${i}>${countriesdata[i].name.common}</button>`
// );
