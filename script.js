// Replace this with your actual OpenWeatherMap API key
const apiKey = 'YOURAPIKEYHERE';  // Your OpenWeatherMap API key

// Replace with your desired latitude and longitude
const latitude = 1.1; // Latitude for London (you can replace it with your own coordinates)
const longitude = 1.1; // Longitude for London (you can replace it with your own coordinates)

// Units: 'metric' for Celsius, 'imperial' for Fahrenheit
const unit = 'imperial'; // Celsius ('metric') or Fahrenheit ('imperial')

async function fetchWeather() {
    // Construct the API URL with latitude and longitude
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === 200) {
            const temp = data.main.temp; // Temperature
            const humidity = data.main.humidity; // Humidity
            let windSpeed = data.wind.speed; // Wind speed in km/h (from the API)
            
             // Convert wind speed from km/h to mph
             windSpeed = (windSpeed * 0.621371).toFixed(2); // Convert to mph and round to 2 decimal places
           

            // Update the HTML with the fetched data
            document.getElementById('temp').textContent = `${temp}°F`; // Update to °F if using imperial
            document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
            document.getElementById('windSpeed').textContent = `Wind Speed: ${windSpeed} mph`;
        } else {
            console.error('Error fetching weather data:', data.message);
        }
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
    }
}

// Fetch weather data on load
fetchWeather();

// Fetch data every 10 minutes (600,000 ms)
setInterval(fetchWeather, 600000);
