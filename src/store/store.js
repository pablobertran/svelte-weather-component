import {writable} from 'svelte/store';
import {WeatherProvider} from '../providers/Weather.provider';
import {GeolocationProvider} from "../providers/Geolocation.provider";
import {ForecastProvider} from "../providers/Forecast.provider";
import {WeatherModel} from "../models/weather.model";
import {GeolocationModel} from "../models/geolocation.model";

const geolocationProvider = new GeolocationProvider();
const weatherProvider = new WeatherProvider(geolocationProvider);
const forecastProvider = new ForecastProvider(geolocationProvider);

export const geolocation = writable(new GeolocationModel());
export const forecast = writable({});
export const weather = writable(new WeatherModel());

export const resetWeather = () => {
    geolocationProvider.getLocation().then( async location => {
        await geolocationProvider.setCoords(location.lat, location.lon);
        const w = await weatherProvider.getWeather();
        const f = await forecastProvider.getForecast();
        const g = await geolocationProvider.getLocation();
        geolocation.set(g);
        weather.set(w);
        forecast.set(f);
    });
};


export const getWeatherOnLocation = async (location) => {
    await geolocationProvider.setLocation(location);
    const weatherOnLocation = await weatherProvider.getWeather();
    weather.update( value => weatherOnLocation);
}
