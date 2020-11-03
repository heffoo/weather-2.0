import React, { useEffect, useState } from "react";
import { defaultCity } from "../config";
import WeatherList from "../shared/weatherList/WeatherList";
import { NavLink, Switch, Route } from "react-router-dom";
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";
import WeatherService from "../services/weatherService";
import { translateClouds } from "../utils";

import "../container/mainComponent.scss";

const Container = () => {
  const [current, setCurrent] = useState();
  const [whichCity, setCity] = useState(defaultCity);
  const [fivedays, setFiveDaysWeather] = useState([]);
  const [dailyWeather, setDailyWeather] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCity = () => {
    let city = document.getElementById("input").value.trim();

    setCity(city);

    document.getElementById("input").value = "";
  };

  useEffect(() => {
    async function test() {
      const dayResponse = await WeatherService.getByDay(whichCity);
      setLoading(true);
      if (!dayResponse) {
        setLoading(false);
        alert("type a correct city");
        return;
      }
      setCurrent(dayResponse);
      const hourlyResponse = await WeatherService.getByHourly(whichCity);
      setFiveDaysWeather(hourlyResponse);

      if (!dailyWeather.length) {
        const dailyResponse = await WeatherService.getByDaily(dayResponse);
        setDailyWeather(dailyResponse);
      }
      setLoading(false);
    }

    test();
  }, [whichCity, dailyWeather]);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
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
        {current && (
          <div>
            <div className="main-info">
              <div>
                <p className="temp"> {Math.ceil(current.main.temp)}°</p>
                <p>По ощущениям: {Math.ceil(current.main.feels_like)} °</p>
              </div>
              <br />
              <br />
              <div className="clouds">
                <h1> {translateClouds(current && current.weather[0].main)}</h1>
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
              <WeatherList list={fivedays} />
            </Route>
            <Route path="/old">
              <WeatherList list={dailyWeather} />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Container;
