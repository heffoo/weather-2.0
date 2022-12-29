import { apiUrl, apiUrlSecond, apiUrlThird } from "../consts";
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

  static async getForecast(options) {
    const resp = await fetch(options);

    if (resp.status === 404) {
      console.log("incorrect city");
      return resp;
    } else if (!resp.ok) {
      console.log("unknown error");
    }

    const WeatherList = await resp.json();
    return WeatherList;
  }

  static async getDayByCity(whichCity) {
    const query = WeatherService.buildParams(whichCity);

    const dayResponse = await WeatherService.getForecast(`${apiUrl}${query}`);
    if (dayResponse.ok === false) {
      return dayResponse;
    }
    const dayInfo = {
      city: dayResponse.name,
      clouds: dayResponse.weather[0].main,
      lat: dayResponse.coord.lat,
      lon: dayResponse.coord.lon,
      
      temperature: dayResponse.main.temp,
      feelsLike: dayResponse.main.feels_like,
      windSpeed: dayResponse.wind.speed,
      description: dayResponse.weather[0].description,
      icon: dayResponse.weather[0].icon,
    };

    return dayInfo;
  }

  static async getHourlyByCity(whichCity) {
    const query = WeatherService.buildParams(whichCity);
    const hourlyResponse = await WeatherService.getForecast(`${apiUrlSecond}${query}`);

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

  static async getDailyByCoords(lat, lon) {
    let params3 = { APPID, lat, lon, units: "metric", exclude: "hourly" };
    let query3 =
      "?" +
      Object.keys(params3)
        .map((k) => esc(k) + "=" + esc(params3[k]))
        .join("&");

    const dailyResponse = await WeatherService.getForecast(`${apiUrlThird}${query3}`);
    const dailyInfo = dailyResponse.daily.map((el) => {
      return {
        iconName: el.weather[0].icon,
        temperature: el.temp.day,
        date: formatDate(el.dt),
      };
    });
    
    return dailyInfo;
  }

  static async getAll(whichCity) {
    const dayInfo = await WeatherService.getDayByCity(whichCity);
    if (dayInfo.ok === false) {
      return dayInfo;
    }
    const hourlyInfo = await WeatherService.getHourlyByCity(whichCity);

    const dailyInfo = await WeatherService.getDailyByCoords(dayInfo.lat, dayInfo.lon);

    return {
      dayInfo,
      hourlyInfo,
      dailyInfo,
    };
  }
}
