const apiUrl = "https://restcountries.com/v3.1/all";

async function getCountries() {
  const response = await fetch(apiUrl);
  const data = await response.json();

  console.log(data);

  for (i = 0; i < data.length; i++) {
    console.log(data[i].name.common);
  }
}

getCountries();
