import React, { useState, useEffect } from "react";
import { Container, Spinner, Alert, Button } from "react-bootstrap";
import { FaSun, FaMoon, FaCloudSun } from "react-icons/fa";
import SearchBar from "./components/SearchBar";
import WeatherDashboard from "./components/WeatherDashboard";
import { getWeatherData, getForecastData } from "./components/weatherAPI";
import axios from "axios";
import "./App.css";

const API_KEY = "0171502b814d5d773b47488f2dde6e02";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("C");
  const [darkMode, setDarkMode] = useState(false);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const fetchWeatherByLocation = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `${BASE_URL}onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      const weatherData = response.data;

      setWeatherData(weatherData);
      setForecastData(weatherData.daily);
      setAlerts(weatherData.alerts);
    } catch (error) {
      setError("Failed to fetch weather data for location");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByLocation(latitude, longitude);
      });
    }
  }, []);

  const handleSearch = async (city, unit = "C") => {
    setLoading(true);
    setError(null);
    try {
      const weather = await getWeatherData(city, unit);
      const forecast = await getForecastData(city, unit);
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (error) {
      setError(
        "Failed to fetch data. Please check the city name or your connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUnitChange = async () => {
    const newUnit = unit === "C" ? "F" : "C";
    setUnit(newUnit);

    if (weatherData?.name) {
      await handleSearch(weatherData.name, newUnit);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <Container>
      <div className="header">
        <div className="logo-edit">
          <FaCloudSun size={40} color="#007bff" />
          <h1 className="company-name">Plattr</h1>
        </div>
        <Button
          variant="outline-light"
          onClick={toggleDarkMode}
          className="theme-toggle-btn"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </Button>
      </div>
      <SearchBar onSearch={handleSearch} />
      {loading && <Spinner animation="border" variant="light" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {weatherData && forecastData && (
        <WeatherDashboard
          weatherData={weatherData}
          forecastData={forecastData}
          unit={unit}
          onUnitChange={handleUnitChange}
          alerts={alerts}
        />
      )}
    </Container>
  );
};

export default App;
