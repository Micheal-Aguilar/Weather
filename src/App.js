import React, { useState } from "react";
import "./App.css";
import { OPEN_WEATHER_API } from "./key";

function App() {
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [weatherData, setWeatherData] = useState([]);
  const [holidayData, setHolidayData] = useState([]);

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
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API}`
    );
    const weatherData = await weatherResponse.json();
    setWeatherData(weatherData.current);
    console.log(weatherData);
  };
  const getHoliday = async () => {
    const response = await fetch(
      `https://date.nager.at/api/v3/publicholidays/2023/${country}`
    );
    const holidayData = await response.json();
    setHolidayData(holidayData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
    getHoliday();
  };
  console.log(holidayData);
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
      <div>
        <h2>Country Holidays</h2>
        <table>
          <thead>
            <tr>
              <th>Holiday Name:</th>
              <th>Holiday Date:</th>
            </tr>
          </thead>
          <tbody>
            {holidayData.map((holiday) => {
              return (
                <tr key={holiday.id}>
                  <td>{holiday.name}</td>
                  <td>{holiday.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h2>Weather</h2>
      </div>
    </div>
  );
}

export default App;
