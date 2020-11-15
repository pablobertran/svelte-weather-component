import moment from 'moment';
import {settings} from "../config/settings";

export class WeatherModel {
    _wind = {
        deg: 0,
        speed: 0
    };
    _description = '';
    _temperature = {
        temp: 0,
        feelsLike: 0,
        humidity: 0,
        pressure: 0,
        tempMax: 0,
        tempMin: 0
    }
    _date = new Date();


    constructor(params = null) {
        this._initialize(params);
    }

    _initialize(params) {
        this.setDescription(!!params ? params.description : '');
        this.setWind(!!params ? params.wind : {deg: 0, speed: 0});
        this.setTemperature({
            temp: !!params ? params.temperature.temp : 0,
            feelsLike: !!params ? params.temperature.feels_like : 0,
            humidity: !!params ? params.temperature.humidity : 0,
            pressure: !!params ? params.temperature.pressure : 0,
            tempMax: !!params ? params.temperature.temp_max : 0,
            tempMin: !!params ? params.temperature.temp_min : 0
        });
        this.setDate(!!params ? params.date : undefined);
    }

    getWind() {
        return this._wind;
    }

    setWind(params = {deg: 0, speed: 0}) {
        this._wind.deg = params.deg;
        this._wind.speed = params.speed;
    }

    getDescription() {
        return this._description;
    }

    setDescription(description = '') {
        this._description = description;
    }

    getTemperature(property = null) {
        if (property) return this._temperature[property];
        return this._temperature;
    }

    setTemperature(params = {temp: 0, feelsLike: 0, humidity: 0, pressure: 0, tempMax: 0, tempMin: 0}) {
        this._temperature = {
            temp: params.temp,
            feelsLike: params.feelsLike,
            humidity: params.humidity,
            pressure: params.pressure,
            tempMax: params.tempMax,
            tempMin: params.tempMin
        }
    }

    setDate(date = moment()) {
        this._date = date;
    }

    getDate() {
        return this._date.format(settings.date.format);
    }
}
