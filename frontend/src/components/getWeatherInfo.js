import axios from "axios";
export const getWeatherInfo = async (setIsDarkMode) => {
    const now = new Date();
    const apiKey ="4903065373f79f88bf9ac0f0d7bdec91";
    const city = "haldwani";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      const weatherData = response.data;
      const isDarkWeather = weatherData.weather.some((condition) =>
        ["Rain", "Snow", "Thunderstorm"].includes(condition.main)
      );     
     return isDarkWeather
    } catch (error) {
      console.error("Error fetching weather information", error);
    }
  };