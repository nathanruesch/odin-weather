import './style.css';

//const weatherUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Salt%20Lake%20City%2C%20UT/next7days?unitGroup=metric&elements=datetime%2CdatetimeEpoch%2Cname%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslike%2Chumidity%2Cprecip%2Cprecipprob%2Cprecipcover%2Cpreciptype%2Cwinddir&include=current%2Cdays%2Chours&key=AKVPZ7RSYDECTLH7KC5NJJZYZ&contentType=json';
const urlBase = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/OURLOCNAME/next7days?unitGroup=OURUNITS&elements=datetime%2CdatetimeEpoch%2Cname%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslike%2Chumidity%2Cprecip%2Cprecipprob%2Cprecipcover%2Cpreciptype%2Cwinddir&include=current%2Cdays%2Chours&key=AKVPZ7RSYDECTLH7KC5NJJZYZ&contentType=json';
const unitOptions = ['metric', 'us'];

let currentWeather = null;
let measurementUnit = "";

let unit = "us";
let locationName = "Denver, CO";

// Element consts
const weatherLocation = document.getElementById("weather-location");
const weatherCurrentTemp = document.getElementById("weather-temp");
const weatherFeels = document.getElementById("weather-feels");
const weatherLowTemp = document.getElementById("weather-low");
const weatherHighTemp = document.getElementById("weather-high");

const searchButton = document.getElementById("search-submit");
const searchField = document.getElementById("search-field");
const searchForm = document.getElementById("search-form");

const unitButton = document.getElementById("change-unit");

function fixUrl(locationName, unit) {
    const locNameFixed = locationName.replaceAll(' ', '%20').replaceAll(',', '%2C');
    const fixedUrl = urlBase.replace('OURLOCNAME', locNameFixed).replace('OURUNITS', unit);
    measurementUnit = unit;
    return fixedUrl;
}

function convertMeasurementUnit() {
    switch (measurementUnit) {
        case "metric":
            return 'C*';
        case "us":
            return 'F*';
    }
}

function loadMainContent() {
    const currentDayData = currentWeather.days[0];

    unitButton.textContent = convertMeasurementUnit();

    weatherLocation.innerText = currentWeather.address;

    weatherCurrentTemp.innerText = "Temp: " + currentDayData.temp + convertMeasurementUnit();

    weatherFeels.innerText = "Feels like: " + currentDayData.feelslike + convertMeasurementUnit();

    weatherLowTemp.innerText = "Low: " + currentDayData.tempmin + convertMeasurementUnit();
    weatherHighTemp.innerText = "High: " + currentDayData.tempmax + convertMeasurementUnit();
}

function submitSearch(event) {
    locationName = searchField.value;

    getWeather(locationName, unit);

    event.preventDefault();
}

function toggleUnit() {
    if (unit === 'metric') {
        unit = 'us';
    } else {
        unit = 'metric';
    }

    getWeather(locationName, unit);
}

async function getWeather(locationName, unit) {
    const fixedUrl = fixUrl(locationName, unit);

    const api = await fetch(fixedUrl, { mode: 'cors'});
    const response = await api.json();

    currentWeather = response;

    loadMainContent();
}

searchForm.addEventListener("submit", submitSearch);
unitButton.addEventListener("click", toggleUnit);

getWeather(locationName, unit);

console.log(searchField);