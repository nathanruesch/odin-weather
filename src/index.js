//const weatherUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Salt%20Lake%20City%2C%20UT/next7days?unitGroup=metric&elements=datetime%2CdatetimeEpoch%2Cname%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslike%2Chumidity%2Cprecip%2Cprecipprob%2Cprecipcover%2Cpreciptype%2Cwinddir&include=current%2Cdays%2Chours&key=AKVPZ7RSYDECTLH7KC5NJJZYZ&contentType=json';
const urlBase = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/OURLOCNAME/next7days?unitGroup=OURUNITS&elements=datetime%2CdatetimeEpoch%2Cname%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslike%2Chumidity%2Cprecip%2Cprecipprob%2Cprecipcover%2Cpreciptype%2Cwinddir&include=current%2Cdays%2Chours&key=AKVPZ7RSYDECTLH7KC5NJJZYZ&contentType=json';
const unitOptions = ['metric', 'us'];

let currentWeather = null;

function fixUrl(locationName, unit) {
    const locNameFixed = locationName.replaceAll(' ', '%20').replaceAll(',', '%2C');
    const fixedUrl = urlBase.replace('OURLOCNAME', locNameFixed).replace('OURUNITS', unit);
    return fixedUrl;
}

function loadMainContent() {

}

async function getWeather(locationName, unit) {
    const fixedUrl = fixUrl(locationName, unit);

    const api = await fetch(fixedUrl, { mode: 'cors'});
    const response = await api.json();

    currentWeather = response;

    loadMainContent();
}

getWeather("Salt Lake City, UT", "metric");