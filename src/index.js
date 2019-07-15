require("babel-core/register");
require("babel-polyfill");

import getCoordsByName from './services/yandex';
import getTimezoneByCoords from './services/google';
import Cache from './services/cache';

/**
 * @module geoTimeGetter
 */
class geoTimeGetter {
    constructor (config = {}) {
        // @TODO: validator, default values
        this.config = { 
            GOOGLE: {},
            YANDEX: {},
            cache: false,
            ...config
        };

        if (config.cache) {
            this.cache = new Cache(config.cache);
        }
    }

    /**
     * @method getFromApi - getting zone from api
     * @private
     * 
     * @param {Object} config
     * @param {String} cityName
     * 
     * @throws {ServiceUnavailable}
     * @return {Object} google timezone response https://developers.google.com/maps/documentation/timezone/intro
     */
    async getFromApi (cityName) {
        const { config } = this;
        const coords = await getCoordsByName({ config, cityName });
        const result = await getTimezoneByCoords({ config, coords });

        return result;
    }

    /**
     * @method get - getting timezone by city name
     *
     * @param {String} cityName
     * 
     * @throws {ServiceUnavailable}
     * @return {Object} google timezone response https://developers.google.com/maps/documentation/timezone/intro
     */
    async get (cityName) {
        const { config } = this;

        if (!config.cache) {
            return await this.getFromApi(cityName);
        } else {
            

            if (config.cache.strategy === 'cacheFirst') {
                try {
                    return this.cache.get(cityName);
                } catch (error) { // TODO: types
                    const result = await this.getFromApi(cityName);
                    this.cache.set(cityName, result);

                    return result;
                }
            } else {
                try {
                    const result = await this.getFromApi(cityName);
                    this.cache.set(cityName, result);

                    return result;
                } catch { // TODO: types
                    return this.cache.get(cityName);
                }
            }
        }
    }
}

export default geoTimeGetter;