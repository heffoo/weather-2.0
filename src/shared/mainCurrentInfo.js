import React from "react";
import { translateClouds } from "../utils";

import "../container/mainComponent.scss";
export function MainCurrentWeather({ weatherInfo }) {
  return (
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
  );
}
