var apiKey = "1edc84713465d4aba9696522d1dc5fc4";
var currentDay = moment().format('ll');
var searchHistory = [];

// Function to display the current conditions of the city that was searched for

fucntion currentWeatherConditions(city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&ppid=${apiKey}`;

    $.ajax({
        url: apiURL,
        method: "GET",
    }).then(function(weatherOfSearchedCity)) {

    }



}



