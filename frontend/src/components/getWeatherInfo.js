import axios from "axios";
export const getWeatherInfo = async (setIsDarkMode) => {
    const now = new Date();
    const apiKey ="API_KEY";
    const city = "haldwani";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      const weatherData = response.data;
      const sunrise = new Date(weatherData.sys.sunrise * 1000).getHours();
      const sunset = new Date(weatherData.sys.sunset * 1000).getHours();
      const hour = now.getHours();
      const body = document.body;
      console.log(weatherData.weather[0].main);

      const isDarkWeather = weatherData.weather.some((condition) =>
        ["Rain", "Snow", "Thunderstorm"].includes(condition.main)
      );

     

      if (sunset <= hour || hour < sunrise || isDarkWeather) {
        setIsDarkMode(true);
        body.classList.add("dark-mode");
      } else {
        setIsDarkMode(false);
        body.classList.remove("dark-mode");
      }
    } catch (error) {
      console.error("Error fetching weather information", error);
    }
  };