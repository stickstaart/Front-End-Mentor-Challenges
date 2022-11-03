const countrycardContainer = document.querySelector(".country-card-container");
const countrydetailContainer = document.querySelector(
  ".country-detail-container"
);
const backBtn = document.querySelector(".back-btn");

backBtn.addEventListener("click", () => {
  const countryDetail = document.querySelector(".country-detail");
  countryDetail.parentNode.removeChild(countryDetail);
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
function displayCountries(allCountries) {
  let id = 0;

  allCountries.forEach((country) => {
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
      const borderCountries = document.querySelector(".border-countries");

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

        <div class="border-countries">
          <h2 class="border-countries-title" id="">Border Countries:</h2>
          <button class="border-country" id="">Country1</button>
          <button class="border-country" id="">Country2</button>
          <button class="border-country" id="">Country3</button>
        </div>
      `
      );
      countrydetailContainer.appendChild(div);
    });

    id++;
  });
}

getCountries().then(displayCountries);

// data.borders.map((x) => {
//   for (i = 0; i < data.length; i++) {
//     if (data[i].cca3 === x) {
//       console.log(`This is country number ${i}: ${data[i].name.common}`);
//     }
//   }
// });

// if (country.borders) {
//   console.log(`These are my neighbors: ${country.borders}`);
//   country.borders.forEach((x) => {
//     console.log(`Hi there, I am neighbor ${x}`);
//   });
// } else {
//   console.log("I have no neighbors.");
// }

// borderCountries.insertAdjacentHTML("beforeend",
// `<button class="border-country" id="">Country1</button>
// <button class="border-country" id="">Country2</button>
// <button class="border-country" id="">Country3</button>`
// )
