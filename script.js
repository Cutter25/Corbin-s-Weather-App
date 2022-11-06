var apiUrl = "https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"
var apiKey = "1edc84713465d4aba9696522d1dc5fc4";
// var currentDay = moment().format('ll');
var searchHistory = [];

// Function to display the current conditions of the city that was searched for
function searchedCity(city) {

$.ajax({
    url: apiUrl,
    method: 'GET',
  }).then(function (weatherResponse) {
    $("#weatherContent").css("display", "block");
    $("#current-city-conditions").empty();
    
    var iconCode = weatherResponse.weather[0].icon;

    var iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;

    var currentCity = $(`
        <h2 id="currentCity">
            ${cityWeatherResponse.name} ${today} <img src="${iconURL}" alt="${cityWeatherResponse.weather[0].description}" />
        </h2>
        <p>Temperature: ${cityWeatherResponse.main.temp} °F</p>
        <p>Humidity: ${cityWeatherResponse.main.humidity}\%</p>
        <p>Wind Speed: ${cityWeatherResponse.wind.speed} MPH</p>
    `);

    $("#current-city-conditions").append(currentCity);
  });
}

$("#citySearchButton").on("click", function(event) {
    event.preventDefault();

    var city = $("#city-input-id").val().trim();
    searchedCity(city);
    if (!searchHistoryList.includes(city)) {
        searchHistoryList.push(city);
        var searchedCity = $(`
            <li class="list-group-item">${city}</li>
            `);
        $("#list-of-cities").append(searchedCity);
    };
    
    localStorage.setItem("city", JSON.stringify(searchHistory));
    console.log(searchHistory);
});

// Function to display weather for city over the next 5 days

function fiveDayForecast(lat, lon) {

    var fiveDayUrl = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`;

    $.ajax({
        url: fiveDayUrl,
        method: 'GET',
      }).then(function (weatherResponse) {
        $("#weatherContent").css("display", "block");
        $("#current-city-conditions").empty();

        for (let i = 1; i < 6; i++) {
            var fiveDayInfo = {
                date: futureResponse.daily[i].dt,
                icon: futureResponse.daily[i].weather[0].icon,
                temp: futureResponse.daily[i].temp.day,
                humidity: futureResponse.daily[i].humidity
            };

            var currDate = moment.unix(cityInfo.date).format("MM/DD/YYYY");
            var iconURL = `<img src="https://openweathermap.org/img/w/${cityInfo.icon}.png" alt="${futureResponse.daily[i].weather[0].main}" />`;

            var fiveDayForecastCard = $(`
                        <div class="card-body">
                            <h5>${currDate}</h5>
                            <p>${iconURL}</p>
                            <p>Temp: ${cityInfo.temp} °F</p>
                            <p>Humidity: ${cityInfo.humidity}\%</p>
                        </div>
            `);

            $("#five-day-forecast").append(fiveDayForecastCard);
        }
    }); 
}

$("#citySearchButton").on("click", function(event) {
    event.preventDefault();
    console.log('Hello World');
    var city = $("#city-input-id").val().trim();
    searchedCity(city);
    
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        var searchedCity = $(`
            <li class="city-search-history">${city}</li>
            `);
        $("#searchHistory").append(searchedCity);
    }

    localStorage.setItem("city", JSON.stringify(searchHistory));
    console.log(searchHistory);
});

$(document).on("click", ".city-search-history", function() {
    var listCity = $(this).text();
    searchedCity(listCity);
});

$(document).ready(function() {
    var previouslySearchedCities = JSON.parse(localStorage.getItem("city"));

    if (previouslySearchedCities !== null) {
        var lastSearchedIndex = previouslySearchedCities.length - 1;
        var lastSearchedCity = previouslySearchedCities[lastSearchedIndex];
        searchedCity(lastSearchedCity);
        console.log(`Last searched city: ${lastSearchedCity}`);
    }
});


