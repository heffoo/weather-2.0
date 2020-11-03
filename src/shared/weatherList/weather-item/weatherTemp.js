import React from "react";

import "./weatherItem.scss";

export default function WeatherTemp({ temp }) {
  return <>{Math.ceil(temp)}°</>;
}
