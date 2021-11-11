var searchInput = document.getElementById("searchInput");
var searchButton = document.getElementById("searchButton");
var weatherApiRootUrl = 'https://api.openweathermap.org';
var weatherApiKey = "ce88f3aeed5a7b7ebec8fc7a63b77132";
var mainCity = document.getElementById("city");
var mainTemp = document.getElementById('temp');
var mainWind = document.getElementById('wind');
var mainHumid = document.getElementById('humid');
var mainUV = document.getElementById('uv');

searchButton.addEventListener("click", fetchWeather);
var cityArray = [];

var storage = localStorage.getItem("citySearch");
if (storage) {
    cityArray = JSON.parse(storage)
    for (var i = 0; i < cityArray.length; i++) {
        var newButton = document.createElement("button");
        newButton.innerText = cityArray[i];
        newButton.setAttribute("id", cityArray[i]);
        var body = document.getElementById("cityButtons");
        body.append(newButton);
        newButton.addEventListener("click", fetchWeatherTwo);
    }
}

function fetchWeather() {
    console.log(searchInput.value);
    cityArray.push(searchInput.value);
    localStorage.setItem("citySearch", JSON.stringify(cityArray))
    var newButton = document.createElement("button");
    newButton.innerText = searchInput.value;
    newButton.setAttribute("id", searchInput.value);
    var body = document.getElementById("cityButtons");
    body.append(newButton);
    var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${searchInput.value}&limit=5&appid=${weatherApiKey}`;

    fetch(
        apiUrl
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            fetch(
                'https://api.openweathermap.org/data/2.5/onecall?lat=' + data[0].lat + '&lon=' + data[0].lon + '&units=imperial&appid=' + weatherApiKey
            )
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    mainCity.innerText = searchInput.value;
                    mainTemp.innerText = data.current.temp;
                    mainWind.innerText = data.current.wind_speed;
                    mainHumid.innerText = data.current.humidity;
                    mainUV.innerText = data.current.uvi;
                    var icon = data.current.weather[0].icon;
                    var iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
                    document.getElementById(`mainImg`).src = iconUrl;
                    for (let i = 0; i < 5; i++) {
                        var icon = data.daily[i].weather[0].icon;
                        var iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
                        document.getElementById(`img${i + 1}`).src = iconUrl;
                        document.getElementById(`temp${i + 1}`).innerText = data.daily[i].temp.max;
                        document.getElementById(`wind${i + 1}`).innerText = data.daily[i].wind_speed;
                        document.getElementById(`humid${i + 1}`).innerText = data.daily[i].humidity;

                    }
                });
        });
}

function fetchWeatherTwo(event) {
    console.log(event.target.id);
    var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${event.target.id}&limit=5&appid=${weatherApiKey}`;

    fetch(
        apiUrl
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            fetch(
                'https://api.openweathermap.org/data/2.5/onecall?lat=' + data[0].lat + '&lon=' + data[0].lon + '&units=imperial&appid=' + weatherApiKey
            )
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    mainCity.innerText = event.target.id;
                    mainTemp.innerText = data.current.temp;
                    mainWind.innerText = data.current.wind_speed;
                    mainHumid.innerText = data.current.humidity;
                    mainUV.innerText = data.current.uvi;
                    var icon = data.current.weather[0].icon;
                    var iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
                    document.getElementById(`mainImg`).src = iconUrl;
                    for (let i = 0; i < 5; i++) {
                        var icon = data.daily[i].weather[0].icon;
                        var iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
                        document.getElementById(`img${i + 1}`).src = iconUrl;
                        document.getElementById(`temp${i + 1}`).innerText = data.daily[i].temp.max;
                        document.getElementById(`wind${i + 1}`).innerText = data.daily[i].wind_speed;
                        document.getElementById(`humid${i + 1}`).innerText = data.daily[i].humidity;

                    }
                });
        });
}




