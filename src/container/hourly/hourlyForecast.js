import React from "react";

import "./hourlyForecast.scss";
const HourlyForecast = ({ fivedays }) => {
  return (
    <section className="different-days-block">
      <div className="block-scroll-wrapper">
        <div className="block-scroll">
          {fivedays &&
            fivedays.list.map((day) => (
              <div key={day.dt} className="day-block">
                <div>
                  <p>
                    {new Date(day.dt * 1000).toLocaleString("ru", {
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </p>
                  <p>{Math.ceil(`${day.main.temp}`)}°</p>
                </div>
                <img
                  alt=""
                  className="weather-block-img"
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
export default HourlyForecast;
