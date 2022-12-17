import React from "react";
import WeatherList from "./components/weatherList/WeatherList";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import { SearchForm } from "./components/searchForm/searchForm";
import ErrorBoundary from "../container/errorBoundary";
import "./appContainer.scss";
import MainInfo from "./components/mainInfo/MainInfo";
import SideInfo from "./components/sideInfo/SideInfo";

export function AppContainer({
  weatherInfo,
  onSubmitCity,
  loading,
  setModalIsOpen,
  isModalOpen,
}) {
  if (!weatherInfo.dayInfo) {
    setModalIsOpen(true);
  }

  return (
    <div className="wrapper">
      <SearchForm
        onSubmitCity={onSubmitCity}
        loading={loading}
        weatherInfo={weatherInfo}
      />
      <MainInfo dayInfo={weatherInfo.dayInfo} />
      <br />

      <div className="down">
      <SideInfo dayInfo={weatherInfo.dayInfo} />
        <div>
          <div className="btn-wrapper">
            <NavLink
              exact
              to="/weather"
              activeClassName="active"
              className="day-btn"
            >
              по часам
            </NavLink>
            <NavLink to="/old" activeClassName="active" className="day-btn">
              по дням
            </NavLink>
          </div>
          <Switch>
            <ErrorBoundary>
              <Route exact path="/weather">
                <WeatherList
                  setModalIsOpen={setModalIsOpen}
                  list={weatherInfo.hourlyInfo}
                />
              </Route>

              <Route path="/old">
                <WeatherList
                  setModalIsOpen={setModalIsOpen}
                  list={weatherInfo.dailyInfo}
                />
              </Route>
              <Redirect from="/" to="/weather" />
            </ErrorBoundary>
          </Switch>
        </div>
      </div>
    </div>
  );
}
