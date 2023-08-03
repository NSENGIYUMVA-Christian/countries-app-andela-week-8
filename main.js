let defaultCountryName = "rwanda";
// let country = document.querySelector(".country-name");
// let population = document.querySelector(".population");
// let region = document.querySelector(".region");
// let flag = document.querySelector(".flag");
let allCountriesContainer = document.querySelector(".all-countries-container");

async function getCountryByName(countryName) {
  try {
    let data = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`,
      {
        mode: "cors",
      }
    );

    let response = await data.json();
    // assigning html values to their corresponding values
    const countryNmAPI = response[0].name.common;
    const flagAPI = response[0].flag.png;
    const populationAPI = response[0].population;
    const regionAPI = response[0].region;
    const capitalAPI = response[0].capital[0];

    console.log(response);
    console.log("bro");
  } catch (error) {
    console.log(error);
  }
}
//getCountryByName(defaultCountryName);

// get all countries
async function getAllCountries() {
  try {
    const data = await fetch(`https://restcountries.com/v3.1/all`, {
      mode: "cors",
    });
    const allCountries = await data.json();
    // iterate through all countries and displaying it to he homepage
    for (let i = 0; i < allCountries.length; i++) {
      let singleCountryContainer = document.createElement("div");

      // flag image
      let flagImg = document.createElement("img");
      flagImg.src = allCountries[i].flags.png;
      singleCountryContainer.appendChild(flagImg);

      // country name
      let nameH2 = document.createElement("h2");
      let nameText = document.createTextNode(allCountries[i].name.common);
      nameH2.appendChild(nameText);
      singleCountryContainer.appendChild(nameH2);

      // population
      let populationP = document.createElement("p");
      let populationText = document.createTextNode(
        `Population: ${allCountries[i].population}`
      );
      populationP.appendChild(populationText);
      singleCountryContainer.appendChild(populationP);

      //region
      let regionP = document.createElement("p");
      let regionText = document.createTextNode(
        `Region: ${allCountries[i].region}`
      );
      regionP.appendChild(regionText);
      singleCountryContainer.appendChild(regionP);
      //capital
      let capitalP = document.createElement("p");
      let capitalText = document.createTextNode(
        `Capital : ${allCountries[i].capital[0]}`
      );
      capitalP.appendChild(capitalText);
      singleCountryContainer.appendChild(capitalP);
      //add styles
      singleCountryContainer.classList.add("single-country-styles");
      allCountriesContainer.appendChild(singleCountryContainer);
    }

    console.log(allCountries);
  } catch (error) {
    console.log(error);
  }
}
getAllCountries();
