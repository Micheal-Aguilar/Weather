import React, { useState, useEffect } from "react";
import "./App.css";
import { OPEN_WEATHER_API } from "./key";

function App() {
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [weatherData, setWeatherData] = useState([]);

  const handleZipChange = (event) => {
    const value = event.target.value;
    setZip(value);
  };

  const handleCountryChange = (event) => {
    const value = event.target.value;
    setCountry(value);
  };

  const getWeather = async () => {
    const geoResponse = await fetch(
      `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${country}&appid=${OPEN_WEATHER_API}`
    );
    const geoData = await geoResponse.json();
    setLat(geoData.lat);
    setLon(geoData.lon);
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${OPEN_WEATHER_API}`
    );
    const weatherData = await weatherResponse.json();
    setWeatherData(weatherData.current);
  };
  const getHolidays = (countryCode) => {};
  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
    // getHolidays(countryCode);
  };
  return (
    <div onSubmit={handleSubmit} className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="zip">Zip Code</label>
        <input
          onChange={handleZipChange}
          id="zip"
          name="zip"
          type="text"
          value={zip}
        ></input>
        <label htmlFor="country">Country Code</label>
        <input
          onChange={handleCountryChange}
          id="country"
          name="country"
          type="text"
          value={country}
        ></input>
        <button> Submit </button>
      </form>
    </div>
  );
}

export default App;
