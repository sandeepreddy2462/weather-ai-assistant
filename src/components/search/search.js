import React, { useState } from "react";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import "./search.css";

const Search = ({ onSearchChange }) => {
  const [city, setCity] = useState("");

  const handleSearch = async () => {
    if (!city) return;

    try {
      const response = await fetch(`${WEATHER_API_URL}${city}&appid=${WEATHER_API_KEY}&units=metric`);
      const data = await response.json();
      const forecastFetch = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const forecastData = await forecastFetch.json();

if (data.cod === 200 || data.cod === "200"){
        onSearchChange({
          value: `${data.coord.lat} ${data.coord.lon}`,
          label: `${data.name}, ${data.sys.country}`,
          weather: data,
          forecast: forecastData,
        });
        setCity("");
      } else {
        alert("City not found.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Error fetching data. Please try again.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
