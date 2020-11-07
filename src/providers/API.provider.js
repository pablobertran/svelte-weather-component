import {settings} from "../config/settings";

export class APIProvider {

    _endpoint;

    constructor() {
    }

    _getURL(location = null, lat = null, lon = null) {
        const url = new URL(`https://${settings.api.host}/${this._endpoint}/`);
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

        return url;
    }
}
