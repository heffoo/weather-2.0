import React from "react";

export function DetailWeatherInfo({ weatherInfo }) {
  return (
    <div className="coords">
      широта {weatherInfo.dayInfo.lon} <br />
      долгота {weatherInfo.dayInfo.lat}
      <br />
      ветер {weatherInfo.dayInfo.windSpeed}мс/c
      <br />
    </div>
  );
}
