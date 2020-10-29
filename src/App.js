import React, { useEffect, useState } from "react";
import config from "./config";
import AnotherDays from "../src/anotherdays";
import { Link } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";

import Olddays from "./container/oldforecast";
import "./App.scss";

function App() {
  const [current, setCurrent] = useState();
  const [whichCity, setCity] = useState("Краснодар");
  const [fivedays, setFiveDaysWeather] = useState();
  const [dailyWeather, setDailyWeather] = useState();
  const [loading, setLoading] = useState(true);
  let configs = config;
  let temp;
  let city;
  let lon = current && current.lon;
  let lat = current && current.lat;
  const APPID = "5f892c8a0b4c47ee1b455fa5bbc9851f";

  const esc = encodeURIComponent;

  let params = { APPID, q: `${whichCity}`, units: "metric", lang: "ru" };

  let params2 = { APPID, units: "metric", q: `${whichCity}`, lang: "ru" }; /////////////////////

  // let params3 = { APPID, lat, lon, units: "metric", exclude: "hourly" };

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

  // let query3 =
  //   "?" +
  //   Object.keys(params3)
  //     .map((k) => esc(k) + "=" + esc(params3[k]))
  //     .join("&");

  const getCity = () => {
    city = document.getElementById("input").value.trim();

    setCity(city);

    document.getElementById("input").value = "";
  };

  useEffect(() => {
    async function test() {
      // const checking = await fetcha(`${configs.apiUrl}${query}`);

      const handler = await fetcha(`${configs.apiUrl}${query}`);
      console.log(handler);
      if (!handler) {
        return;
      } else {
        console.log(132);
        setCurrent(handler);
        setFiveDaysWeather(await fetcha(`${configs.apiUrlSecond}${query2}`));

        lon = handler.coord.lon;
        lat = handler.coord.lat;
        let params3 = { APPID, lat, lon, units: "metric", exclude: "hourly" };
        let query3 =
          "?" +
          Object.keys(params3)
            .map((k) => esc(k) + "=" + esc(params3[k]))
            .join("&");

        const awd = await fetcha(`${configs.apiUrlThird}${query3}`);
        // console.log(awd);

        const awd2 = JSON.stringify(awd);

        if (!dailyWeather) {
          setDailyWeather(JSON.parse(awd2));
        }
      }
    }

    test();
  }, [whichCity]);

  async function fetcha(options) {
    setLoading(true);

    const resp = await fetch(options)
    if (!resp.ok) {
      console.log(resp);
      setLoading(false);
      return false;
    }

    setLoading(false);
    const json = await resp.json();
    return json;
  }
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className="App">
      <div className="main-container">
        <div className="search-place">
          <input type="text" className="city-input" id="input" onKeyPress={(e) => e.key === "Enter" && getCity()} />
          <input type="button" className="city-button" value="&#128269;" onClick={getCity} />
          <p>город: {params.q}</p> {/*  CITY IS HERE */}
          <div className={loading ? "sweet-loading-show" : "sweet-loading"}>
            <SyncLoader css={override} size={10} color={"#ffffff"} />
          </div>
        </div>

        <div className="wrapper">
          {current ? (
            <div>
              <div className="main-info">
                <div>
                  <div className="temp"> {Math.ceil(current.main.temp)}°</div>{" "}
                  <p>По ощущениям: {Math.ceil(current.main.feels_like)} °</p>{" "}
                </div>
                <br />
                <br />
                <div className="clouds">
                  <h1> {current.weather[0].main}</h1>{" "}
                </div>
                <br />
                <img
                  className="weather-img"
                  alt={current.weather[0].description}
                  src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
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
            <div className="btn-wrapper">
              <Link to="/" className="day-btn">
                <p>почасовой </p>
              </Link>
              <Link to="/old" className="day-btn">
                <p>по дням </p>
              </Link>
            </div>
            <Switch>
              <Route exact path="/">
                <AnotherDays params={params2} temp={temp} fivedays={fivedays} />
              </Route>
              <Route path="/old">
                <Olddays dailyweather={dailyWeather} />
              </Route>
            </Switch>
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

// const fetchQuotes = () => {]
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
// let date = new Date();
// const currentDay = date.getDate();
// const prevDay = currentDay;
// date = date.setDate(prevDay);
// console.log(new Date(date));
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
