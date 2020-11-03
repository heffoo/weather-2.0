import React from "react";

import WeatherDate from "./weatherDate.js";
import WeatherHours from "./weatherHours.js";
import WeatherPicture from "./weatherPicture.js";
import WeatherTemp from "./weatherTemp.js";

import "./weatherItem.scss";

export default function WeatherItem({ date, temperature, time, icon }) {
  
  return (
    <div className="day-block">
      <div>
        <WeatherDate time={date} />
        <p>
          <WeatherTemp temp={temperature} />
        </p>
      </div>
      {time && <WeatherHours time={time} />}

      <WeatherPicture icon={icon} />
    </div>
  );
}
