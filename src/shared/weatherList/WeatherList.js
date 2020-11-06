import React from "react";
import WeatherItem from "./weather-item/weatherItem";

import "./weatherList.scss";
import ErrorBoundary from "../../container/errorBoundary";

const WeatherList = ({ list = [], setModalIsOpen }) => {
  if (!list.length) {
    return;
  }
  // list = null;

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
