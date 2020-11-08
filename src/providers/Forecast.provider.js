import {settings} from "../config/settings";
import {APIProvider} from "./API.provider";

export class ForecastProvider extends APIProvider {
    _geolocationProvider

    constructor(geolocationProvider) {
        super()
        this._endpoint = 'forecast';
        this._geolocationProvider = geolocationProvider;
    }

    async getForecast() {
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

        return this._getForecastFromResponse(response);
    }

    _getForecastFromResponse(response) {

    }
}
