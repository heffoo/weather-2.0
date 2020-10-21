import React, { useEffect, useState } from "react";
import config from "./config";

import "./App.css";

function App() {
  const [current, setWeather] = useState();
  let configs = config;
  let sky;
  let temp;
  
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
  }


   function dosmth() {
    var val = document.getElementById('input').value;
    document.getElementById('kek').innerHTML="Вы ввели: "+val;
};


  // ----
  console.log('current', current);
 console.log('params',params);
// ----

  if (typeof current !== "undefined") {
    current.weather.map((element) => (sky = element));
  }



  const temperature = () => {
    temp = (current && current.main.temp) - 273.15;
  };
  temperature();
  return (
    <div className="App">
      <div className="main-container">
        Введите город: <input type="text" id="input" />
        {/* <input type="button" id="button"> submit</input> */}
        <input type="button"value="submit" onClick={dosmth}/>
        <div className="smth">
          {current ? (
            <div>
              город: {params.q} <br />
              широта {current.coord.lon} <br />
              долгота {current.coord.lat} <br />
              градусов {temp} <br />
              облачность {current.weather[0].main} <br />
              подробная облачность {current.weather[0].description}
              <br /><div id="kek"></div>
              картинка погоды <br />
              <img src={"http://openweathermap.org/img/wn/" + `${current.weather[0].icon}` + "@2x.png"} />
            </div>
          ) : (
            ""
          )}

          <br />
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
