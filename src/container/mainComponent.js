import React, { useEffect, useState } from "react";
import { defaultCity } from "../config";
import { Loader } from "../shared/loader/loader";
import { MainCurrentWeather } from "../shared/mainInfo/mainCurrentInfo";
import WeatherService from "../services/weatherService";

import "../container/mainComponent.scss";
import { Modal } from "./modal";

const initState = { dayInfo: {}, hourlyInfo: {}, dailyInfo: {} };
const Container = () => {
  const [whichCity, setCity] = useState(defaultCity);
  const [loading, setLoading] = useState(true);
  const [weatherInfo, setAllWeather] = useState(initState);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [isError, setError] = useState();

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
        if (currentCityWeather.ok === false) {
          setError(currentCityWeather.status);
          setModalIsOpen(true);
        } else {
          setLoading(true);
          setAllWeather(currentCityWeather);
        }
      } catch (e) {
        console.log(e);
        // alert("Такого города нет");
      }

      setLoading(false);
    }

    test();
  }, [whichCity]);

  return (
    <div className="main-container">
      {(loading && <Loader />) || (
        <>
          <MainCurrentWeather
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
