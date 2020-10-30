import React from "react";

import "./dailyForecast.scss";
const DailyForecast = ({ dailyweather }) => {
  return (
    <section className="different-days-block">
      <div className="block-scroll-wrapper">
        <div className="block-scroll">
          {dailyweather &&
            dailyweather.daily.map((day) => (
              <div key={day.dt} className="day-block2">
                <div>
                  <p>
                    {new Date(day.dt * 1000).toLocaleString("ru", {
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p>{Math.ceil(`${day.temp.day}`)}°</p>
                </div>
                <div>  <p>
                   
                  </p></div>
                <img
                  className="weather-block-img"
                  alt=""
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
export default DailyForecast;

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
