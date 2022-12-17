import React from "react";
import { CurrentDayInfo } from "../../../types/currentDay";
import { translateClouds } from "../../../utils";
import "./mainInfo.scss";

type MainInfoProps = {
  dayInfo: CurrentDayInfo;
};

const MainInfo = ({ dayInfo }: MainInfoProps) => {
  return (
    <div className="main-info">
      <div>
        <p className="temp"> {Math.ceil(dayInfo.temperature)}°</p>
        <p>По ощущениям: {Math.ceil(dayInfo.feelsLike)} °</p>
      </div>
      <br />
      <br />
      <div className="clouds">
        <h1> {translateClouds(dayInfo.clouds)}</h1>
        <p> {dayInfo.description} </p>
      </div>
      <br />
      <img
        className="weather-img"
        alt=""
        src={`http://openweathermap.org/img/wn/${dayInfo.icon}@2x.png`}
      />

    </div>
  );
};

export default MainInfo;
