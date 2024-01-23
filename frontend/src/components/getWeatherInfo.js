import axios from "axios";

export const getWeatherInfo = async () => {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
      });
    });

    const { latitude, longitude } = position.coords;

    // Use OpenCage Geocoding API to get city
    const apiKey = "ec81524f756f4c5a9bcc9116a58cb58a";
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}&pretty=1`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.results && data.results.length > 0) {
      const city = data.results[0].components.city;
      console.log(`User's current city: ${city}`);

      // Get weather information using OpenWeatherMap API
      const apiKeyWeather = "4903065373f79f88bf9ac0f0d7bdec91";
      const apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}`;

      const responseWeather = await axios.get(apiUrlWeather);
      const weatherData = responseWeather.data;

      const isDarkWeather = weatherData.weather.some((condition) =>
        ["Rain", "Snow", "Thunderstorm"].includes(condition.main)
      );

      return isDarkWeather;
    } else {
      console.error("Unable to retrieve city information.");
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle errors as needed
  }
};
