import { useState, useEffect } from 'react';
import {formatDate} from './formatDate'

const api = {
  key:'4f8efb935036a22355aba7a2a52ca346',
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });


}, [lat,long])
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }
const initialLocation = () => {
  fetch(`${api.base}weather?&lat=${lat}&lon=${long}&units=metric&APPID=${api.key}`)
  .then(res => res.json())
  .then(result => {
    setWeather(result);
    console.log(result);
  });
}


  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search other location..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{formatDate(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temperature">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : (<div className="initial"><h1 onClick={initialLocation}>Click here to see the weather in your area.</h1></div>)}
      </main>
    </div>
  );
}

export default App;