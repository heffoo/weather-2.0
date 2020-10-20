import React from "react";
import config from "./config";

import "./App.css";

function App() {
  let configs = config;

  let params = {
    APPID: "43da68da51e7243f3d7714e461f6e74f",
  };
  params = { ...params, q: "Moscow" };


  const esc = encodeURIComponent;
  let query =
    "?" +
    Object.keys(params)
      .map((k) => esc(k) + "=" + esc(params[k]))
      .join("&");

  console.log(params);
  // `${document.getElementById("input").value}`

let weather;


  fetch(`${configs.apiUrl}${query}`)
    .then((response) => response.json())
    .then((res) => weather = res)
    .catch((err) => {
      console.error(err);
    });

  console.log('weather', weather);
  //  function QueryParams(params) {
  //   return "?city={lat}&lang={lon}&appid={apikey}";
  //  };

  return (
    <div className="App">
      <div className="main-container">
        <input type="text" id="input"></input>
      </div>
    </div>
  );
}

export default App;

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
