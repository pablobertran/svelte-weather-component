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
    const url = this._getURL(geolocation.location, geolocation.lat, geolocation.lon);
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
    return new WeatherModel({
      wind: response.wind,
      description: response.weather[0].description,
      temperature: response.main,
    });
  }
}
