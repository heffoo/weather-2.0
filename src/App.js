import React, { useEffect, useState } from "react";
import config from "./config";
import AnotherDays from "../src/anotherdays";

import "./App.scss";

function App() {
  const [current, setCurrent] = useState();
  const [whichCity, setCity] = useState("Краснодар");
  const [fivedays, setFiveDaysWeather] = useState();
  let configs = config;
  let temp;
  let city;
  let feelslike;
  let lon = `${current && current.coord.lon}`;
  console.log("lon", lon);

  const esc = encodeURIComponent;
  let params = {
    APPID: "5f892c8a0b4c47ee1b455fa5bbc9851f",
  };
  params = { ...params, q: `${whichCity}`, lang: "ru" };
  let params2 = {
    APPID: "5f892c8a0b4c47ee1b455fa5bbc9851f",
  };
  params2 = { ...params2, units: "metric", q: `${whichCity}`, lang: "ru" }; /////////////////////

  let query2 =
    "?" +
    Object.keys(params2)
      .map((k) => esc(k) + "=" + esc(params2[k]))
      .join("&");

  let query =
    "?" +
    Object.keys(params)
      .map((k) => esc(k) + "=" + esc(params[k]))
      .join("&");

  const getCity = () => {
    city = document.getElementById("input").value.trim();
    console.log("getCity");
    setCity(city);
    document.getElementById("input").value = "";
  };
  console.log("city is - ", whichCity);

  useEffect(() => {
    async function test() {
      setCurrent(await fetcha(`${configs.apiUrl}${query}`));

      setFiveDaysWeather(await fetcha(`${configs.apiUrlSecond}${query2}`));
      console.log("useEffect doing");
    }
    test();
  }, [whichCity]);

  console.log("fivedays", fivedays);
  console.log(" next day", fivedays && fivedays.list[1].clouds);

  async function fetcha(options) {
    const handler = await fetch(options);
    let response = await handler.json();
    console.log("fetching");
    return response;
  }

  console.log("current", current);

  const temperature = () => {
    temp = (current && current.main.temp) - 273.15;
    feelslike = (current && current.main.feels_like) - 273.15;
  };

  temperature();
  return (
    <div className="App">
      <div className="main-container">
        <div className="search-place">
          <input type="text" className="city-input" id="input" onKeyPress={(e) => e.key === "Enter" && getCity()} />
          <input type="button" className="city-button" value="&#128269;" onClick={getCity} />
          <p>город: {params.q}</p> {/*  CITY IS HERE */}
        </div>

        <div className="wrapper">
          {current ? (
            <div>
              <div className="main-info">
                <div>
                  <div className="temp"> {Math.ceil(temp)}°</div> <p>По ощущениям: {Math.ceil(feelslike)} °</p>{" "}
                </div>{" "}
                <br />
                <br />
                <div className="clouds">
                  <h1> {current.weather[0].main}</h1>{" "}
                </div>
                <br />
                <img
                  className="weather-img"
                  alt={current.weather[0].description}
                  src={`http://openweathermap.org/img/wn/ ${ current.weather[0].icon} @2x.png`}
                />
              </div>
            </div>
          ) : (
            ""
          )}
          <br />
        </div>
        <div className="down">
          <div className="coords">
            широта {current && current.coord.lon} <br />
            долгота {current && current.coord.lat}
            <br />
            ветер {current && current.wind.speed}мс/c
            <br />
            подробная облачность: {current && current.weather[0].description}
          </div>
          <div>
            <button> почасовой </button>
            <button> 5 дней назад</button>
            <AnotherDays params={params2} temp={temp} fivedays={fivedays} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// ---------------------------------------------------------

//   useEffect(() => {
//     fetchQuotes()

// }, [weathercity])

// const fetchQuotes = () => {
//   setFething(true)
//   fetch(`${configs.apiUrl}${query}`)
//       .then((response) => response.json())
//       .then(res => console.log(res))
//       .then(res => setWeather(res))
//       .then(setFething(false))
//       .catch((err) => {
//         console.error(err);
//       });
// }

// ---------------------------------------------------------

// config = {
//   apikey: huigrehghehips57887
//   apiUrl: https openweather
//   city: Krasnodar
//   lang: ru
// }

// queryParams
// func (conf) {
//   return '?q=London,uk&APPID=43da68da51e7243f3d7714e461f6e74'
// }

// fetch(`${config.apiUrl}${queryParams}`)
