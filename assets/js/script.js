
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
var currentDate = new Date();
var history = document.querySelector('#history');


//A function to formate the date and to increment it if needed
// increment must be an integer
function getNewDate(increment){
    var day = currentDate.getDate() + increment;
    var newDate = currentDate.getMonth() + "/" + day + "/" + currentDate.getFullYear();
    return newDate;
}



function setupForecast(data){
    console.log(data.list);

   
    fiveDayForecast = document.querySelectorAll('#fiveDayForecast > *');
    
    for (var i = 0; i < 5; i++) {
        
        console.log(i+": "+data.list[i]);
        var day = $(fiveDayForecast[i]);
        day.append(`<p>${getNewDate(i)}</p>`);
        // adds an image in a paragraph using the index as a unique id
        day.append(`<p><img id="${i}" src=""/></p>`);
        console.log(data.list[i].weather[0].icon);
        var iconcode = data.list[i].weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        //variable for targeting id
        var realId = "#"+i;
        $(realId).attr('src', iconurl);
       
        day.append(`<p>Temp: ${data.list[i].wind.speed} mph</p>`);
        day.append(`<p>Humidity: ${data.list[i].main.humidity}</p>`);

    }
    


}

function displayWeather(data){
    cityName.innerText = data.name + "(" + getNewDate(0) + ")" ;
    var iconcode = data.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    $('#wicon').attr('src', iconurl);
    temp.innerText = "Temp: " + Math.floor( (data.main.temp-273.15)*9/5+32) + "°f";
    wind.innerText = "Wind: " + data.wind.speed + "MPH";
    hummid.innerText = "Hummidity: " + data.main.humidity +"%";
    console.log(data);
    console.log(data.coord);
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+ data.coord.lat+"&lon="+data.coord.lon+"&appid=" + ApiKey;

    fetch(forecastURL).then(function (resObj){
        return resObj.json();
    }).then(setupForecast);

    localStorage.setItem(data.name, data);

}

function historySearchCity(btnValue){

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + btnValue + "&appid=" + ApiKey;
    fetch(queryURL).then(function (resObj){
        console.log(resObj);
        return resObj.json();
    }).then( displayWeather);
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


function checkHistory(){
    for (var i=0; i < localStorage.length;i++) {
        var key = localStorage.key(i);
        $('#history').append(`<button class="my-3 col-12 btn btn-outline-dark">${key}</button>`);
    }
}

// Checks the local Storage for any past searches
checkHistory();
// Creates a list of the past search buttons added
var historyBtns = document.querySelectorAll('#history > button');

// Sets up a listener for the submit button
submitBtn.addEventListener('click', searchCity);

for (el of historyBtns) {
    el.addEventListener('click', function (event) {
        btnName = event.target.innerText;    
        historySearchCity(btnName);   
    });
}