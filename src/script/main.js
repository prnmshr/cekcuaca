class WeatherApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <h1 part="title">Cek Cuaca</h1>
            <input part="input" type="text" id="cityInput" placeholder="Nama kota (cth. Pontianak)">
            <button part="button" id="getWeatherBtn">Periksa</button>
            <p part="description" id="weatherInfo"></p>
        `;

        this.cityInput = this.shadowRoot.getElementById('cityInput');
        this.getWeatherBtn = this.shadowRoot.getElementById('getWeatherBtn');
        this.weatherInfo = this.shadowRoot.getElementById('weatherInfo');

        this.getWeatherBtn.addEventListener('click', () => this.getWeather());
    }

    async getWeather() {
        const city = this.cityInput.value;
        if (!city) {
            this.weatherInfo.textContent = 'Mohon masukkan nama kota terlebih dahulu.';
            return;
        }

        try {
            const apiKey = '33207fe41ccba30e4f1505e942dac591';
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
            const data = await response.json();

            const temperature = Math.round(data.main.temp - 273.15);
            const description = data.weather[0].description;
            this.weatherInfo.textContent = `Cuaca di ${city} adalah ${temperature}°C, ${description}`;
        } catch (error) {
            this.weatherInfo.textContent = 'Terjadi Kesalahan. Mohon coba lagi.';
        }
    }
}

customElements.define('weather-app', WeatherApp);
