require("babel-core/register");
require("babel-polyfill");

import getCoordsByName from './services/yandex.js';
import getTimezoneByCoords from './services/google.js';

class geoTimeGetter {
    constructor (config = {}) {
        // @TODO: validator, default values
        this.config = { 
            GOOGLE: {},
            YANDEX: {},
            ...config
        };
    }

    async get (cityName) {
        const { config } = this;
        console.log(cityName);
        const coords = await getCoordsByName({ config, cityName });
        console.log(coords);
        const result = await getTimezoneByCoords({ config, coords });
        return result;
    }
}

export default geoTimeGetter;