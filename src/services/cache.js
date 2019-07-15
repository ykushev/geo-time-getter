import NodeCache from 'node-cache';

/**
 * @module Cache
 * @TODO: redis cache
 */
class Cache {
    constructor (config) {
        const { 
            stdTTL,
            checkperiod
        } = config;

        this.cache = new NodeCache({
            stdTTL: stdTTL || 0,
            checkperiod: checkperiod || 600,
            errorOnMissing: true
        });
    }

    get (cityName) {
        // @TODO: Error ENOTFOUND each time
        return this.cache.get(cityName);
    }

    set (cityName, result) {
        return this.cache.set(cityName, result);
    }
}

export default Cache;