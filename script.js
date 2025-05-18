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

// <<============================ Input=====================================>>
searchBtn.addEventListener('click', () => {
	checkWeather(inputBox.value);
});

inputBox.addEventListener('keydown', function(event) {
	if (event.key === 'Enter') {
		checkWeather(inputBox.value);
	}
});
// <<============================ Main Function=====================================>>

async function checkWeather(city){
	const api_key = "dbfedf966d7f8edcf98ed3b799512581";
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

	const weather_data = await fetch(`${url}`).then(response => response.json());
	
	// <<============================ Error Handling=====================================>> 
	if(weather_data.cod === '404'){
		location_not_found.style.display = "flex";
		weather_body.style.display = "none";
		body.style.backgroundColor = 'hsl(240, 58%,48%)';
		body.style.backgroundImage = "none";

		return;
	}
	else{
	// <<============================ Value Obtaining=====================================>> 

		location_not_found.style.display = "none";
		weather_body.style.display = "flex";
		temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;

		description.innerHTML = `${weather_data.weather[0].description}`;

		humidity.innerHTML = `${weather_data.main.humidity}%`;

		wind_speed.innerHTML = `${Math.round((weather_data.wind.speed)*3.6)}Km/Hr`;

	// <<============================ Image selector=====================================>> 

		switch(weather_data.weather[0].main){
			case 'Clouds':
				weather_img.src = "./img/cloud.png";
				break;
			case 'Clear':
				weather_img.src = "./img/clear.png";
				break;
			case 'Rain':
				weather_img.src = "./img/rain.png";
				break;
			case 'Mist':
				weather_img.src = "./img/mist.png";
				break;
			case 'Snow':
				weather_img.src = "./img/snow.png";
				break;
		}

		switch(weather_data.weather[0].main){
			case 'Clouds':
				body.style.backgroundImage = "url('./img/cloudbg.jpg')";
				break;
			case 'Clear':
				body.style.backgroundImage = "url('./img/clearbg.jpg')";
				break;
			case 'Rain':
				body.style.backgroundImage = "url('./img/rainbg.jpg')";
				break;
			case 'Mist':
				body.style.backgroundImage = "url('./img/mistbg.jpg')";
				break;
			case 'Snow':
				body.style.backgroundImage = "url('./img/snowbg.jpg')";
				break;
		}
		
	}
}

