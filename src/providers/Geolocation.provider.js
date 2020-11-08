import {GeolocationModel} from "../models/geolocation.model";

export class GeolocationProvider {

    _location;
    _lat;
    _long;

    constructor() {
    }

    setCoords(lat = null, long = null) {
        this._lat = lat;
        this._long = long;
    }

    setLocation(location = null) {
        this._location = location;
        this.setCoords();
    }

    getLocation() {
        return new Promise((resolve, reject) => {
            const getPosition = (position) => {
                resolve(new GeolocationModel({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    location: this._location
                }));
            }
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(getPosition);
            }
        });
    }


}
