import React , {useState} from 'react'
import './App.css'

function App() {
  const [weather, setWeather] = useState({})
  const API_Key = 'your_api_key from http://api.openweathermap.org'

  const getWeather = async e => {
    e.preventDefault()
    const countrySearch = e.target.elements.countrySearch.value
    const api = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${countrySearch}&units=metric&appid=${API_Key}`)
    setWeather(await api.json())
  }

  return (
    <div className={weather.name ? weather.main.temp > 25 ? 'App hot' : 'App cold' : 'App' }>
      <form onSubmit={getWeather}>
        <input type="text" name="countrySearch" />
        <button type="submit">Search</button>
      </form>
      <div className="container">
        {typeof weather.name !== 'undefined' ?
          <React.Fragment>
            <div className={weather.name? 'temp' : ''}>
              <div>
                <span>{Math.round(weather.main.temp)}°C, </span>
                <span>{weather.weather[0].main}</span>
              </div>
              <span>Humidity: {weather.main.humidity}%</span>
            </div>
            <div className={weather.name ? 'country-info' : ''}>
              <span>{weather.name}, </span>
              <span>{weather.sys.country}</span>
            </div>
          </React.Fragment>
        : ''
        }
      </div>
    </div>
  )
}

export default App