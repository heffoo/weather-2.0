import React, { useEffect, useState } from "react";
import { defaultCity } from "../config";

import WeatherService from "../services/weatherService";

import "../container/mainComponent.scss";
import { SearchForm } from "../shared/searchForm/searchForm";
import { Loader } from "../shared/loader/loader";
import { MainCurrentWeather } from "../shared/mainInfo/mainCurrentInfo";

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
      
    
      {(loading && <Loader />) || (
        <div>  
          <SearchForm onSubmitCity={onSubmitCity} loading={loading} weatherInfo={weatherInfo} />
          <MainCurrentWeather weatherInfo={weatherInfo}  />
        </div>
      )}
    </div>
  );
};

export default Container;
