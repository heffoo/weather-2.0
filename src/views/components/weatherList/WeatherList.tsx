import React from "react";
import { weatherDailyInfo } from "../../../types/weatherDailyInfo";
import { WeatherHourlyInfo } from "../../../types/weatherHourlyInfo";
import WeatherItem from "./weather-item/weatherItem";

import "./weatherList.scss";

type WeatherListProps = {
  list: weatherDailyInfo[] | WeatherHourlyInfo[];
};

const WeatherList = ({ list = [] }: WeatherListProps) => {
  return (
    <section className="different-days-block">
      <div className="block-scroll-wrapper">
        <div className="block-scroll">
          <>
            {list.length &&
              list.map((day, index) => (
                <WeatherItem
                  key={index}
                  time={"time" in day ? day.time : ""}
                  iconName={day.iconName}
                  date={day.date}
                  temperature={day.temperature}
                />
              ))}
            {console.log("here")}
          </>
        </div>
      </div>
    </section>
  );
};

export default WeatherList;
