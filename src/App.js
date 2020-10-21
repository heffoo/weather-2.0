import React, { useEffect, useState } from "react";
import config from "./config";

import "./App.css";

function App() {
  let configs = config;
  const [weather, setWeather] = useState();
  let params = {
    APPID: "5f892c8a0b4c47ee1b455fa5bbc9851f",
  };
  params = { ...params, q: "Krasnodar" };

  const esc = encodeURIComponent;
  let query =
    "?" +
    Object.keys(params)
      .map((k) => esc(k) + "=" + esc(params[k]))
      .join("&");

  console.log(params);
  // `${document.getElementById("input").value}`

  useEffect(() => {
    async function test() {
      await fetcha();
    }
    test();
  }, []);

  async function fetcha() {
    const handler = await fetch(`${configs.apiUrl}${query}`);
    let response = await handler.json();
    setWeather(response);

    // .then((response) => response.json())
    // .then((response) => (weather = response))
    // .catch((err) => {
    //   console.error(err);
    // });
  }
  console.log(weather);
  return (
    <div className="App">
      <div className="main-container">
        <input type="text" id="input"></input>
        <div className="smth">
         широта {weather && weather.coord.lon}
         долгота {weather && weather.coord.lat}
        градусы {weather && weather.main.temp}
        
        </div>
        
      </div>
    </div>
  );
}

export default App;

// ---------------------------------------------------------

//   useEffect(() => {
//     fetchQuotes()

// }, [weathercity])

// const fetchQuotes = () => {
//   setFething(true)
//   fetch(`${configs.apiUrl}${query}`)
//       .then((response) => response.json())
//       .then(res => console.log(res))
//       .then(res => setWeather(res))
//       .then(setFething(false))
//       .catch((err) => {
//         console.error(err);
//       });
// }

// ---------------------------------------------------------

// config = {
//   apikey: huigrehghehips57887
//   apiUrl: https openweather
//   city: Krasnodar
//   lang: ru
// }

// queryParams
// func (conf) {
//   return '?q=London,uk&APPID=43da68da51e7243f3d7714e461f6e74'
// }

// fetch(`${config.apiUrl}${queryParams}`)
