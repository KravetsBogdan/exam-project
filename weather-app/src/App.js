import React, {useState, useEffect} from "react";
import axios from "axios";
import bgVideo from './assets/weather-video.mp4'
import './style/main.scss';

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`
  const searchLocation = (event) => {
    if(event.key === 'Enter'){
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data);
      })
      setLocation('')
    }
  }


  return (
    <div className="app">
      <video className="video" autoPlay loop muted>
        <source src={bgVideo} type='video/mp4' />
      </video>
      <div className="search">
        <input className="input"
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder= 'Enter your location'
        type="text"/>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{Math.round(data.main.temp)}&#176;C</h1> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? <strong>{Math.round(data.main.feels_like)}&#176;C</strong> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <strong>{data.main.humidity}%</strong> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <strong>{Math.round(data.wind.speed)}km/h</strong> : null}
            <p>Wind Speed</p>
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
