import React from "react";
import "./weatherItem.scss";

export default function WeatherPicture({ icon }) {
  return (
    <div className="weather-pic">
      <img alt="" className="weather-block-img" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
    </div>
  );
}
