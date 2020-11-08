export class GeolocationModel {
    _lat;
    _lon;
    _location;

    constructor(params = null) {
        this._initialize(params);
    }

    _initialize(params) {
        this.setCoords(!!params ? params.lat : 0, !!params ? params.lon : 0);
        this.setLocation(!!params ? params.location : null);
    }

    setCoords(lat = null, lon = null) {
        this._lat = lat;
        this._lon = lon;
    }

    getCoords() {
        return {
            lat: this._lat,
            lon: this._lon,
        }
    }

    setLocation(location = null) {
        this._location = location;
    }

    getLocation() {
        return this._location;
    }

}
