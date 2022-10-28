const countrycardContainer = document.querySelector(".country-card-container");
const countrydetailContainer = document.querySelector(
  ".country-detail-container"
);
const backBtn = document.querySelector(".back-btn");

backBtn.addEventListener("click", () => {
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
  let id = 1;

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
      countrycardContainer.classList.add("invisible");
      countrydetailContainer.classList.remove("invisible");
      console.log(e.target.id);
    });
    id++;
  });
}

getCountries().then(displayCountries);
