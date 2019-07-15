"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yandex = require("./services/yandex");

var _yandex2 = _interopRequireDefault(_yandex);

var _google = require("./services/google");

var _google2 = _interopRequireDefault(_google);

var _cache = require("./services/cache");

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-core/register");

require("babel-polyfill");

/**
 * @module geoTimeGetter
 */
class geoTimeGetter {
  constructor(config = {}) {
    // @TODO: validator, default values
    this.config = {
      GOOGLE: {},
      YANDEX: {},
      cache: false,
      ...config
    };

    if (config.cache) {
      this.cache = new _cache2.default(config.cache);
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


  async getFromApi(cityName) {
    console.log('getFromApi');
    const {
      config
    } = this;
    const coords = await (0, _yandex2.default)({
      config,
      cityName
    });
    const result = await (0, _google2.default)({
      config,
      coords
    });
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


  async get(cityName) {
    const {
      config
    } = this;

    if (!config.cache) {
      return await this.getFromApi(cityName);
    } else {
      if (config.cache.strategy === 'cacheFirst') {
        try {
          return this.cache.get(cityName);
        } catch (error) {
          // TODO: types
          const result = await this.getFromApi(cityName);
          this.cache.set(cityName, result);
          return result;
        }
      } else {
        try {
          const result = await this.getFromApi(cityName);
          this.cache.set(cityName, result);
          return result;
        } catch {
          // TODO: types
          return this.cache.get(cityName);
        }
      }
    }
  }

}

exports.default = geoTimeGetter;