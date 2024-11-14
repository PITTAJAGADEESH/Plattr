import React from "react";
import { Card, Col, Row, Container, Alert } from "react-bootstrap";

const WeatherDashboard = ({
  weatherData,
  forecastData,
  unit,
  onUnitChange,
}) => {
  return (
    <Container className="weather-dashboard">
      <h1 className="text-center my-4">{weatherData?.name} Weather</h1>

      {weatherData?.alerts && (
        <Alert variant="warning">
          <h4>Weather Alert:</h4>
          <p>{weatherData.alerts[0].description}</p>
        </Alert>
      )}

      <Row>
        <Col md={6}>
          <Card className="weather-card">
            <Card.Body>
              <h2>
                {weatherData?.main.temp}°{unit}
              </h2>
              <p className="weather-description">
                {weatherData?.weather[0].description}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description}
                className="weather-icon"
              />
              <p>Wind: {weatherData?.wind.speed} m/s</p>
              <p>Humidity: {weatherData?.main.humidity}%</p>
              <button onClick={onUnitChange} className="unit-toggle-btn">
                Switch to {unit === "C" ? "Fahrenheit" : "Celsius"}
              </button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <h3 className="forecast-title">5-Day Forecast</h3>
          {forecastData?.list.slice(0, 5).map((forecast, index) => (
            <Card key={index} className="forecast-card">
              <Card.Body>
                <p>
                  {forecast.dt_txt}: {forecast.main.temp}°{unit}
                </p>
                <p>{forecast.weather[0].description}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                  alt={forecast.weather[0].description}
                  className="forecast-icon"
                />
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default WeatherDashboard;
