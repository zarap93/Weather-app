let apiKey = "689e969de90a91f7c9389015a9661d89";

function refreshData(response) {
  console.log("Refreshing data with response");
  console.log(response);
  showTemperature(response);
  showWindspeed(response);
  showHumidity(response);
  showWeather(response);
  cityHeader.innerHTML = response.data.name;
}

navigator.geolocation.getCurrentPosition(fillDataFromPosition);

function fillDataFromPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  console.log(position);
  axios.get(url).then(refreshData);
}

function displayForecast(response) {
  console.log(response.data);
}

function fillDataFromSearch(event) {
  let searchInput = document.querySelector("#search-city");
  let city = searchInput.value;
  event.preventDefault();
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(refreshData);
  console.log(url);
  cityHeader.innerHTML = searchInput.value;
  url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  axios.get(url).then(displayForecast);
}

let form = document.querySelector("#enter-city");
let cityHeader = document.querySelector("#city-display");
form.addEventListener("submit", fillDataFromSearch);

function formatDate() {
  let now = new Date();
  let date = now.getDate();
  let year = now.getFullYear();

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

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  let fullDate = `${day}, ${month} ${date}, ${year}`;
  return fullDate;
}
function formatTime() {
  let now = new Date();
  let hour = now.getHours();

  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let time = `${hour}:${minute}`;
  return time;
}

function showDate(event, date) {
  let currentDate = document.querySelector("#date");
  currentDate.innerHTML = formatDate();
}
function showTime() {
  let currentTime = document.querySelector("#time");
  currentTime.innerHTML = `${formatTime()} |`;
}

showDate();
showTime();

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
  //console.log(response);
  let currentWeather = document.querySelector("#weather");
  let weather = response.data.weather[0].main;
  //console.log(weather);
  currentWeather.innerHTML = `${weather}`;
}
