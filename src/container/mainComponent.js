import React, { useEffect, useState } from "react";
import config from "../config";
import HourlyForecast from "./hourly/hourlyForecast";
import { NavLink } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";
import DailyForecast from "./daily/dailyForecast";
import "../container/mainComponent.scss";

const Container = () => {
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

  let params2 = { APPID, units: "metric", q: `${whichCity}`, lang: "ru" };

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

    setCity(city);

    document.getElementById("input").value = "";
  };

  useEffect(() => {
    async function test() {
      const handler = await fetcha(`${configs.apiUrl}${query}`);
      if (!handler) {
        alert("type a correct city");
        return;
      } else {
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

        if (!dailyWeather) {
          setDailyWeather(await fetcha(`${configs.apiUrlThird}${query3}`));
        }
      }
    }

    test();
  }, [whichCity]);

  async function fetcha(options) {
    setLoading(true);

    const resp = await fetch(options);
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
  let clouds;
  const translateClouds = () => {
    let mainClouds = current && current.weather[0].main;
    if (mainClouds === "Clouds") {
      clouds = "Облачно";
    } else if (mainClouds === "Rain") {
      clouds = "Дождь";
    } else if (mainClouds === "Clear") {
      clouds = "Солнечно";
    } else if (mainClouds === "Smoke") {
      clouds = "Дымка";
    } else if (mainClouds === "Mist") {
      clouds = "Туман";
    } else if (mainClouds === "Drizzle") {
      clouds = "Морось";
    } else if (mainClouds === "Snow") {
      clouds = "Снег";
    } else {
      clouds = mainClouds;
    }
  };
  translateClouds();
  return (
    <div className="App">
      <div className="main-container">
        <div className="search-place">
          <input type="text" className="city-input" id="input" onKeyPress={(e) => e.key === "Enter" && getCity()} />
          <input type="button" className="city-button" value="&#128269;" onClick={getCity} />
          <p>город: {current && current.name}</p> {/*  CITY IS HERE */}
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
                  <h1> {clouds}</h1>
                  <p> {current && current.weather[0].description} </p>
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
          </div>
          <div>
            <div className="btn-wrapper">
              <NavLink exact to="/weather" activeClassName="active" className="day-btn">
                почасовой
              </NavLink>
              <NavLink to="/old" activeClassName="active" className="day-btn">
                по дням
              </NavLink>
            </div>
            <Switch>
              <Route exact path="/weather">
                <HourlyForecast params={params2} temp={temp} fivedays={fivedays} />
              </Route>
              <Route path="/old">
                <DailyForecast dailyweather={dailyWeather} />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
