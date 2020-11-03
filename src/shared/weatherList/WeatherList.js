import React from "react";
import WeatherItem from "./weather-item/weatherItem";

import "./weatherList.scss";

const WeatherList = ({ list=[]}) => {
 
  return (
    <section className="different-days-block">
      <div className="block-scroll-wrapper">
        <div className="block-scroll">
          {list.map((day) => (

            <WeatherItem  key={day.temperature} day={day}/>
            
            ))}
        </div>
      </div>
    </section>
  );
};
export default WeatherList;
