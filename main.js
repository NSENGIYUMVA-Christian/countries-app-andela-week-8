let allCountriesContainer = document.querySelector(".all-countries-container");
let searchedItem = document.querySelector(".searchedItem");
let searchBtn = document.querySelector("#searchBtn");
let searchByRegionSelect = document.querySelector("#regions");
let toggleColors = document.querySelector(".toggle-colors");
let changeColorMode = true;
// Get the root element
const root = document.documentElement;
// add curser pointer
toggleColors.style.cursor = "pointer";
// toggle color modes
toggleColors.addEventListener("click", function () {
  if (changeColorMode) {
    // Modify the value of the CSS variable
    root.style.setProperty("--Dark-Blue-Mode-Elements", "hsl(0, 0%, 98%)");
    root.style.setProperty("--White", "hsl(200, 15%, 8%)");
    root.style.setProperty("--Very-Dark-blue-Background", "hsl(0, 0%, 98%)");
    changeColorMode = false;
  } else {
    root.style.setProperty("--Dark-Blue-Mode-Elements", "hsl(209, 23%, 22%)");
    root.style.setProperty("--White", "hsl(0, 0%, 100%)");
    root.style.setProperty("--Very-Dark-blue-Background", "hsl(207, 26%, 17%)");
    changeColorMode = true;
  }
});

// search by region
searchByRegionSelect.addEventListener("input", function (e) {
  const selectedIndex = searchByRegionSelect.selectedIndex;
  const selectedItemName =
    searchByRegionSelect.options[selectedIndex].textContent;

  // invoking getCountriesByRegion
  getCountriesByRegion(selectedItemName);
});

