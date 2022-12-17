import React from "react";

import "./searchForm.scss";

export function SearchForm({ onSubmitCity, weatherInfo }) {
  return (
    <div className="search-place">
      <form name="searchCity" onSubmit={onSubmitCity}>
        <input name="cityInput" type="text" className="city-input" id="input" />
        <button type="submit" className="city-button">
          <span role="img" aria-label="search">
            &#128269;
          </span>
        </button>
      </form>
      <p>город: {weatherInfo.dayInfo.city}</p> {/*  CITY IS HERE */}
    </div>
  );
}
