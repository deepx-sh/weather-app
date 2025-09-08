// const api = "";

const btn = document.querySelector(".search-btn");
const ip = document.querySelector(".input-box");
const img = document.querySelector(".weather-img");
const err = document.querySelector(".error-msg")
const info = document.querySelector(".weather-info");
const loading = document.querySelector(".loading");
const container=document.querySelector(".weather-container")
btn.addEventListener("click", () => {
    let city = ip.value;
    if (city.trim().length === 0 || city.trim()==='') {
        showError("Please enter correct city name");
        return;
    } else {
        getWeather(city);
    }
})

ip.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        btn.click();
    }
    
})
async function getWeather(city) {
    
    showLoading();
    hideError();
    hideWeather();
    try {
        //  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;
    const response = await fetch(`/api/weather?city=${city}`);
        if (!response.ok) {
            if (response.status === 404) {
                console.log(response);
                
                throw new Error("City not found. Please enter a valid city name.")
            } else {
                throw new Error("Failed to fetch weather data. Please try again later.")
            }
        }
        const data = await response.json()
        displayData(data)
        
    } catch (error) {
        showError(error.message) 
    } finally{
        hideLoading();
        ip.value = '';
    }
   

    }
    



function displayData(data) {
        const temp = document.querySelector(".temprature");
    temp.innerHTML = `${Math.round(data.main.temp)}<sup>°C</sup>`;

    const cityName = document.querySelector(".city-name");
    cityName.textContent = data.name;

    const humid = document.querySelector(".humidity");
    humid.textContent = `${data.main.humidity}%`;

    const speed = document.querySelector(".wind-speed");
    speed.textContent = `${Math.round(data.wind.speed*3.6)} km/h`;

    if (data.weather[0].main === "Clouds") {
        img.src="./assets/cloud.png"
    } else if (data.weather[0].main === "Clear") {
        img.src="./assets/sun.png"
    }else if (data.weather[0].main === "Rain") {
        img.src="./assets/rain.png"
    } else if (data.weather[0].main === "Drizzle") {
        img.src = "./assets/drizzle.png";
    } else if (data.weather[0].main === "Thunderstorm") {
        img.src="./assets/thunderstom.png"
    }else if (data.weather[0].main === "Snow") {
        img.src="./assets/snow.png"
    }
    else if (data.weather[0].main === "Mist" || data.weather[0].main === "Haze") {
        img.src="./assets/haze.png"
    } else {
        img.src="./assets/weather.png"
    }
    showWeather();
}
function showError(message) {
    document.querySelector(".err").textContent = `❌ ${message}`;
    err.classList.add("show")
}

function hideError() {
    err.classList.remove("show")
}
function showLoading() {
    loading.classList.add("show")
}

function hideLoading() {
    loading.classList.remove("show")
}

function showWeather() {
    info.classList.add("show")
}

function hideWeather() {
    info.classList.remove("show")
}