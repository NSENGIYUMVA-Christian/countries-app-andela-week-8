let allCountriesContainer = document.querySelector(".all-countries-container");
let searchedItem = document.querySelector(".searchedItem");
let searchBtn = document.querySelector("#searchBtn");
console.log("search item", searchedItem);
console.log("search btn", searchBtn);
// search by country name
searchBtn.addEventListener("click", function () {
  let searchedName = searchedItem.value;
  getCountryByName(searchedName);
});

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
    const flagAPI = response[0].flags.png;
    const populationAPI = response[0].population;
    const regionAPI = response[0].region;
    const subRegionApi = response[0].subregion;
    const capitalAPI = response[0].capital[0];
    const nativeName = response[0].name.nativeName.eng.official;
    const topLevelDomain = response[0].tld[0];
    const currency = response[0].currencies;
    const languageAPI = response[0].languages;
    const borderCountries = response[0].borders;
    console.log(`
    name: ${countryNmAPI}
      flag: ${flagAPI},
      population: ${populationAPI},
      region: ${regionAPI},
      subRegion: ${subRegionApi},
      capital: ${capitalAPI},
      native: ${nativeName},
      topLevel: ${topLevelDomain},
      currency: ${currency},
      language: ${languageAPI},
      borders: ${borderCountries}`);

    console.log(response);
    console.log("succeed");

    // delete all contents for all countries
    while (allCountriesContainer.firstChild) {
      allCountriesContainer.removeChild(allCountriesContainer.firstChild);
    }
    // create a new blocks for single country
    let singleCountrySearchContainer = document.createElement("section");
    // flag image
    let flagImg = document.createElement("img");
    flagImg.src = flagAPI;
    singleCountrySearchContainer.appendChild(flagImg);

    // country name
    let nameH2 = document.createElement("h2");
    let nameText = document.createTextNode(countryNmAPI);
    nameH2.appendChild(nameText);
    nameH2.style.marginBottom = "10px";
    singleCountrySearchContainer.appendChild(nameH2);
    // population
    let populationP = document.createElement("p");
    let populationText = document.createTextNode(
      `Population: ${Number(populationAPI).toLocaleString()}`
    );
    populationP.appendChild(populationText);
    populationP.style.marginBottom = "4px";
    singleCountrySearchContainer.appendChild(populationP);

    //region
    let regionP = document.createElement("p");
    let regionText = document.createTextNode(`Region: ${regionAPI}`);
    regionP.appendChild(regionText);
    regionP.style.marginBottom = "4px";
    singleCountrySearchContainer.appendChild(regionP);

    //capital
    let capitalP = document.createElement("p");
    let capitalText = document.createTextNode(`Capital: ${capitalAPI}`);
    capitalP.appendChild(capitalText);
    singleCountrySearchContainer.appendChild(capitalP);
    // appending singleCountrySearchContainer to  allCountriesContainer
    allCountriesContainer.appendChild(singleCountrySearchContainer);
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
      let imgContainer = document.createElement("div");
      let otherInfoContainer = document.createElement("div");

      // flag image
      let flagImg = document.createElement("img");
      flagImg.src = allCountries[i].flags.png;
      imgContainer.appendChild(flagImg);

      // country name
      let nameH2 = document.createElement("h2");
      let nameText = document.createTextNode(allCountries[i].name.common);
      nameH2.appendChild(nameText);
      nameH2.style.marginBottom = "10px";
      otherInfoContainer.appendChild(nameH2);

      // population
      let populationP = document.createElement("p");
      let populationText = document.createTextNode(
        `Population: ${Number(allCountries[i].population).toLocaleString()}`
      );
      populationP.appendChild(populationText);
      populationP.style.marginBottom = "4px";
      otherInfoContainer.appendChild(populationP);

      //region
      let regionP = document.createElement("p");
      let regionText = document.createTextNode(
        `Region: ${allCountries[i].region}`
      );
      regionP.appendChild(regionText);
      regionP.style.marginBottom = "4px";
      otherInfoContainer.appendChild(regionP);

      //capital
      let capitalP = document.createElement("p");
      let capitalText;
      if (allCountries[i]?.capital) {
        capitalText = document.createTextNode(
          `Capital: ${allCountries[i].capital[0]}`
        );
      } else {
        capitalText = document.createTextNode("Capital: N/A");
      }

      capitalP.appendChild(capitalText);
      otherInfoContainer.appendChild(capitalP);
      //add styles to singleCountryContainer
      singleCountryContainer.classList.add("single-country-styles");

      //adding styles to imgContainer
      imgContainer.classList.add("img-Container-Styles");
      //adding styles to otherInfoContainer
      otherInfoContainer.classList.add("other-InfoContainer-Styles");

      // appending img container
      singleCountryContainer.appendChild(imgContainer);
      //appending other info container
      singleCountryContainer.appendChild(otherInfoContainer);
      //appending single country container
      allCountriesContainer.appendChild(singleCountryContainer);
    }

    console.log(allCountries);
  } catch (error) {
    console.log(error);
  }
}
getAllCountries();
