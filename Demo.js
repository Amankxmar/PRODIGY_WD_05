class WeatherApp {
  constructor(locationForm, locationInput, weatherInfo, loader) {
    this.locationForm = locationForm;
    this.locationInput = locationInput;
    this.weatherInfo = weatherInfo;
    this.loader = loader;
    
    this.locationForm.addEventListener('submit', this.fetchWeather.bind(this));
  }

  async fetchWeather(e) {
    e.preventDefault();
    this.showLoader();

    const location = this.locationInput.value.trim();
    if (!location) {
      this.hideLoader();
      return;
    }

    const apiKey = '9e553a2060d2b43da0d140cb02dee4c7';
    const apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${location}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();

      if (data.list && data.list.length > 0) {
        const weatherData = data.list[0];
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const humidity = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed;

        this.weatherInfo.innerHTML = `
          <h2>Weather in ${weatherData.name}, ${weatherData.sys.country}</h2>
          <p>Temperature: ${temperature}°C</p>
          <p>Condition: ${description}</p>
          <p>Humidity: ${humidity}%</p>
          <p>Wind Speed: ${windSpeed} m/s</p>
        `;
      } else {
        this.weatherInfo.innerHTML = `<p>No weather data available.</p>`;
      }
    } catch (error) {
      this.weatherInfo.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
    } finally {
      this.hideLoader();
    }
  }

  showLoader() {
    this.loader.style.display = 'block';
  }

  hideLoader() {
    this.loader.style.display = 'none';
  }
}

const locationForm = document.querySelector('#location-form');
const locationInput = document.querySelector('#location');
const weatherInfo = document.querySelector('#weather-info');
const loader = document.querySelector('#loader');

const weatherApp = new WeatherApp(locationForm, locationInput, weatherInfo, loader);
