let defaultCountryName = "rwanda";

async function getAllData(countryName) {
  try {
    let data = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`,
      {
        mode: "cors",
      }
    );

    let response = await data.json();

    console.log(response);
    console.log("okk");
  } catch (error) {
    console.log(error);
  }
}

// default run on the first render
getAllData(defaultCountryName);
