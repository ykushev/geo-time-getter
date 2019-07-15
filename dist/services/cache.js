"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeCache = require("node-cache");

var _nodeCache2 = _interopRequireDefault(_nodeCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module Cache
 * @TODO: redis cache
 */
class Cache {
  constructor(config) {
    const {
      stdTTL,
      checkperiod
    } = config;
    this.cache = new _nodeCache2.default({
      stdTTL: stdTTL || 0,
      checkperiod: checkperiod || 600,
      errorOnMissing: true
    });
  }

  get(cityName) {
    // @TODO: Error ENOTFOUND each time
    return this.cache.get(cityName);
  }

  set(cityName, result) {
    return this.cache.set(cityName, result);
  }

}

exports.default = Cache;