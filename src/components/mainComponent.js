import React, { useEffect, useState } from "react";
import { defaultCity } from "../consts";
import { Loader } from "../views/components/loader/loader";
import { AppContainer } from "../views/appContainer";
import WeatherService from "../services/weatherService";

import "./mainComponent.scss";
import { Modal } from "./modal";

const initState = { dayInfo: {}, hourlyInfo: {}, dailyInfo: {} };

const Container = () => {
  const [desiredCity, setDesiredCity] = useState(defaultCity);
  const [loading, setLoading] = useState(true);
  const [weatherInfo, setAllWeather] = useState(initState);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [isError, setError] = useState();

  const onSubmitCity = (e) => {
    e.preventDefault();
    const form = document.forms.searchCity;
    setDesiredCity(form.elements.cityInput.value);
    setLoading(true);
    form.elements.cityInput.value = "";
  };

  useEffect(() => {
    (async () => {
      try {
        const currentCityWeather = await WeatherService.getAll(desiredCity);
        if (currentCityWeather.ok === false) {
          setError(currentCityWeather.status);
          setModalIsOpen(true);
        } else {
          setLoading(true);
          setAllWeather(currentCityWeather);
        }
      } catch (e) {
        alert("Проверьте подключение к интернету");
      }

      setLoading(false);
    })()
  }, [desiredCity]);

  return (
    <div className="main-container">
      {(loading && <Loader />) || (
        <>
          <AppContainer
            isModalOpen={isModalOpen}
            setModalIsOpen={setModalIsOpen}
            weatherInfo={weatherInfo}
            loading={loading}
            onSubmitCity={onSubmitCity}
          />

          <Modal error={isError} isOpen={isModalOpen} setIsOpen={setModalIsOpen} />
        </>
      )}
    </div>
  );
};

export default Container;
