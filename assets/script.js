const apiKey = "b2e887db731c59a60df2e26e8ec1483b";
const searchBtn = document.querySelector(".btn");
const city = document.getElementById("cityInput");
const forecastContainer = document.querySelector(".future-weather");

window.addEventListener("DOMContentLoaded", function () {
    setPresentWeatherData(weatherData);
    displayFutureForecast(JSON.parse(localStorage.getItem("forecasts")).daily);
    displayHistory(history_data);
});

// FETCH CURRENT WEATHER DATA
var weatherData =
    JSON.parse(localStorage.getItem("weather_data")) ||
    fetchCurrentData("Delhi", apiKey);

function fetchCurrentData(city, ApiKey) {
    fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`
    )
    .then((res) => res.json())
    .then((res) => {
        if (res.cod === "404") {
        alert(res.message);
        }
        console.log(res.coord.lon);
        localStorage.setItem("weather_data", JSON.stringify(res));
        weatherData = res;
        setPresentWeatherData(res);
        forecastingData(res.coord.lat, res.coord.lon);
    });
}

// FETCH FORECSATING DATA
function forecastingData(lat, lon) {
    fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely,alerts&units=metric&appid=${apiKey}`
    )
    .then((res) => res.json())
    .then((res) => {
        console.log(res.daily);
        displayFutureForecast(res.daily);
        localStorage.setItem("forecasts", JSON.stringify(res));
    });
}
