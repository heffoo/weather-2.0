import React from "react";
import { translateClouds } from "../../utils";
import WeatherList from "../weatherList/WeatherList";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import { SearchForm } from "../searchForm/searchForm";
import ErrorBoundary from "../../container/errorBoundary";
import "./mainCurrentInfo.scss";

export function MainCurrentWeather({ weatherInfo, onSubmitCity, loading, setModalIsOpen, isModalOpen }) {
  
  if (!weatherInfo.dayInfo) {
    setModalIsOpen(true);
  }

  return (
    <div className="wrapper">
      <SearchForm onSubmitCity={onSubmitCity} loading={loading} weatherInfo={weatherInfo} />

      <div className="main-info">
        <div>
          <p className="temp"> {Math.ceil(weatherInfo.dayInfo.temperature)}°</p>
          <p>По ощущениям: {Math.ceil(weatherInfo.dayInfo.feelsLike)} °</p>
        </div>
        <br />
        <br />
        <div className="clouds">
          <h1> {translateClouds(weatherInfo.dayInfo.clouds)}</h1>
          <p> {weatherInfo.dayInfo.description} </p>
        </div>
        <br />
        <img
          className="weather-img"
          alt=""
          src={`http://openweathermap.org/img/wn/${weatherInfo.dayInfo.icon}@2x.png`}
        />
      </div>

      <br />

      <div className="down">
        <div className="coords">
          широта {weatherInfo.dayInfo.lon} <br />
          долгота {weatherInfo.dayInfo.lat}
          <br />
          ветер {weatherInfo.dayInfo.windSpeed}мс/c
          <br />
        </div>

        <div>
          <div className="btn-wrapper">
            <NavLink exact to="/weather" activeClassName="active" className="day-btn">
              по часам
            </NavLink>
            <NavLink to="/old" activeClassName="active" className="day-btn">
              по дням
            </NavLink>
          </div>
          <Switch>
            <ErrorBoundary>
              <Route exact path="/weather">
                <WeatherList setModalIsOpen={setModalIsOpen} list={weatherInfo.hourlyInfo} />
              </Route>

              <Route path="/old">
                <WeatherList setModalIsOpen={setModalIsOpen} list={weatherInfo.dailyInfo} />
              </Route>
              <Redirect from="/" to="/weather" />
            </ErrorBoundary>
          </Switch>
        </div>
      </div>
    </div>
  );
}
