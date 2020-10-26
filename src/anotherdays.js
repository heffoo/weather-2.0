import React from "react";
import "./anotherdays.scss";
const AnotherDays = ({ params, fivedays}) => {

    console.log(321, fivedays && fivedays.list[0].weather[0].icon)
  console.log(123, fivedays, );
  return (
      
    <section className="different-days-block">

        <div class="block-scroll-wrapper">
            <div className="block-scroll">
      {fivedays &&
        fivedays.list.map((day) => (
          <div key={day.dt} className="day-block">
          <div> <p>{(day.dt_txt)}</p>
        <p>{Math.ceil(`${day.main.temp}`)}°</p></div>  
        <img alt=''
                  className="weather-block-img"
                //   alt={fivedays.list[0].weather.description}
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                />
          </div>
        ))}
       </div>
       </div>
    </section>
  );
};
export default AnotherDays;
