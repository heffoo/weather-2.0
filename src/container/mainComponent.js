import React, { useEffect, useState } from "react";
import { defaultCity } from "../config";
import WeatherList from "../shared/weatherList/WeatherList";
import { NavLink, Switch, Route } from "react-router-dom";
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";
import WeatherService from "../services/weatherService";
import { translateClouds } from "../utils";

import "../container/mainComponent.scss";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const initState = { dayInfo: {}, hourlyInfo: {}, dailyInfo: {} };
const Container = () => {
  const [whichCity, setCity] = useState(defaultCity);
  const [loading, setLoading] = useState(true);
  const [weatherInfo, setAllWeather] = useState(initState);

  const onSubmitCity = (e) => {
    e.preventDefault();
    const form = document.forms.searchCity;
    setCity(form.elements.cityInput.value);

    form.elements.cityInput.value = "";
  };
  console.log(whichCity);
  useEffect(() => {
    async function test() {
      try {
        const currentCityWeather = await WeatherService.getAll(whichCity);

        setAllWeather(currentCityWeather);
      } catch (e) {
        alert("123");
        return;
      }

      setLoading(false);
    }

    test();
  }, [whichCity]);

  return (
    <div className="main-container">
      {(loading && "loading") || (
        <div>
          <div className="search-place">
            <form name="searchCity" onSubmit={onSubmitCity}>
              <input
                name="cityInput"
                type="text"
                className="city-input"
                id="input"

                // onKeyPress={(e) => e.key === "Enter" && onSubmitCity(e)}
              />
              <button type="submit" className="city-button">
                <span role="img" aria-label="search">
                  &#128269;{" "}
                </span>
              </button>
            </form>
            <p>город: {weatherInfo.dayInfo.city}</p> {/*  CITY IS HERE */}
            <div className={loading ? "sweet-loading-show" : "sweet-loading"}>
              <SyncLoader css={override} size={10} color={"#ffffff"} />
            </div>
          </div>

          <div className="wrapper">
            <div className="main-info">
              <div>
                <p className="temp"> {Math.ceil(weatherInfo.dayInfo.temperature)}°</p>
                <p>По ощущениям: {Math.ceil(weatherInfo.dayInfo.feelsLike)} °</p>
              </div>
              <br />
              <br />
              <div className="clouds">
                <h1> {translateClouds(weatherInfo.dayInfo.clouds)}</h1>
                <p> {weatherInfo.dayInfo.description} </p>
              </div>
              <br />
              <img
                className="weather-img"
                alt=""
                src={`http://openweathermap.org/img/wn/${weatherInfo.dayInfo.icon}@2x.png`}
              />
            </div>

            <br />
          </div>
          <div className="down">
            <div className="coords">
              широта {weatherInfo.dayInfo.lon} <br />
              долгота {weatherInfo.dayInfo.lat}
              <br />
              ветер {weatherInfo.dayInfo.windSpeed}мс/c
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
                  <WeatherList list={weatherInfo.hourlyInfo} />
                </Route>
                <Route path="/old">
                  <WeatherList list={weatherInfo.dailyInfo} />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Container;
