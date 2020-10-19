let apiKey = "689e969de90a91f7c9389015a9661d89";

function refreshData(response) {
  console.log("Refreshing data with response");
  console.log(response);
  showTemperature(response);
  showWindspeed(response);
  showHumidity(response);
  showWeather(response);
  showTime(response);
  cityHeader.innerHTML = response.data.name;
}

navigator.geolocation.getCurrentPosition(fillDataFromPosition);

function fillDataFromPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  console.log(position);
  axios.get(url).then(refreshData);
  url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#daily-forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h6>${formatTime(forecast.dt * 1000)}</h6>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
        alt="Clear"
        id="forecast-icon"
      />
      <div class="forecast-high-lows">
        <strong>${Math.round(forecast.main.temp_max)}°</strong> | ${Math.round(
      forecast.main.temp_min
    )}°
      </div>
    </div>`;
  }
}

function fillDataFromSearch(event) {
  let searchInput = document.querySelector("#search-city");
  let city = searchInput.value;
  event.preventDefault();
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(refreshData);
  console.log(url);
  cityHeader.innerHTML = searchInput.value;
  url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayForecast);
}

let form = document.querySelector("#enter-city");
let cityHeader = document.querySelector("#city-display");
form.addEventListener("submit", fillDataFromSearch);

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${hour}:${minute}`;
}

function formatDate(timestamp) {
  let now = new Date();
  console.log(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  return `${day}, ${formatTime(timestamp)}`;
}

function showTime(response) {
  let currentTime = document.querySelector("#date-time");
  currentTime.innerHTML = `Last updated: ${formatDate(
    response.data.dt * 1000
  )}`;
}

// function unitFahrenheit() {
//   currentFahrenheit.innerHTML = "64°";
// }
// let imperial = document.querySelector("#fahrenheit");
// let currentFahrenheit = document.querySelector("#current-temp");
// imperial.addEventListener("click", unitFahrenheit);

// function unitCelsius() {
//   currentCelsius.innerHTML = "18°";
// }
// let metric = document.querySelector("#celsius");
// let currentCelsius = document.querySelector("#current-temp");
// metric.addEventListener("click", unitCelsius);

function showTemperature(response) {
  console.log(response.data);
  let showTemp = document.querySelector("#current-temp");
  let temperature = Math.round(response.data.main.temp);
  let iconElement = document.querySelector("#icon");
  showTemp.innerHTML = `${temperature}°C`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function showWindspeed(response) {
  let showWind = document.querySelector("#current-wind");
  let wind = Math.round(response.data.wind.speed);
  showWind.innerHTML = `${wind} km/h`;
}

function showHumidity(response) {
  let currentHumidity = document.querySelector("#current-humidity");
  let humidity = Math.round(response.data.main.humidity);
  currentHumidity.innerHTML = `${humidity}%`;
}

function showWeather(response) {
  let currentWeather = document.querySelector("#weather");
  let weather = response.data.weather[0].main;
  currentWeather.innerHTML = `${weather}`;
}
