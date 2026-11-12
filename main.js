
const button = document.getElementById("search-button")
const input = document.getElementById("city-input")
const erreur = document.getElementById("erreur")
const recherche = document.getElementById("recherche")
const temperatur = document.getElementById("current-temperature")
const max = document.getElementById("temperature-max")
const min = document.getElementById("temperature-min")
const date = document.getElementById("current-date")
const ville = document.getElementById("city-name")
const humidite = document.getElementById("humidity")


button.addEventListener("click", async function(event) {
    event.preventDefault();
    if (input.value.trim() === "") {
        erreur.textContent = "Remplir le champ avec une ville";
        return;
    }

    recherche.textContent = "Recherche en cours...";
    recherche.hidden = false;
    erreur.textContent = "";

    try {
        const cityInfo = await city(input.value);
        const cityTemp = await temperature(
            cityInfo.latitude,
            cityInfo.longitude
        );
        console.log(cityInfo, cityTemp);
        temperatur.textContent = cityTemp.current.temperature_2m + "°";
        max.textContent = cityTemp.daily.temperature_2m_max[0] +"°";
        min.textContent = cityTemp.daily.temperature_2m_min[0] + "°";
        const dateMeteo = new Date(cityTemp.daily.time[0])
        date.textContent = dateMeteo.toLocaleDateString("fr-FR",{
          weekday : "long",
          day : "numeric",
          month : "long",
          year : "numeric",
        });
        ville.textContent = cityInfo.name
        humidite.textContent = cityTemp.current.relative_humidity_2m + "%"
        
    } 
    catch (error) {
        erreur.textContent = error.message;
    } 
    finally {
        recherche.hidden = true;
    }
});

async function temperature(latitude,longitude) {
const response =  await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&current=temperature_2m,relative_humidity_2m&forecast_days=5`)
if(!response.ok) {
  return "the tempetor is not found"
}
const data = await response.json()
// console.log(data)
return data
}
async function city(name) {

  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=fr&format=json`)
  if(response.ok) {
    const data = await response.json()
    return data.results[0]
  } else {
    return "the city is not found"
  }
}



