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
