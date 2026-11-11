
const button = document.getElementById("search-button")
const input = document.getElementById("city-input")
const erreur = document.getElementById("erreur")
const recherche = document.getElementById("recherche")

button.addEventListener("click",  async function (event){
    event.preventDefault()
  if (input.value == ""){
    erreur.textContent = " remplir le champ avec une ville"
    return;
  }

  
const cityInfo = await city(input.value)

const cityTemp = await temperature(cityInfo.latitude, cityInfo.longitude)
console.log(`the tempetor of  ${cityInfo.name}`, cityTemp)

})

async function temperature(latitude,longitude) {
const response =  await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max&current=temperature_2m&forecast_days=5`)
if(!response.ok) {
  return "the tempetor is not found"
}
const data = await response.json()

return data

}

async function city(name) {

  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=en&format=json`)
  if(response.ok) {
    const data = await response.json()
    return data.results[0] 
  } else {
    return "the city is not found"
  }
}


