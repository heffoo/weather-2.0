import React from "react";
import SearchIcon from "../../../components/searchIcon";
import "./searchForm.scss";

export function SearchForm({ onSubmitCity, weatherInfo }) {
  return (
    <div className="searchFormWrapper">
      <form name="searchCity" onSubmit={onSubmitCity}>
        <input
          name="cityInput"
          type="text"
          className="searchFormInput"
          id="input"
        />
        <button type="submit" className="searchFormButton">
          <SearchIcon />
        </button>
      </form>
      <p>город: {weatherInfo.dayInfo.city}</p>
    </div>
  );
}
