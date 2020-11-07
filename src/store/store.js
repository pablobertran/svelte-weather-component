import {writable} from 'svelte/store';
import {WeatherProvider} from '../providers/Weather.provider';
import {GeolocationProvider} from "../providers/Geolocation.provider";
import {ForecastProvider} from "../providers/Forecast.provider";

const geolocationProvider = new GeolocationProvider();
const weatherProvider = new WeatherProvider(geolocationProvider);
const forecastProvider = new ForecastProvider(geolocationProvider);

export const forecast = writable({});
export const weather = writable({});

export const resetWeather = () => {
    geolocationProvider.getLocation().then( async location => {
        await geolocationProvider.setCoords(location.lat, location.lon);
        weather.update(async v =>  await weatherProvider.getWeather() );
        forecast.update(async  v => await forecastProvider.getForecast() );
    });
};


export const getWeatherOnLocation = async (location) => {
    await geolocationProvider.setLocation(location);
    const weatherOnLocation = await weatherProvider.getWeather();
    weather.update( value => weatherOnLocation);
}
