import axios from "axios";

const API_KEY = "0171502b814d5d773b47488f2dde6e02";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export const getWeatherData = async (city, unit) => {
  const response = await axios.get(
    `${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=${
      unit === "C" ? "metric" : "imperial"
    }`
  );
  return response.data;
};

export const getForecastData = async (city, unit) => {
  const response = await axios.get(
    `${BASE_URL}forecast?q=${city}&appid=${API_KEY}&units=${
      unit === "C" ? "metric" : "imperial"
    }`
  );
  return response.data;
};
