const date = document.getElementById("date-time");
let temp = document.getElementById("temp");
let tempUnit = document.getElementById("temp-unit");
let currentLocation = document.querySelector(".location");
let condition = document.getElementById("condition"),
  rain = document.getElementById("rain"),
  mainIcon = document.getElementById("icon"),
  uvIndex = document.querySelector(".uv-index"),
  uvText = document.querySelector(".uv-text");
(windSpeed = document.querySelector(".wind")),
  (sunRise = document.querySelector(".sunrise")),
  (sunSet = document.getElementById("")),
  (humidity = document.querySelector(".humidity")),
  (humidityStatus = document.querySelector("humidity-status")),
  (visibility = document.querySelector(".visibility")),
  (visibilityStatus = document.querySelector(".visibility-status")),
  (airQuality = document.getElementById("air-quality")),
  (airQualityStatus = document.querySelector("air-quality-status"));

let currentUnit = "";
let hourlyOrWeekly = "f";
let currentCity = "week";

const getDateTime = () => {
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let days = [
    "Monday",
    "Teusday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let dayString = days[date.getDay() - 1];
  console.log(dayString);
  hour = hour % 12;
  console.log(hour);
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${dayString} ${hour}:${minute}`;
};

date.innerText = getDateTime();

//getting public Ip

function getPublicIP() {
  fetch("https://geolocation-db.com/json/", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      countryName = data.country_name;
      getWeatherData(countryName, currentUnit, hourlyOrWeekly);
    });
}
getPublicIP();

function getWeatherData(city, unit, hourlyorweekly) {
  let apikey = "52W7CA9XTP3KSYNH2VYQKMGM7";
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apikey}&contentType=json`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let today = data.currentConditions;
      console.log(today.visibility, today.winddir);
      if (unit === "c") {
        temp.innerText = today.temp;
      } else {
        temp.innerText = celciusToFarenheit(today.temp);
        tempUuvTextnit.innerText = "°F";
      }
      currentLocation.innerText = data.resolvedAddress;
      condition.innerText = today.conditions;
      rain.innerText = `Perc - ${today.precip}%`;
      uvIndex.innerText = today.uvindex;
      windSpeed.innerText = today.windspeed;
      sunRise.innerText = `${today.sunrise} ${today.sunset}`;
      humidity.innerText = today.humidity | "20%";
      visibility.innerText = today.visibility;
      airQuality.innerText = today.winddir;

    //   measureUVIndex(today.uvindex);
    //   updateHumidityStatus(today.visibility)
    });
}

function celciusToFarenheit(temp) {
  let farenheit = (temp * 9) / 5 + 32;
  return farenheit;
}
// getWeatherData()

function measureUVIndex(uvIndex) {
  if (uvIndex <= 2) {
    uvText.innerText = "Low";
  } else if (uvIndex <= 5) {
    uvText.innerText = "Moderate";
  } else if (uvIndex <= 7) {
    uvText.innerText = "High";
  } else if (uvIndex <= 10) {
    uvText.innerText = "Very High";
  } else {
    uvText.innerText = "Extreme";
  }
}

function updateHumidityStatus(humidity) {
  humidity <= 30
    ? (humidity.innerText = "low")
    : humidity <= 60
    ? (humidity.innerText = "Moderate")
    : (humidity.innerText = "Hige");
}

function updateVisibilityStatus(visibility) {
  visibility <= 0.3
    ? (visibilityStatus.innerText = "Dense Fog")
    : visibility <= 0.16
    ? (visibilityStatus.innerText = "Moderate Fog")
    : visibility <= 1.13
    ? (visibilityStatus.innerText = "Light Fog")
    : visibility <= 1.13
    ? (visibilityStatus.innerText = "Very Light Fog")
    : visibility <= 2.16
    ? (visibilityStatus.innerText = "Light Mist")
    : visibility <= 5.4
    ? (visibilityStatus.innerText = "Very Light Mist")
    : visibility <= 10.8
    ? (visibilityStatus.innerText = "Clear Air")
    : (visibilityStatus.innerText = "Very Clear Air");
}

function updateAirQualityStatus (quality){

}

