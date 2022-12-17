import React from "react";
import { CurrentDayInfo } from "../../../types/currentDay";

type MainInfoProps = {
  dayInfo: CurrentDayInfo;
};

const SideInfo = ({ dayInfo }: MainInfoProps) => {
  return (
    <div className="coords">
      широта {dayInfo.lon} <br />
      долгота {dayInfo.lat}
      <br />
      ветер {dayInfo.windSpeed}мс/c
      <br />
    </div>
  );
};

export default SideInfo;
