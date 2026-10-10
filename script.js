const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');
const body = document.getElementById('body');

// Relative paths (no leading "/") so they work on GitHub Pages project sites.
// Each weather type maps to [icon, background].
const WEATHER_IMAGES = {
    Clouds:       ['img/cloud.png', 'img/cloudbg.jpg'],
    Clear:        ['img/clear.png', 'img/clearbg.jpg'],
    Rain:         ['img/rain.png',  'img/rainbg.jpg'],
    Drizzle:      ['img/rain.png',  'img/rainbg.jpg'],
    Thunderstorm: ['img/rain.png',  'img/rainbg.jpg'],
    Mist:         ['img/mist.png',  'img/mistbg.jpg'],
    Haze:         ['img/mist.png',  'img/mistbg.jpg'],
    Fog:          ['img/mist.png',  'img/mistbg.jpg'],
    Smoke:        ['img/mist.png',  'img/mistbg.jpg'],
    Snow:         ['img/snow.png',  'img/snowbg.jpg'],
};
const DEFAULT_IMAGES = ['img/cloud.png', 'img/cloudbg.jpg'];

// <<============================ Input =====================================>>
searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});

inputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkWeather(inputBox.value);
    }
});

// <<============================ Helpers =====================================>>
function showNotFound() {
    location_not_found.style.display = 'flex';
    weather_body.style.display = 'none';
    body.style.backgroundColor = 'hsl(240, 58%, 48%)';
    body.style.backgroundImage = 'none';
}

// <<============================ Main Function =====================================>>
async function checkWeather(city) {
    city = city.trim();
    if (!city) return;

    const api_key = 'dbfedf966d7f8edcf98ed3b799512581';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${api_key}`;

    let weather_data;
    try {
        const response = await fetch(url);
        weather_data = await response.json();
    } catch (error) {
        console.error('Network error:', error);
        showNotFound();
        return;
    }

    // <<============================ Error Handling =====================================>>
    // OpenWeatherMap returns cod as a string ('404') on errors and a number (200) on success.
    if (String(weather_data.cod) !== '200') {
        showNotFound();
        return;
    }

    // <<============================ Value Obtaining =====================================>>
    location_not_found.style.display = 'none';
    weather_body.style.display = 'flex';

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = weather_data.weather[0].description;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${Math.round(weather_data.wind.speed * 3.6)}Km/Hr`;

    // <<============================ Image selector =====================================>>
    const [icon, background] = WEATHER_IMAGES[weather_data.weather[0].main] || DEFAULT_IMAGES;
    weather_img.src = icon;
    body.style.backgroundImage = `url('${background}')`;

    console.log(weather_data);
}