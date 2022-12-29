import React from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import ErrorBoundary from "../../../components/errorBoundary";
import { weatherDailyInfo } from "../../../types/weatherDailyInfo";
import { WeatherHourlyInfo } from "../../../types/weatherHourlyInfo";
import WeatherList from "./WeatherList";

type WeatherListBlockProps = {
  dailyInfo: weatherDailyInfo[];
  hourlyInfo: WeatherHourlyInfo[];
  setModalIsOpen: (modalIsOpen: boolean) => void;
};

const WeatherListBlock = ({
  dailyInfo,
  hourlyInfo,
  setModalIsOpen,
}: WeatherListBlockProps) => {
  return (
    <div>
      <div className="btn-wrapper">
        <NavLink
          exact
          to="/weather"
          activeClassName="active"
          className="day-btn"
        >
          по дням
        </NavLink>
        <NavLink to="/old" activeClassName="active" className="day-btn">
          по часам
        </NavLink>
      </div>
      <Switch>
        <ErrorBoundary>
          <Route exact path="/weather">
            <WeatherList list={dailyInfo} />
          </Route>
          {console.log(dailyInfo, hourlyInfo)}

          <Route path="/old">
            <WeatherList list={hourlyInfo} />
          </Route>
          <Redirect from="/" to="/weather" />
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

export default WeatherListBlock;
