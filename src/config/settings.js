export const settings = {
    api: {
        key: "",
        host: "community-open-weather-map.p.rapidapi.com"
    },
    lang: 'es',
    unit: 'metric'
}
/*
var unirest = require("unirest");

var req = unirest("GET", "https://community-open-weather-map.p.rapidapi.com/weather");

req.query({
    "q": "London,uk",
    "lat": "0",
    "lon": "0",
    "callback": "test",
    "id": "2172797",
    "lang": "null",
    "units": "\"metric\" or \"imperial\"",
    "mode": "xml, html"
});

req.headers({
    "x-rapidapi-key": "SLZoJGKK8AmshSRaL69CadFK8JJjp1y57g3jsnh4kucKGacsE0",
    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com/",
    "useQueryString": true
});


req.end(function (res) {
    if (res.error) throw new Error(res.error);

    console.log(res.body);
});
*/
