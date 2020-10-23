import React, { useEffect, useState } from "react";
import config from "./config";

import "./App.scss";

function App() {
  const [current, setWeather] = useState();
  const [whichCity, setCity] = useState("Краснодар");
  const [daily, setDailyWeather] = useState()
  let configs = config;
  let temp;
  let city;
  let feelslike;
let oneday;
let fivedays;


  let params = {
    APPID: "5f892c8a0b4c47ee1b455fa5bbc9851f",
  };
  params = { ...params, q: `${whichCity}`, lang:'ru' };

  const esc = encodeURIComponent;
  let query =
    "?" +
    Object.keys(params)
      .map((k) => esc(k) + "=" + esc(params[k]))
      .join("&");

  const getCity = () => {
    city = document.getElementById("input").value.trim();
    console.log("getCity");
    setCity(city);
    document.getElementById("input").value = "";
  };
  console.log("city is - ", whichCity);

  useEffect(() => {
    async function test() {
      await fetcha();
      console.log("useEffect doing");
    }
    test();
  }, [whichCity]);

  async function fetcha() {
    const handler = await fetch(`${configs.apiUrl}${query}`);
    let response = await handler.json();
    setWeather(response);
    console.log("fetching");
    return response
  }
// oneday = fetcha(configs.apiUrl)
// fivedays = fetcha(configs.apiUrlSecond)
  
    const weatherChecking = () => {

    }
  // function dosmth() {
  //   var val = document.getElementById("input").value;
  //   document.getElementById("kek").innerHTML = "Вы ввели: " + val;
  // }

  // ----
  console.log("current", current);
  // console.log('daily', daily)
  // console.log("params", params);
  // -----


  const temperature = () => {
    temp = (current && current.main.temp)   - 273.15;
    feelslike = (current && current.main.feels_like) - 273.15;
    console.log("temperature converting", current && current.main.temp);
  };

 const dailyday = () => {
   
 }
  temperature();
  return (
    <div className="App">
      <div className="main-container">
        <div className="search-place">
          <input type="text" className="city-input" id="input" onKeyPress={(e) => e.key === "Enter" && getCity()} />

          <input type="button" className="city-button" value="&#128269;" onClick={getCity} />
     <p>город: {params.q}</p>     {/*  CITY IS HERE */}
                  </div>

        <div>
          {current ? (
            <div className="wrapper">
              <div className="main-info">
               <div><div className="temp"> {Math.ceil(temp)}°</div> <p>По ощущениям: {Math.ceil(feelslike)}  °</p> </div>  <br />
                
                <br />
                <div className="clouds"><h1> {current.weather[0].main}</h1> </div><br /> 
               
             
                <img
                  className="weather-img"
                  alt={current.weather[0].description}
                  src={"http://openweathermap.org/img/wn/" + `${current.weather[0].icon}` + "@2x.png"}
                /> 
              </div>
             <div className="coords">
                широта {current.coord.lon} <br />
                долгота {current.coord.lat}<br />
                ветер {current.wind.speed}мс/c<br />
                 подробная облачность: {current.weather[0].description}
              
              </div>
            </div>
          ) : (
            ""
          )}
          <br />
        </div>
        <input type="button" value="daily" />
        <div className="what-weather-block">
          
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