// search by country name
searchBtn.addEventListener("click", function () {
  let searchedName = searchedItem.value;
  getCountryByName(searchedName);
});
//////////////////////////////////////////////get country by name/////////////////////////////////////////////////////
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
    const currencies = response[0].currencies;
    const languageAPI = response[0].languages;
    const borderCountriesApi = response[0].borders;

    // delete all contents for all countries
    while (allCountriesContainer.firstChild) {
      allCountriesContainer.removeChild(allCountriesContainer.firstChild);
    }
    // creating back btn
    let backBtnContainer = document.createElement("div");
    // styles for back btn container
    backBtnContainer.style.backgroundColor = "var( --Dark-Blue-Mode-Elements)";
    backBtnContainer.style.display = "flex";
    backBtnContainer.style.flexWrap = "wrap";
    backBtnContainer.style.width = "100px";
    backBtnContainer.style.boxShadow = "0 0 3px rgba(0, 0, 0, 0.5)";
    backBtnContainer.style.borderRadius = "5px";
    backBtnContainer.style.gap = "5px";
    backBtnContainer.style.height = "25px";
    backBtnContainer.style.padding = "5px";
    backBtnContainer.style.marginBottom = "2px";
    backBtnContainer.style.cursor = "pointer";
    // adding event listener to backBtn
    backBtnContainer.addEventListener("click", function () {
      // delete all contents for a single country canva
      while (allCountriesContainer.firstChild) {
        allCountriesContainer.removeChild(allCountriesContainer.firstChild);
      }
      // re run get all countries
      getAllCountries();
    });
    let backIcon = document.createElement("i");
    backIcon.className = "fa-solid fa-arrow-left";
    backBtnContainer.appendChild(backIcon);
    //allCountriesContainer.appendChild(backIcon);
    const backBtn = document.createElement("div");
    let backBtnText = document.createTextNode("Back");
    backBtn.appendChild(backBtnText);
    // appending back button to search page
    backBtnContainer.appendChild(backBtn);
    allCountriesContainer.appendChild(backBtnContainer);

    // create a new blocks for single country
    let singleCountrySearchContainer = document.createElement("section");
    //flag container
    let flagContainer = document.createElement("div");
    // flag image
    let flagImg = document.createElement("img");
    flagImg.src = flagAPI;
    flagContainer.appendChild(flagImg);
    singleCountrySearchContainer.appendChild(flagContainer);

    // moreInfoContainer
    let moreInfoContainer = document.createElement("div");

    ////////////////////////////////////////////////////// moreInfoContainer part 1////////////////////////////////////////////
    let moreInfoContainerPart1 = document.createElement("div");
    // country name
    let nameH2 = document.createElement("h2");
    let nameText = document.createTextNode(countryNmAPI);
    nameH2.appendChild(nameText);
    nameH2.style.marginBottom = "10px";
    moreInfoContainerPart1.appendChild(nameH2);
    // native name
    let naviteName = document.createElement("p");
    let nativeText = document.createTextNode(`Native Name ${nativeName}`);
    naviteName.appendChild(nativeText);
    naviteName.style.marginBottom = "10px";
    moreInfoContainerPart1.appendChild(naviteName);

    // population
    let populationP = document.createElement("p");
    let populationText = document.createTextNode(
      `Population: ${Number(populationAPI).toLocaleString()}`
    );
    populationP.appendChild(populationText);
    populationP.style.marginBottom = "4px";
    moreInfoContainerPart1.appendChild(populationP);

    //region
    let regionP = document.createElement("p");
    let regionText = document.createTextNode(`Region: ${regionAPI}`);
    regionP.appendChild(regionText);
    regionP.style.marginBottom = "4px";
    moreInfoContainerPart1.appendChild(regionP);
    // sub-region
    let subRegionP = document.createElement("p");
    let subRegionText = document.createTextNode(`Sub Region: ${subRegionApi}`);
    subRegionP.appendChild(subRegionText);
    subRegionP.style.marginBottom = "4px";
    moreInfoContainerPart1.appendChild(subRegionP);

    //capital
    let capitalP = document.createElement("p");
    capitalP.style.marginBottom = "4px";
    let capitalText = document.createTextNode(`Capital: ${capitalAPI}`);
    capitalP.appendChild(capitalText);

    moreInfoContainerPart1.appendChild(capitalP);
    moreInfoContainer.appendChild(moreInfoContainerPart1);

    ////////////////////////////////////////////////////// moreInfoContainer part 2////////////////////////////////////////////
    let moreInfoContainerPart2 = document.createElement("div");
    //topLevelDomain
    let topLevelDomainP = document.createElement("p");
    topLevelDomainP.style.marginBottom = "4px";
    let topLevelDomainText = document.createTextNode(
      `topLevelDomain: ${topLevelDomain}`
    );
    topLevelDomainP.appendChild(topLevelDomainText);
    moreInfoContainerPart2.appendChild(topLevelDomainP);

    //currencies
    let currenciesP = document.createElement("p");
    capitalP.style.marginBottom = "4px";
    let currenciesText;
    // iterate through currency object
    for (const [key, value] of Object.entries(currencies)) {
      currenciesText = document.createTextNode(`currencies: ${key}`);
    }

    currenciesP.appendChild(currenciesText);
    moreInfoContainerPart2.appendChild(currenciesP);

    //languages
    let languagesP = document.createElement("p");
    languagesP.style.marginBottom = "4px";
    let languagesText = document.createTextNode(``);
    // iterate through language object
    languagesP.textContent = "languages :";
    for (const [key, value] of Object.entries(languageAPI)) {
      languagesP.textContent += ` ${value},`;
    }

    languagesP.appendChild(languagesText);
    moreInfoContainerPart2.appendChild(languagesP);
    moreInfoContainer.appendChild(moreInfoContainerPart2);
    ////////////////////////////////////////////////////// moreInfoContainer part 2 b ////////////////////////////////////////////
    let moreInfoContainerPart2b = document.createElement("div");
    moreInfoContainerPart2b.style.margin = "14px";
    //borderCountries
    let borderCountriesP = document.createElement("p");
    // styles for border countries
    borderCountriesP.style.Width = "100%";

    // borderCountriesP.style.display = "flex";
    // borderCountriesP.style.justifyContent = "center";
    borderCountriesP.style.alignItems = "center";

    let borderCountriesText = document.createTextNode(
      `borderCountries: ${borderCountriesApi}`
    );
    borderCountriesP.appendChild(borderCountriesText);
    moreInfoContainerPart2b.appendChild(borderCountriesP);
    moreInfoContainer.appendChild(moreInfoContainerPart2b);
    ///////////////////////////////////////////// end of information on passing info on single country page///////////////
    //adding class name of moreInfoContainer
    moreInfoContainer.classList.add("more-Info-Container");

    // append moreInfoContainer to singleCountrySearchContainer
    singleCountrySearchContainer.appendChild(moreInfoContainer);

    //add styles to singleCountrySearchContainer
    singleCountrySearchContainer.classList.add("search-country-block");
    // appending singleCountrySearchContainer to  allCountriesContainer
    allCountriesContainer.appendChild(singleCountrySearchContainer);
  } catch (error) {
    // delete all contents for all countries
    while (allCountriesContainer.firstChild) {
      allCountriesContainer.removeChild(allCountriesContainer.firstChild);
    }
    const errorNode = document.createTextNode("invalid country name");
    allCountriesContainer.appendChild(errorNode);
  }
}

