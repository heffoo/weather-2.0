import React, { useState,useEffect } from "react";

import "./oldforecast.scss";
const Olddays = ({dailyweather }) => {
//   const [weatherInfo, setWeatherInfo] = useState([]);
// useEffect(() => {
//   console.log(daily)
//  const info =  daily &&
//   daily.daily.map((elem) => {
//     console.log(elem)
//     return {
//       dt: elem.dt,
//       dew_point: elem.dew_point,
//       weather: { ...elem.weather[0] },
//     };

//   })
//   setWeatherInfo(info)
//   console.log(info);
// }, [])
  
  // const info = daily &&

  const dateFormat = require('dateformat');
console.log(Date(dailyweather && dailyweather.daily[2].dt))

  return (
    <section className="different-days-block">
      <div className="block-scroll-wrapper">
        <div className="block-scroll">
          {dailyweather &&
            dailyweather.daily.map((day) => (
              <div key={day.dt} className="day-block">
                <div>
                  <p>{dateFormat(Date(day.dt), "dddd, mmmm dS, yyyy")}</p>
                  <p>{Math.ceil(`${day.dew_point}`)}°</p>
                </div>
                <img
                  className="weather-block-img"
                  alt=""
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
export default Olddays;
