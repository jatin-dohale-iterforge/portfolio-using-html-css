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

// function for current address
const getCurrentLocation = () => {
    return new Promise((resolve,reject)=>{
        navigator.geolocation.getCurrentPosition(resolve,reject)
    }) 
}

// function for reverse geolocation 
const getCurrentCity = async() =>{
  const result = await getCurrentLocation();
  console.log(result.coords.latitude,result.coords.longitude)

   try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${result.coords.latitude}&lon=${result.coords.longitude}&format=jsonv2`,
            );

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data = await response.json();

            return data.address.town.toLowerCase();
        }catch(e){
            console.error("Fetch error:", error.message);
        }
}


// Function for let Latitude and Longitude
const getData = async (city = "mumbai") => {
    newCity = city.toLowerCase();
    document.querySelector("main").classList.add("hidden");
    document.querySelector("#loader").style.visibility = "visible";

    if (sessionStorage.getItem(city)) {
        storageData = JSON.parse(sessionStorage.getItem(city));

        cityWeatherData.length = 0;
        specificDayData.length = 0;

        cityWeatherData.push(storageData[0]);
        cityWeatherData.push(storageData[1]);
        specificDayData.push(storageData[0]);
        specificDayData.push(storageData[2]);
        showData(cityWeatherData);
    } else {
        try {
            const response = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${newCity}&count=1`,
            );

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data = await response.json();

            if (!data.results) {
                console.log("sdcd");
                alert("Enter Valid city name");
                getData();
            }

            await getSpecificDayData(data.results[0]);
            getWeatherData(data.results[0]);
        } catch (error) {
            console.error("Fetch error:", error.message);
            document.querySelector("#loader").style.display = "none";
            document.querySelector("main").classList.remove("hidden");
        }
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
        document.querySelector("main").classList.remove("hidden");
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
        document.querySelector("main").classList.remove("hidden");
    }
};

// function for loaded values in ui
const showData = async(cityWeatherData) => {
    const hourly = await specificDayData[1].hourly;
    const daily = cityWeatherData[1].daily;
    const dateArray = cityWeatherData[1].daily.time.slice(1);
    const code = cityWeatherData[1].current_weather.weathercode;
    const weather = getWeatherCode(code)
        .split("/")[3]
        .split(".")[0]
        .replace("_", " ");

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

    console.log(cityWeatherData);

    //box 2 display
    hourlyData.innerHTML = "";
    for (let index = getCurrentTime(); index < 25; index++) {
        hourlyData.innerHTML += `<div class="hourly-box"> <p>${index + ":00"}</p>
                    <img src="${getWeatherCode(hourly.weathercode[index])}"></img>
                    <p>${Math.ceil(hourly.temperature_2m_max[index]) + "°C"}</p>
                  </div>`;
    }

    futureData.innerHTML = "";

    const hourInDay = 24;
    for (let index = 0; index < dateArray.length; index++) {
        futureData.innerHTML += `<li data-hour="${hourInDay * (index + 1)}"  onclick="showOverlayData(this)">${dateArray[index]}</li>`;
    }

    const weatherTomorrow = getWeatherCode(cityWeatherData[1].daily.weathercode[1])
        .split("/")[3]
        .split(".")[0]
        .replace("_", " ");

    tomorrowBox[0].children[1].innerText = weatherTomorrow.charAt(0).toUpperCase() + weatherTomorrow.slice(1);
    tomorrowBox[1].children[0].innerText = cityWeatherData[1].daily.temperature_2m_max[1] + "°C";
    tomorrowBox[2].children[0].children[0].src = getWeatherCode(cityWeatherData[1].daily.weathercode[1]);


    overlayBox[0].children[1].innerText = weather.charAt(0).toUpperCase() + weather.slice(1);
    overlayBox[1].children[0].innerText = cityWeatherData[1].daily.temperature_2m_max[0] + "°C";
    overlayBox[2].children[0].children[0].src = getWeatherCode(cityWeatherData[1].daily.weathercode[1]);


    //box 3 display
    sunrise.innerText = daily.sunrise[0].slice(-5);
    sunset.innerText = daily.sunset[0].slice(-5);
    rain.innerText = Math.round(daily.rain_sum[0]) + " mm";
    uvIndex.innerText = Math.round(daily.uv_index_max[0]);


    document.querySelector("#loader").style.display = "none";
    document.querySelector("main").classList.remove("hidden");

    if (!sessionStorage.getItem(cityWeatherData[0].name.toLowerCase())) {
        const storageData = [];
        storageData.push(cityWeatherData[0]);
        storageData.push(cityWeatherData[1]);
        storageData.push(specificDayData[1]);
        if (storageData) {
            sessionStorage.setItem(
                storageData[0].name.toLowerCase(),
                JSON.stringify(storageData),
            );
        }
    }
    loading = true;
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
const hourlyData = document.getElementById("hourlyData");
const futureData = document.querySelector("#future-data>ul");
const sunrise = document.querySelector("#sunrise span");
const sunset = document.querySelector("#sunset span");
const rain = document.querySelector("#rain span");
const uvIndex = document.querySelector("#uv-index span");
const tomorrowBox = document.querySelectorAll("#tomorrow-box>div")
const overlayBox = document.querySelectorAll("#go-today-button > div")


const main = async() =>{
    let result = confirm("Current Location")
    if(result){
        let city = await getCurrentCity();
        getData(city);
    }else{
        getData();
    }

}

main()//main function 



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

// ----------------------//
// weather box 3 Data   //
//---------------------//

document.onreadystatechange = function () {
    if (!loading) {
        document.querySelector("main").classList.add("hidden");
        document.querySelector("#loader").style.visibility = "visible";
    } else {
        document.querySelector("#loader").style.display = "none";
        document.querySelector("main").classList.remove("hidden");
    }
};

// function for overlay
const overlayData = document.getElementById("overlay-data");
const showOverlayData = async (event) => {
    const hourly = await specificDayData[1].hourly;
    overlayData.classList.remove("hidden");
    overlayData.children[0].innerHTML = event.innerText;
    overlayData.children[1].children[0].innerHTML = "";

    for (
        let index = event.dataset.hour;
        index < parseInt(event.dataset.hour) + 24;
        index++
    ) {
        console.log(index);
        overlayData.children[1].children[0].innerHTML += `<div class="hourly-box"> <p>${index - event.dataset.hour + ":00"}</p>
                    <img src="${getWeatherCode(hourly.weathercode[index])}"></img>
                    <p>${Math.ceil(hourly.temperature_2m_max[index]) + "°C"}</p>
                  </div>`;
    }
};

const offOverlayData = () => {
    overlayData.classList.add("hidden");
};
