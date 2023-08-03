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
      let capitalText = document.createTextNode(
        `Capital : ${allCountries[i]?.capital[0]}`
      );
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
