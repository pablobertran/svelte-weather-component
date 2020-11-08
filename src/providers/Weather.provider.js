import {settings} from '../config/settings';
import {WeatherModel} from "../models/weather.model";
import {APIProvider} from "./API.provider";

export class WeatherProvider extends APIProvider {

  _geolocationProvider;

  constructor(geolocationProvider) {
    super();
    this._endpoint = 'weather';
    this._geolocationProvider = geolocationProvider;
  }

  async getWeather() {
    const geolocation = await this._geolocationProvider.getLocation();
    const coords = geolocation.getCoords();
    const url = this._getURL(geolocation.getLocation(), coords.lat, coords.lon);
    const rawResponse = await fetch(url.href, {
      method: 'GET',
      headers: {
        "x-rapidapi-key": settings.api.key,
        "x-rapidapi-host": settings.api.host
      }
    });
    const response = await rawResponse.json();

    return this._getWeatherFromResponse(response);
  }

  _getWeatherFromResponse(response) {
    this._geolocationProvider.setLocation(response.name);
    return new WeatherModel({
      wind: response.wind,
      description: response.weather[0].description,
      temperature: response.main,
      date: new Date(response.dt)
    });
  }
}
