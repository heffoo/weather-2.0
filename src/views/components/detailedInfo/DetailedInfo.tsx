import React from "react";
import { CurrentDayInfo } from "../../../types/currentDay";

type DetailedInfoProps = {
  dayInfo: CurrentDayInfo;
};

const DetailedInfo = ({ dayInfo }: DetailedInfoProps) => {
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

export default DetailedInfo;
