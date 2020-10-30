import React from "react";

import "./oldforecast.scss";
const Olddays = ({ dailyweather }) => {
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

  // console.log(444, dailyweather && dailyweather.daily[0].weather[0])

  const dateFormat = require("dateformat");

  return (
    <section className="different-days-block">
      <div className="block-scroll-wrapper">
        <div className="block-scroll">
          {dailyweather &&
            dailyweather.daily.map((day) => (
              <div key={day.dt} className="day-block">
                <div>
                  <p>{dateFormat(new Date(day.dt * 1000).toGMTString(), "dddd, mmmm dS")}</p>
                  <p>{Math.ceil(`${day.temp.day}`)}°</p>
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

//

// <form id="form-form">
// id="name-input"
// id="email-input"
// id="question-input"

// <button
// onclick="onSubmit"
// class="form-wrap__btn btn-primary g-recaptcha"
// data-sitekey="6LeBkdsZAAAAABW9Lmiq7r-gOZ9r9U3P2VCmZRts"
// data-callback="onSubmit"
// data-action="submit"
// type="submit"
// >
// Отправить
// </button>

// <script src="https://www.google.com/recaptcha/api.js"></script>
// <script>
//   async function onSubmit(token) {
//     const form = document.getElementById("form-form");
//     const name = document.getElementById("name-input").value;
//     const email = document.getElementById("email-input").value;
//     const question = document.getElementById("question-input").value;

//     console.log(token);
//     const formData = {
//       name,
//       email,
//       text: question,
//       recaptchaResponse: token,
//     };

//     console.log(JSON.stringify(formData));

//     const response = await fetch("https://test.lift.wilix.dev/landing/feedback", {
//       method: "POST",

//       body: JSON.stringify(formData),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     form.submit();
//   }
// </script>
