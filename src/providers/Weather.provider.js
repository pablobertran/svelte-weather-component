import {settings} from '../config/settings';
import {WeatherModel} from "../models/weather.model";

export class WeatherProvider {
  _location;
  _lat;
  _long;

  constructor() {
    this.getLocation().then( location => this._location = location);
  }

  updateStore(store) {
    store.update( async v => {
      const location = await this.getLocation();
      this._lat = location.coords.latitude;
      this._long = location.coords.longitude;
      return await this.getWeatherOnLocation(null, this._lat, this._long);
    })
  }

  getLocation() {
    return new Promise((resolve, reject) => {
      const getPosition = (position) => {
        this._location = position;
        resolve(position);
      }
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
      }
    });
  }

  async getWeatherOnLocation(location = null, lat = null, lon = null) {
        const url = new URL(`https://${settings.api.host}/weather/`);
    const params = {
      q: location || undefined,
      lang: settings.lang,
      units: settings.unit,
      lat: lat || undefined,
      lon: lon || undefined
    };

    Object.keys(params).forEach( key => {
      if(params[key] !== undefined) url.searchParams.append(key, params[key]);
    });

    const rawResponse = await fetch(url.href, {
      method: 'GET',
      headers: {
        "x-rapidapi-key": settings.api.key,
        "x-rapidapi-host": settings.api.host
      }
    });
    const response = await rawResponse.json();

    const weatherModel = new WeatherModel({
      wind: response.wind,
      description: response.weather[0].description,
      temperature: response.main,
    })
    return weatherModel;
  }
}
