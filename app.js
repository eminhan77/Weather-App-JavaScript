// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// App data
const weather = {};

weather.temperature = {
    unit:"celsius", //C ==> F then converts back
    unit:"kelvin",
    unit:"fahrenheit"

}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;    //enlemi bul
    let longitude = position.coords.longitude;  //boylamı bul
    
    getWeather(latitude, longitude);    //weather be found according to the "ENLEM" && "BOYLAM"
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api) 
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){ //call the method below to display the Weather
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`; //icon is an image with .png extension
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`; // xx °C
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;  //antalya
}

// The icon will be appeared first then the actual weather in your current location, after a short description about how it feels like, and at last the city is shown


// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}


//C to K conversion
function celsiusToKelvin(temperature){
    return (temperature+273.15);
}

//F to K 
function fahrenheitToKelvin(temperature){
    return (temperature-32)*5/9+273.15;
}


// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENT
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
            //let kelvin=celsiusToKelvin(weather.temperature.value);
            //kelvin=Math.floor(kelvin);

            let kelvin=fahrenheitToKelvin(weather.temperature.value);
            kelvin=Math.floor(kelvin);

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";


        //tempElement.innerHTML=`${kelvin}°<span>K</span>`;
        //weather.temperature.unit="Kelvin";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

