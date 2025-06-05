import { useState, useEffect } from "react";
import Search from "./components/search/search.js";
import CurrentWeather from "./components/current-weather/current-weather.js";
import Forecast from "./components/forecast/forecast.js";
import ChatBot from "./components/chatbot/chatbot.js";
import { WEATHER_API_URL, WEATHER_API_KEY } from './api.js';
import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [localWeather, setLocalWeather] = useState(null);
  const [localforecast, setlocalForecast] = useState(null);

  const [chatSearched, setChatSearched] = useState([]);
  const [chatLocal, setChatLocal] = useState([]);
// ----------------



  // SEARCH WEATHER
  const handleOnSearchChange = async (searchData) => {
  const [lat, lon] = searchData.value.split(" ");
  try {
    const city = searchData.label;
    const weatherResponse = searchData.weather; // 👈 Already fetched in search.js
    const forecastResponse = searchData.forecast;

    setCurrentWeather({ city, ...weatherResponse });
    setForecast({ city, ...forecastResponse });

    const aiSuggestions = await fetchAISuggestions(weatherResponse);
    setChatSearched([...aiSuggestions]);
  } catch (error) {
    console.error("Error setting weather data:", error);
  }
};


  // LOCAL WEATHER

  useEffect(() => {
  const fetchLocationAndWeather = async (lat, lon) => {
    try {
      const locationRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${WEATHER_API_KEY}`
      );
      const locationData = await locationRes.json();
      const cityLabel = `${locationData[0].name}, ${locationData[0].country}`;

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const weatherData = await weatherRes.json();
      console.log(weatherData);

      setLocalWeather({ city: cityLabel, ...weatherData });


      const forecastFetch = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
            );
      const localforecastData = await forecastFetch.json();
      setlocalForecast({ city: cityLabel, ...localforecastData });

      const aiSuggestions = await fetchAISuggestions(weatherData);
      setChatLocal([...aiSuggestions]);    
    } catch (error) {
      console.error("Failed to fetch accurate weather:", error);
    }
  };

  const getGeolocation = () => {
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchLocationAndWeather(lat, lon);
      },
      async (error) => {
        console.warn("Geolocation failed, using IP fallback:", error);

        // IP fallback using ip-api (or any IP Geolocation service)
        try {
          const ipRes = await fetch("https://ipapi.co/json/");
          const ipData = await ipRes.json();
          const lat = ipData.latitude;
          const lon = ipData.longitude;
          fetchLocationAndWeather(lat, lon);
        } catch (ipError) {
          console.error("IP fallback also failed:", ipError);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };
  getGeolocation();


}, []);


// AI SUGGESTIONS
const fetchAISuggestions = async (weatherData) => {
  try {
    const response = await fetch("http://localhost:5000/generate-suggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({weatherData}),
    });

    const text = await response.text(); // 🔍 Read raw text
    console.log("AI raw response text:", text); // Debug
    const data = JSON.parse(text); // Try parse manually
    return data.suggestions || [];
  } catch (err) {
    console.error("AI Suggestion error:", err);
    return [];
  }
};




  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1 className="header-title">Weather App</h1>
          <div className="header-actions">
            <button className="header-btn">Login</button>
            <button className="header-btn">Profile</button>
            <button className="header-btn">Settings</button>
          </div>
        </div>
      </header>
    <div className="main-wrapper">
      <div className="local-container">
        <h3>Current Location</h3>
        {localWeather && <CurrentWeather data={localWeather} />}
        {localforecast && <Forecast data={localforecast} />}
        {chatLocal.length > 0 && (
          <ChatBot title="Suggestions for your location" suggestions={chatLocal} />
        )}
      </div>

      <div className="container">
        <div className="search-bar">
          <Search onSearchChange={handleOnSearchChange} />
        </div>
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
        {chatSearched.length > 0 && (
          <ChatBot title="Suggestions for searched location" suggestions={chatSearched} />
        )}
      </div>
    </div>
    </div>
  );
}

export default App;
