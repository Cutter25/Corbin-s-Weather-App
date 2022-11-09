var apiKey = "1edc84713465d4aba9696522d1dc5fc4";
// var apiUrl = "https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}";
// var apiKey = "1edc84713465d4aba9696522d1dc5fc4";
var currentDay = moment().format("MMM Do YY");  
var searchHistory = [];

// Function to display the current conditions of the city that was searched for

function searchedCity(city) {

    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;;

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
            ${weatherResponse.name} ${currentDay} <img src="${iconURL}" alt="${weatherResponse.weather[0].description}" />
        </h2>
        <p>Temperature: ${weatherResponse.main.temp} °F</p>
        <p>Humidity: ${weatherResponse.main.humidity}\%</p>
        <p>Wind Speed: ${weatherResponse.wind.speed} MPH</p>
    `);

    $("#current-city-conditions").append(currentCity);
    var lat = weatherResponse.coord.lat;
    var lon = weatherResponse.coord.lon;
    fiveDayForecast(lat, lon);
  });
}

// Function to display weather for city over the next 5 days

function fiveDayForecast(lat, lon) {

    var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    $.ajax({
        url: fiveDayUrl,
        method: 'GET',
      }).then(function (futureResponse) {
        console.log(futureResponse);
        $("#fiveDay").empty();

        for (let i = 9; i < 40; i+= 8) {
            var fiveDayInfo = {
                date: futureResponse.list[i].dt,
                icon: futureResponse.list[i].weather[0].icon,
                temp: futureResponse.list[i].main.temp,
                humidity: futureResponse.list[i].main.humidity,
            };

            var currDate = moment.unix(fiveDayInfo.date).format("MM/DD/YYYY");
            var iconURL = `<img src="https://openweathermap.org/img/w/${fiveDayInfo.icon}.png" alt="${futureResponse.list[i].weather[0].icon}" />`;

            var fiveDayForecastCard = $(`
                        <div class="card-body">
                            <h5>${currDate}</h5>
                            <p>${iconURL}</p>
                            <p>Temp: ${fiveDayInfo.temp} °F</p>
                            <p>Humidity: ${fiveDayInfo.humidity}\%</p>
                        </div>
            `);

            $("#five-day-forecast").append(fiveDayForecastCard);
        }
    }); 
}

    var citySearchButtonEl = document.querySelector("#citySearchButton");

    citySearchButtonEl.addEventListener("click", function(event) {

    console.log('Hello World');
    event.preventDefault();
    
    var city = $("#city-input-id").val().trim();
    searchedCity(city);
    // fiveDayForecast(lat, lon);
    
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        var currCity = $(`
            <li id="city-search-history">${city}</li>
            `);
        $("#searchHistory").append(currCity);
    }

    localStorage.setItem("city", JSON.stringify(searchHistory));
    console.log(searchHistory);
});


    var citySearchHistoryEl = document.querySelector("#city-search-history");

    citySearchHistoryEl.addEventListener("click", function(event) {
    event.preventDefault();

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


