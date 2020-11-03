import React from "react";
import "./weatherItem.scss";

export default function WeatherPicture({ icon }) {
  return (
    <>
      <img alt="" className="weather-block-img" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
    </>
  );
}