///////////////////////////////////////////////////get all countries////////////////////////////////////////////////
async function getAllCountries() {
  try {
    const data = await fetch(`https://restcountries.com/v3.1/all`, {
      mode: "cors",
    });
    const allCountries = await data.json();
    // iterate through all countries and displaying it to he homepage
    for (let i = 0; i < allCountries.length; i++) {
      let singleCountryContainer = document.createElement("div");
      // add on click event on each single country
      singleCountryContainer.addEventListener("click", function (e) {
        // delete all contents for all countries
        while (allCountriesContainer.firstChild) {
          allCountriesContainer.removeChild(allCountriesContainer.firstChild);
        }
        // display selected country
        // assigning html values to their corresponding values
        const countryNmAPI = allCountries[i].name.common;
        const flagAPI = allCountries[i].flags.png;
        const populationAPI = allCountries[i].population;
        const regionAPI = allCountries[i].region;
        const subRegionApi = allCountries[i].subregion;
        const capitalAPI = allCountries[i].capital[i];
        const nativeName = allCountries[i].name.nativeName.eng.official;
        const topLevelDomain = allCountries[i].tld[i];
        const currencies = allCountries[i].currencies;
        const languageAPI = allCountries[i].languages;
        const borderCountriesApi = allCountries[i].borders;

        // creating back btn
        let backBtnContainer = document.createElement("div");
        // styles for back btn container
        backBtnContainer.style.backgroundColor =
          "var( --Dark-Blue-Mode-Elements)";
        backBtnContainer.style.display = "flex";
        backBtnContainer.style.flexWrap = "wrap";
        backBtnContainer.style.width = "100px";
        backBtnContainer.style.boxShadow = "0 0 3px rgba(0, 0, 0, 0.5)";
        backBtnContainer.style.borderRadius = "5px";
        backBtnContainer.style.gap = "5px";
        backBtnContainer.style.height = "25px";
        backBtnContainer.style.padding = "5px";
        backBtnContainer.style.marginBottom = "2px";
        backBtnContainer.style.cursor = "pointer";
        // adding event listener to backBtn
        backBtnContainer.addEventListener("click", function () {
          // delete all contents for a single country canva
          while (allCountriesContainer.firstChild) {
            allCountriesContainer.removeChild(allCountriesContainer.firstChild);
          }
          // re run get all countries
          getAllCountries();
        });
        let backIcon = document.createElement("i");
        backIcon.className = "fa-solid fa-arrow-left";
        backBtnContainer.appendChild(backIcon);
        //allCountriesContainer.appendChild(backIcon);
        const backBtn = document.createElement("div");
        let backBtnText = document.createTextNode("Back");
        backBtn.appendChild(backBtnText);
        // appending back button to search page
        backBtnContainer.appendChild(backBtn);
        allCountriesContainer.appendChild(backBtnContainer);

        // create a new blocks for single country
        let singleCountrySearchContainer = document.createElement("section");
        //flag container
        let flagContainer = document.createElement("div");
        // flag image
        let flagImg = document.createElement("img");
        flagImg.src = flagAPI;
        flagContainer.appendChild(flagImg);
        singleCountrySearchContainer.appendChild(flagContainer);

        // moreInfoContainer
        let moreInfoContainer = document.createElement("div");

        ////////////////////////////////////////////////////// moreInfoContainer part 1////////////////////////////////////////////
        let moreInfoContainerPart1 = document.createElement("div");
        // country name
        let nameH2 = document.createElement("h2");
        let nameText = document.createTextNode(countryNmAPI);
        nameH2.appendChild(nameText);
        nameH2.style.marginBottom = "10px";
        moreInfoContainerPart1.appendChild(nameH2);
        // native name
        let naviteName = document.createElement("p");
        let nativeText = document.createTextNode(`Native Name ${nativeName}`);
        naviteName.appendChild(nativeText);
        naviteName.style.marginBottom = "10px";
        moreInfoContainerPart1.appendChild(naviteName);

        // population
        let populationP = document.createElement("p");
        let populationText = document.createTextNode(
          `Population: ${Number(populationAPI).toLocaleString()}`
        );
        populationP.appendChild(populationText);
        populationP.style.marginBottom = "4px";
        moreInfoContainerPart1.appendChild(populationP);

        //region
        let regionP = document.createElement("p");
        let regionText = document.createTextNode(`Region: ${regionAPI}`);
        regionP.appendChild(regionText);
        regionP.style.marginBottom = "4px";
        moreInfoContainerPart1.appendChild(regionP);
        // sub-region
        let subRegionP = document.createElement("p");
        let subRegionText = document.createTextNode(
          `Sub Region: ${subRegionApi}`
        );
        subRegionP.appendChild(subRegionText);
        subRegionP.style.marginBottom = "4px";
        moreInfoContainerPart1.appendChild(subRegionP);

        //capital
        let capitalP = document.createElement("p");
        capitalP.style.marginBottom = "4px";
        let capitalText = document.createTextNode(`Capital: ${capitalAPI}`);
        capitalP.appendChild(capitalText);

        moreInfoContainerPart1.appendChild(capitalP);
        moreInfoContainer.appendChild(moreInfoContainerPart1);

        ////////////////////////////////////////////////////// moreInfoContainer part 2////////////////////////////////////////////
        let moreInfoContainerPart2 = document.createElement("div");
        //topLevelDomain
        let topLevelDomainP = document.createElement("p");
        topLevelDomainP.style.marginBottom = "4px";
        let topLevelDomainText = document.createTextNode(
          `topLevelDomain: ${topLevelDomain}`
        );
        topLevelDomainP.appendChild(topLevelDomainText);
        moreInfoContainerPart2.appendChild(topLevelDomainP);

        //currencies
        let currenciesP = document.createElement("p");
        capitalP.style.marginBottom = "4px";
        let currenciesText;
        // iterate through currency object
        for (const [key, value] of Object.entries(currencies)) {
          currenciesText = document.createTextNode(`currencies: ${key}`);
        }
        currenciesP.appendChild(currenciesText);
        moreInfoContainerPart2.appendChild(currenciesP);

        //languages
        let languagesP = document.createElement("p");
        languagesP.style.marginBottom = "4px";
        let languagesText = document.createTextNode(``);
        // iterate through language object
        languagesP.textContent = "languages :";
        for (const [key, value] of Object.entries(languageAPI)) {
          languagesP.textContent += ` ${value},`;
        }
        languagesP.appendChild(languagesText);
        moreInfoContainerPart2.appendChild(languagesP);
        moreInfoContainer.appendChild(moreInfoContainerPart2);
        ////////////////////////////////////////////////////// moreInfoContainer part 2 b ////////////////////////////////////////////
        let moreInfoContainerPart2b = document.createElement("div");
        moreInfoContainerPart2b.style.margin = "14px";
        //borderCountries
        let borderCountriesP = document.createElement("p");
        // styles for border countries
        borderCountriesP.style.Width = "100%";

        // borderCountriesP.style.display = "flex";
        // borderCountriesP.style.justifyContent = "center";
        borderCountriesP.style.alignItems = "center";

        let borderCountriesText = document.createTextNode(
          `borderCountries: ${borderCountriesApi}`
        );
        borderCountriesP.appendChild(borderCountriesText);
        moreInfoContainerPart2b.appendChild(borderCountriesP);
        moreInfoContainer.appendChild(moreInfoContainerPart2b);
        ///////////////////////////////////////////// end of information on passing info on single country page///////////////
        //adding class name of moreInfoContainer
        moreInfoContainer.classList.add("more-Info-Container");

        // append moreInfoContainer to singleCountrySearchContainer
        singleCountrySearchContainer.appendChild(moreInfoContainer);

        //add styles to singleCountrySearchContainer
        singleCountrySearchContainer.classList.add("search-country-block");
        // appending singleCountrySearchContainer to  allCountriesContainer
        allCountriesContainer.appendChild(singleCountrySearchContainer);
      });
      /////////////////////////////end of on click event on more detail btn///////////////////////////////
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
  } catch (error) {
    // delete all contents for all countries
    while (allCountriesContainer.firstChild) {
      allCountriesContainer.removeChild(allCountriesContainer.firstChild);
    }
    const errorNode = document.createTextNode("data not found");
    allCountriesContainer.appendChild(errorNode);
  }
}

//////////////////////////////////// filtering by region/////////////////////////////////////////////////////////
async function getCountriesByRegion(regionName) {
  try {
    const data =
      await fetch(`https://restcountries.com/v3.1/region/${regionName}
    `);
    let allCountries = await data.json();

    // delete all contents for all countries
    while (allCountriesContainer.firstChild) {
      allCountriesContainer.removeChild(allCountriesContainer.firstChild);
    }
    //display return data
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
  } catch (error) {
    // delete all contents for all countries
    while (allCountriesContainer.firstChild) {
      allCountriesContainer.removeChild(allCountriesContainer.firstChild);
    }
    const errorNode = document.createTextNode("data not found");
    allCountriesContainer.appendChild(errorNode);
  }
}

// get all countries on the first render
getAllCountries();
