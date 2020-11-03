import React from "react";
import WeatherItem from "./weather-item/weatherItem";

import "./weatherList.scss";

const WeatherList = ({ list = [] }) => {
  return (
    <section className="different-days-block">
      <div className="block-scroll-wrapper">
        <div className="block-scroll">
          {list.map((day, index) => (
            <WeatherItem
              key={index}
              time={day.time}
              icon={day.iconName}
              date={day.date}
              temperature={day.temperature}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default WeatherList;
