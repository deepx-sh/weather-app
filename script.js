const api = "";

const btn = document.querySelector(".search-btn");
const ip=document.querySelector(".input-box")
btn.addEventListener("click", () => {
    let city = ip.value;
    getWeather(city);
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
    speed.textContent=`${data.wind.speed} km/h`
    console.log(data);
    
}

