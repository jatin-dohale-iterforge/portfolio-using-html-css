// get date
const getFormattedDate = (todayDate) => {
    let today = new Date(todayDate);
    return today.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });;
}

// get day
const getFullDay = (todayDate) => {
    let today = new Date(todayDate);
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    return weekday[today.getDay()];
}


// Function for let Latitude and Longitude
const getData = async (city = "mumbai") => {
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        getWeatherData(data.results[0]);
        getSpecificDayData(data.results[0]);

    } catch (error) {
        console.error("Fetch error:", error.message);
    }

}

// Function for getting weather data
const getWeatherData = async (data) => {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&daily=uv_index_max,sunrise,sunset,rain_sum`);

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
    }
}

// Function for getting weather data for specific day
const getSpecificDayData = async (data) => {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&current_weather=true&hourly=temperature_2m_max,weathercode&timezone=auto`);
        

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const weatherData = await response.json();

        specificDayData.length = 0;

        specificDayData.push(data);
        specificDayData.push(weatherData);

        console.log(specificDayData)


    } catch (error) {
        console.error("Fetch error:", error.message);
    }
}


// function for loaded values in ui
const showData = (cityWeatherData) => {
    console.log(cityWeatherData)

    city.innerText = cityWeatherData[0].name;
    today.children[0].innerText = getFullDay(cityWeatherData[1].daily.time[0]);
    today.children[1].innerText = getFormattedDate(cityWeatherData[1].daily.time[0]);
    temperature.innerHTML = Math.ceil(cityWeatherData[1].current_weather.temperature)+"°C" ;
    high.innerHTML =Math.ceil(cityWeatherData[1].daily.temperature_2m_max[0])
    low.innerHTML =Math.ceil(cityWeatherData[1].daily.temperature_2m_min[0])
}





let cityWeatherData = [];
let specificDayData = [];

const city = document.getElementById("city");
const today = document.getElementById("today");
const temperature = document.querySelector("#temperature>h3");
const high = document.getElementById("high");
const low = document.getElementById("low");


getData()


// ----------------------//
// search Functionality //
//---------------------//
const searchBox = document.getElementById("weather-search-box");

searchBox.addEventListener("keydown",(event)=>{
    if(event.key == "Enter"){
        getData(event.target.value.toLowerCase())
    }
})
