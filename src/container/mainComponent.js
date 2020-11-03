import React, { useEffect, useState } from "react";
import { defaultCity } from "../config";
import WeatherList from "../shared/weatherList/WeatherList";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

import WeatherService from "../services/weatherService";

import "../container/mainComponent.scss";
import { SearchForm } from "../shared/searchForm";
import { Loader } from "../shared/weatherList/loader";
import { MainCurrentWeather } from "../shared/mainCurrentInfo";
import { DetailWeatherInfo } from "../shared/detailWeather";

const initState = { dayInfo: {}, hourlyInfo: {}, dailyInfo: {} };
const Container = () => {
  const [whichCity, setCity] = useState(defaultCity);
  const [loading, setLoading] = useState(true);
  const [weatherInfo, setAllWeather] = useState(initState);

  const onSubmitCity = (e) => {
    e.preventDefault();
    const form = document.forms.searchCity;
    setCity(form.elements.cityInput.value);
    setLoading(true);
    form.elements.cityInput.value = "";
  };

  useEffect(() => {
    async function test() {
      setLoading(true);
      try {
        const currentCityWeather = await WeatherService.getAll(whichCity);
        setLoading(true);
        setAllWeather(currentCityWeather);
      } catch (e) {
        alert("123");
        return;
      }

      setLoading(false);
    }

    test();
  }, [whichCity]);

  return (
    <div className="main-container">
      <Loader />
      {(loading && "123") || (
        <div>
          <SearchForm onSubmitCity={onSubmitCity} loading={loading} weatherInfo={weatherInfo} />

          <MainCurrentWeather weatherInfo={weatherInfo} />

          <div className="down">
            <DetailWeatherInfo weatherInfo={weatherInfo} />
            <div>
              <div className="btn-wrapper">
                <NavLink exact to="/weather" activeClassName="active" className="day-btn">
                  почасовой
                </NavLink>
                <NavLink to="/old" activeClassName="active" className="day-btn">
                  по дням
                </NavLink>
              </div>
              <Switch>
                <Route exact path="/weather">
                  <WeatherList list={weatherInfo.hourlyInfo} />
                </Route>
                <Route path="/old">
                  <WeatherList list={weatherInfo.dailyInfo} />
                </Route>
                <Redirect from="/" to="/weather" />{" "}
              </Switch>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Container;
