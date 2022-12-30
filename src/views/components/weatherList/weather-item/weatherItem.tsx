import React from "react";

import WeatherDate from "./weatherDate.js";
import WeatherHours from "./weatherHours.js";
import WeatherPicture from "./weatherPicture.js";
import WeatherTemp from "./weatherTemp.js";

import "./weatherItem.scss";

type WeatherListItemProps = {
  date: string;
  temperature: number;
  time?: string;
  iconName: string; 
}

export default function WeatherItem({ date, temperature, time, iconName }: WeatherListItemProps) {
  return (
    <div className="day-block">
      <div>
        <div className="time">
          <p>
            <WeatherDate time={date} />
          </p>

          <p className="temperature">
            <WeatherTemp temp={temperature} />
          </p>
        </div>
      </div>
      {time && <WeatherHours time={time} />}

      <WeatherPicture icon={iconName} />
    </div>
  );
}
