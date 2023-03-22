
/* Given  a waeather dashboard with form inputs 
*  When I search a city 
*  Then I am presented witha current and future conditions for
*  that city and that city is added to the search history. *
*/
var ApiKey='45760234cd90d0ef2dfbbfedba7861f1';
var city;
var submitBtn = document.querySelector('#submit');

// var searchedCity = $('#searchBar');
var querriedCity = document.querySelector('#searchBar');
var cityName = document.querySelector('#name');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');
var hummid = document.querySelector('#hummid');



// var testCity = 'New York';
// var testQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + testCity+ "&appid=" + ApiKey;
// fetch(testQueryURL).then(function (resObj){
//     console.log(resObj);
//     return resObj.json();
// }).then(function (res){
//     console.log(res);
// });

function displayWeather(data){
    cityName.innerText = data.name + "(" + data.dt + ")" ;
    var iconcode = data.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    $('#wicon').attr('src', iconurl);
    temp.innerText = "Temp: " + Math.floor( (data.main.temp-273.15)*9/5+32) + "°f";
    wind.innerText = "Wind: " + data.wind.speed + "MPH";
    hummid.innerText = "Hummidity: " + data.main.humidity +"%";


}


function searchCity(){
    city = querriedCity.value;
    console.log(querriedCity.value);
    console.log(city);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + ApiKey;
    fetch(queryURL).then(function (resObj){
        console.log(resObj);
        return resObj.json();
    }).then( displayWeather);
}

submitBtn.addEventListener('click', searchCity);

