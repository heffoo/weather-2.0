import { apiUrl, apiUrlSecond, apiUrlThird } from "../config";
import { formatDate, formatTime } from "../utils";

const esc = encodeURIComponent;
const APPID = "5f892c8a0b4c47ee1b455fa5bbc9851f";

export default class WeatherService {
  static buildParams(whichCity) {
    let params = { APPID, q: `${whichCity}`, units: "metric", lang: "ru" };
    let query =
      "?" +
      Object.keys(params)
        .map((k) => esc(k) + "=" + esc(params[k]))
        .join("&");
    return query;
  }

  static async getByDay(whichCity) {
    const query = WeatherService.buildParams(whichCity);

    const dayResponse = await WeatherService.fetcha(`${apiUrl}${query}`);
    return dayResponse;
  }

  static async getByHourly(whichCity) {
    const query = WeatherService.buildParams(whichCity);
    const hourlyResponse = await WeatherService.fetcha(`${apiUrlSecond}${query}`);

    const hourlyInfo = hourlyResponse.list.map((el) => {
      return {
        iconName: el.weather[0].icon,
        temperature: el.main.temp,
        date: formatDate(el.dt),
        time: formatTime(el.dt),
      };
    });

    return hourlyInfo;
  }

  static async fetcha(options) {
    const resp = await fetch(options);
    if (!resp.ok) {
      console.log(resp);
      return false;
    }
    const json = await resp.json();
    return json;
  }

  static async getByDaily(dayResponse) {
    let lon = dayResponse.coord.lon;
    let lat = dayResponse.coord.lat;
    let params3 = { APPID, lat, lon, units: "metric", exclude: "hourly" };
    let query3 =
      "?" +
      Object.keys(params3)
        .map((k) => esc(k) + "=" + esc(params3[k]))
        .join("&");

    const dailyResponse = await WeatherService.fetcha(`${apiUrlThird}${query3}`);
    const dailyInfo = dailyResponse.daily.map((el) => {
      return {
        iconName: el.weather[0].icon,
        temperature: el.temp.day,
        date: formatDate(el.dt),
      };
    });
    return dailyInfo;
  }
}