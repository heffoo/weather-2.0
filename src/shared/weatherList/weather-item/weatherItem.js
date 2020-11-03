import React from "react";

import WeatherDate from "./weatherDate.js";
import WeatherHours from "./weatherHours.js";
import WeatherPicture from "./weatherPicture.js";
import WeatherTemp from "./weatherTemp.js";

import "./weatherItem.scss";

export default function WeatherItem({ day = {} }) {
  let temperature = day.temperature;
  let icon = day.iconName;
  let time = day.time;
  let date = day.date;
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
