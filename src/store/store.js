import {writable} from 'svelte/store';
import {WeatherProvider} from '../providers/Weather.provider';

const weatherProvider = new WeatherProvider();

export const weather = writable({});
weatherProvider.updateStore(weather);

export const getWeatherOnLocation = async (location) => {
    const weatherOnLocation = await weatherProvider.getWeatherOnLocation(location);
    weather.update( value => weatherOnLocation);
}
