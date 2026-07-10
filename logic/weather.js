// get date
const getFormattedDate = (todayDate) => {
    let today = new Date(todayDate);
    return today.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

// get day
const getFullDay = (todayDate) => {
    let today = new Date(todayDate);
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    return weekday[today.getDay()];
};

// get current time
const getCurrentTime = () => {
    const time = new Date();
    return time.getHours();
};

// weather code analyzer
const getWeatherCode = (code) => {
    switch (code) {
        case 0:
            return "../assets/weather_icons/clear.png";
        case 1:
        case 2:
        case 3:
            return "../assets/weather_icons/partly_cloud.png";
        case 4:
            return "../assets/weather_icons/overcast.png";
        case 45:
        case 48:
            return "../assets/weather_icons/foggy.png";
        case 51:
        case 53:
        case 55:
            return "../assets/weather_icons/drizzle.png";
        case 61:
        case 63:
        case 65:
            return "../assets/weather_icons/rain.png";
        case 71:
        case 73:
        case 75:
            return "../assets/weather_icons/snow.png";
        case 80:
        case 81:
        case 82:
            return "../assets/weather_icons/rain.png";
        case 95:
            return "../assets/weather_icons/thunderstorm.png";
        default:
            return "../assets/weather_icons/unknown.png";
    }
};

// Function for let Latitude and Longitude
const getData = async (city = "mumbai") => {
    newCity = city.toLowerCase();

    document.querySelector("main").style.visibility = "hidden";
    document.querySelector("#loader").style.visibility = "visible";

    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${newCity}&count=1`,
        );

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        if(!data.results){
            console.log("sdcd")
            alert("Enter Valid city name")
            getData()
        }

        getWeatherData(data.results[0]);
        getSpecificDayData(data.results[0]);
    } catch (error) {
        console.error("Fetch error:", error.message);
        document.querySelector("#loader").style.display = "none";
        document.querySelector("main").style.visibility = "visible";
    }
};

// Function for getting weather data
const getWeatherData = async (data) => {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&daily=uv_index_max,sunrise,sunset,rain_sum`,
        );

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const weatherData = await response.json();

        cityWeatherData.length = 0;

        cityWeatherData.push(data);
        cityWeatherData.push(weatherData);

        showData(cityWeatherData);
    } catch (error) {
        console.error("Fetch error:", error.message);
        document.querySelector("#loader").style.display = "none";
        document.querySelector("main").style.visibility = "visible";
    }
};

// Function for getting weather data for specific day
const getSpecificDayData = async (data) => {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&current_weather=true&hourly=temperature_2m_max,weathercode&timezone=auto`,
        );

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const weatherData = await response.json();

        specificDayData.length = 0;

        specificDayData.push(data);
        specificDayData.push(weatherData);

        console.log(specificDayData);
    } catch (error) {
        console.error("Fetch error:", error.message);
        document.querySelector("#loader").style.display = "none";
        document.querySelector("main").style.visibility = "visible";
    }
};

// function for loaded values in ui
const showData = (cityWeatherData) => {
    const hourly = specificDayData[1].hourly;
    const daily = cityWeatherData[1].daily;
    const dateArray = cityWeatherData[1].daily.time.slice(1);
    const code = cityWeatherData[1].current_weather.weathercode;
    const weather = getWeatherCode(code)
        .split("/")[3]
        .split(".")[0]
        .replace("_", " ");

    console.log(cityWeatherData);

    //Box 1 display
    city.innerText = cityWeatherData[0].name;
    today.children[0].innerText = getFullDay(cityWeatherData[1].daily.time[0]);
    today.children[1].innerText = getFormattedDate(
        cityWeatherData[1].daily.time[0],
    );
    temperature.innerHTML =
        Math.ceil(cityWeatherData[1].current_weather.temperature) + "°C";
    high.innerHTML = Math.ceil(cityWeatherData[1].daily.temperature_2m_max[0]);
    low.innerHTML = Math.ceil(cityWeatherData[1].daily.temperature_2m_min[0]);
    boxOneIcon.src = getWeatherCode(code);
    boxOneWeather.innerText = weather.charAt(0).toUpperCase() + weather.slice(1);

    //box 2 display
    hourlyData.innerHTML = "";
    for (let index = getCurrentTime(); index < 25; index++) {
        hourlyData.innerHTML += `<div class="hourly-box"> <p>${index + ":00"}</p>
                    <img src="${getWeatherCode(hourly.weathercode[index])}"></img>
                    <p>${Math.ceil(hourly.temperature_2m_max[index]) + "°C"}</p>
                  </div>`;
    }

    futureData.innerHTML = "";

    const hourInDay = 24
    for (let index = 0; index < dateArray.length; index++) {
        futureData.innerHTML += `<li data-hour="${hourInDay*(index+1)}"  onclick="showOverlayData(this)">${dateArray[index]}</li>`;
    }


    //box 3 display
    sunrise.innerText = daily.sunrise[0].slice(-5);
    sunset.innerText = daily.sunset[0].slice(-5);
    rain.innerText = Math.round(daily.rain_sum[0]) + " mm";
    uvIndex.innerText = Math.round(daily.uv_index_max[0]);

    document.querySelector("#loader").style.display = "none";
    document.querySelector("main").style.visibility = "visible";
};

let loading = false;
let cityWeatherData = [];
let specificDayData = [];

const city = document.getElementById("city");
const today = document.getElementById("today");
const temperature = document.querySelector("#temperature>h3");
const high = document.getElementById("high");
const low = document.getElementById("low");
const boxOneIcon = document.querySelector("#today-icon-box>span>img");
const boxOneWeather = document.querySelector("#today-icon-box>h3");

getData();

// ----------------------//
// search Functionality //
//---------------------//
const searchBox = document.getElementById("weather-search-box");

searchBox.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        getData(event.target.value);
    }
});

// ----------------------//
// weather box 3 Data   //
//---------------------//
const sunrise = document.querySelector("#sunrise span");
const sunset = document.querySelector("#sunset span");
const rain = document.querySelector("#rain span");
const uvIndex = document.querySelector("#uv-index span");

// ----------------------//
// weather box 3 Data   //
//---------------------//
const hourlyData = document.getElementById("hourlyData");
const futureData = document.querySelector("#future-data>ul");

document.onreadystatechange = function () {
    if (!loading) {
        document.querySelector("main").style.visibility = "hidden";
        document.querySelector("#loader").style.visibility = "visible";
    } else {
        document.querySelector("#loader").style.display = "none";
        document.querySelector("main").style.visibility = "visible";
    }
};

// function for overlay
const overlayData = document.getElementById("overlay-data");
const showOverlayData = (event) =>{
    const hourly = specificDayData[1].hourly;
    overlayData.classList.remove("hidden");
    overlayData.children[0].innerHTML = event.innerText;
    overlayData.children[1].children[0].innerHTML = "";

    for (let index = event.dataset.hour; index < parseInt(event.dataset.hour) + 24; index++) {
        console.log(index)
        overlayData.children[1].children[0].innerHTML +=`<div class="hourly-box"> <p>${index - event.dataset.hour + ":00"}</p>
                    <img src="${getWeatherCode(hourly.weathercode[index])}"></img>
                    <p>${Math.ceil(hourly.temperature_2m_max[index]) + "°C"}</p>
                  </div>`;
    }
    
}


const offOverlayData =()=>{
    overlayData.classList.add("hidden");
}


