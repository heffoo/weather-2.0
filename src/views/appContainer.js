import React from "react";

import { SearchForm } from "./components/searchForm/searchForm";
import ErrorBoundary from "../components/errorBoundary";
import "./appContainer.scss";
import MainInfo from "./components/mainInfo/MainInfo";
import WeatherListBlock from "./components/weatherList/WeatherListBlock";
import DetailedInfo from "./components/detailedInfo/DetailedInfo";

export function AppContainer({ //пропсы
  weatherInfo,
  onSubmitCity,
  loading,
  setModalIsOpen,
}) {
  if (!weatherInfo.dayInfo) { //открывать модальное окно ошибки,
    setModalIsOpen(true);     //если нет данных о текущей погоде
  }

  return (
    <div className="wrapper"> {/* обертка компонентов */}
      <SearchForm 
        onSubmitCity={onSubmitCity}
        loading={loading}
        weatherInfo={weatherInfo}
      /> {/* форма поиска */}
      <MainInfo dayInfo={weatherInfo.dayInfo} /> {/* главная информация */}
      <div className="bottomBlock"> {/* обертка нижней части */}
        <DetailedInfo dayInfo={weatherInfo.dayInfo} /> {/* детальная информация слева снизу */}
        <WeatherListBlock
          dailyInfo={weatherInfo.dailyInfo}
          hourlyInfo={weatherInfo.hourlyInfo}
          setModalIsOpen={setModalIsOpen}
        /> {/* список по дням и по часам справа снизу */}
      </div>
    </div>
  );
}
