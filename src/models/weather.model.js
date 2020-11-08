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


    constructor(params= {}) {
        this.setDescription(params.description);
        this.setWind(params.wind);
        this.setTemperature({
            temp: params.temperature.temp,
            feelsLike: params.temperature.feels_like,
            humidity: params.temperature.humidity,
            pressure: params.temperature.pressure,
            tempMax: params.temperature.temp_max,
            tempMin: params.temperature.temp_min
        });
    }

    getWind() {
        return this._wind;
    }

    setWind(params = {deg: 0, speed: 0} ) {
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

    setDate(date = new Date()) {
        this._date = date;
    }

    getDate() {
        return this._date;
    }
}
