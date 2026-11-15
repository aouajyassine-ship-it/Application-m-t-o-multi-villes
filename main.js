
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
const vent = document.getElementById("wind-speed")
const uv = document.getElementById("uv-index")
const visibilite = document.getElementById("visibility")
const maint = document.getElementById("mainteneant")
const anze = document.getElementById("11")
const douze = document.getElementById("12")
const un = document.getElementById("13")
const deux = document.getElementById("14")
const  trois = document.getElementById("15")
const  quatre = document.getElementById("16")
const icon11 = document.getElementById("icon-11")
const icon12 = document.getElementById("icon-12")
const icon13 = document.getElementById("icon-13")
const icon14 = document.getElementById("icon-14")
const icon15 = document.getElementById("icon-15")
const icon16 = document.getElementById("icon-16")
const retryButton = document.getElementById("errorr")
const dailyList = document.getElementById("daily-list")

const WEATHER_CODES = {
  0:  { label: "Ciel dégagé",            icon: "☀️" },
  1:  { label: "Plutôt dégagé",          icon: "🌤️" },
  2:  { label: "Partiellement nuageux",  icon: "⛅" },
  3:  { label: "Couvert",                icon: "☁️" },
  45: { label: "Brouillard",             icon: "🌫️" },
  48: { label: "Brouillard givrant",     icon: "🌫️" },
  51: { label: "Bruine légère",          icon: "🌦️" },
  53: { label: "Bruine",                 icon: "🌦️" },
  55: { label: "Bruine forte",           icon: "🌦️" },
  56: { label: "Bruine verglaçante",     icon: "🌧️" },
  57: { label: "Bruine verglaçante",     icon: "🌧️" },
  61: { label: "Pluie légère",           icon: "🌧️" },
  63: { label: "Pluie",                  icon: "🌧️" },
  65: { label: "Pluie forte",            icon: "🌧️" },
  66: { label: "Pluie verglaçante",      icon: "🌧️" },
  67: { label: "Pluie verglaçante",      icon: "🌧️" },
  71: { label: "Neige légère",           icon: "🌨️" },
  73: { label: "Neige",                  icon: "🌨️" },
  75: { label: "Neige forte",            icon: "❄️" },
  77: { label: "Grains de neige",        icon: "🌨️" },
  80: { label: "Averses légères",        icon: "🌦️" },
  81: { label: "Averses",                icon: "🌧️" },
  82: { label: "Averses violentes",      icon: "⛈️" },
  85: { label: "Averses de neige",       icon: "🌨️" },
  86: { label: "Fortes averses de neige", icon: "❄️" },
  95: { label: "Orage",                  icon: "⛈️" },
  96: { label: "Orage avec grêle",       icon: "⛈️" },
  99: { label: "Orage avec forte grêle", icon: "⛈️" },
};


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
        afficherPrevisions(cityTemp.daily);
        console.log(cityInfo, cityTemp);
        temperatur.textContent = cityTemp.current.temperature_2m + " \u00B0C";
        max.textContent = cityTemp.daily.temperature_2m_max[0] +" \u00B0C";
        min.textContent = cityTemp.daily.temperature_2m_min[0] + " \u00B0C";
        const dateMeteo = new Date(cityTemp.daily.time[0])
        date.textContent = dateMeteo.toLocaleDateString("fr-FR",{
          weekday : "long",
          day : "numeric",
          month : "long",
          year : "numeric",
        });
        ville.textContent = cityInfo.name
        humidite.textContent = cityTemp.current.relative_humidity_2m + "%"
        vent.textContent = cityTemp.current.wind_speed_10m + " km/h"
        uv.textContent = cityTemp.current.uv_index
        visibilite.textContent = cityTemp.current.visibility + "Km"
        maint.textContent = cityTemp.current.temperature_2m + " \u00B0C"
        anze.textContent = cityTemp.hourly.temperature_2m[15] + " \u00B0C"
        douze.textContent = cityTemp.hourly.temperature_2m[16] + " \u00B0C"
        un.textContent = cityTemp.hourly.temperature_2m[17] + " \u00B0C"
        deux.textContent = cityTemp.hourly.temperature_2m[18] + " \u00B0C"
        trois.textContent = cityTemp.hourly.temperature_2m[19] + " \u00B0C"
        quatre.textContent = cityTemp.hourly.temperature_2m[20] + " \u00B0C"
        // console.log(cityTemp.hourly.time[10])
        // console.log(cityTemp.hourly.temperature_2m[10])
        // console.log(cityTemp.hourly.time)
        const meteo11 = WEATHER_CODES[cityTemp.hourly.weather_code[15]]
        icon11.textContent = meteo11.icon
        const meteo12 = WEATHER_CODES[cityTemp.hourly.weather_code[16]]
        icon12.textContent = meteo12.icon
        const meteo13 = WEATHER_CODES[cityTemp.hourly.weather_code[17]]
        icon13.textContent = meteo13.icon
        const meteo14 = WEATHER_CODES[cityTemp.hourly.weather_code[18]]
        icon14.textContent = meteo14.icon
        const meteo15 = WEATHER_CODES[cityTemp.hourly.weather_code[19]]
        icon15.textContent = meteo15.icon
        const meteo16 = WEATHER_CODES[cityTemp.hourly.weather_code[20]]
        icon16.textContent = meteo16.icon
        retryButton.hidden = true;
    } 
    catch (error) {
    erreur.textContent = error.message;
    retryButton.hidden = false;
}
    finally {
        recherche.hidden = true;
    }
});

 retryButton.addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("search-form").requestSubmit();
});


async function city(name) {
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=fr&format=json`)
  if (response.ok) {
    const data = await response.json()
    if (!data.results || data.results.length === 0) {
      throw new Error("Cette ville n'existe pas. Vérifiez le nom.");
    }
    return data.results[0]
  } else {
    throw new Error("Impossible de rechercher cette ville.");
  }
}

async function temperature(latitude, longitude) {
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,wind_speed_10m,uv_index,visibility&forecast_days=5&forecast_hours=24&timezone=auto`
    );
    if (!response.ok) {
        throw new Error("Impossible de récupérer les données météo.");
    }
    const data = await response.json();
    return data;
}

function afficherPrevisions(daily) {
    dailyList.innerHTML = "";
    for (let i = 0; i < daily.time.length; i++) {
        // Récupérer la date
        const date = new Date(daily.time[i] + "T00:00:00");

        const jour = date.toLocaleDateString("fr-FR", {
            weekday: "short"
        }).replace(".", "").toUpperCase();

        // récupére les températures
        const max = daily.temperature_2m_max[i];
        const min = daily.temperature_2m_min[i];

        // récupérer les icones
        const code = daily.weather_code[i];
        const meteo = WEATHER_CODES[code];
        const icon = meteo ? meteo.icon : "🌡️";

        // créer une nouvelle ligne
        const article = document.createElement("article");
        article.className = "grid grid-cols-[48px_40px_1fr_65px] items-center gap-3 py-3";
        article.innerHTML = `
            <span class="text-[10px] font-bold text-slate-500">
                ${jour}
            </span>
            <span class="mx-auto text-2xl" title="${meteo ? meteo.label : "Météo inconnue"}">
                ${icon}
            </span>
            <div></div>
            <span class="text-right text-sm font-bold whitespace-nowrap">
                ${max}°
                <span class="font-medium text-slate-400">${min}°</span>
            </span>
        `;
        dailyList.appendChild(article);
    }
}


