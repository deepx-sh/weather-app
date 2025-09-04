const api = "";

const btn = document.querySelector(".search-btn");
const ip = document.querySelector(".input-box");
const img = document.querySelector(".weather-img");
btn.addEventListener("click", () => {
    let city = ip.value;
    if (city.trim().length === 0 || city.trim()==='') {
        alert("Please enter correct city name");
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
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;
    const response = await fetch(url);
    console.log(response);
    
    const data = await response.json();
    
    const temp = document.querySelector(".temprature");
    temp.innerHTML = `${Math.floor(data.main.temp)}<sup>°C</sup>`;

    const cityName = document.querySelector(".city-name");
    cityName.textContent = data.name;

    const humid = document.querySelector(".humidity");
    humid.textContent = `${data.main.humidity}%`;

    const speed = document.querySelector(".wind-speed");
    speed.textContent = `${data.wind.speed} km/h`;

    if (data.weather[0].main === "Clouds") {
        img.src="./assets/weather.png"
    } else if (data.weather[0].main === "Clear") {
        img.src="./assets/sun.png"
    }else if (data.weather[0].main === "Rain") {
        img.src="./assets/rain.png"
    }else if (data.weather[0].main === "Drizzle") {
        img.src="./assets/rain.png"
    }else if (data.weather[0].main === "Mist") {
        img.src="./assets/haze.png"
    }
    ip.value = '';
    console.log(data);
    
}

