"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yandex = require("./services/yandex.js");

var _yandex2 = _interopRequireDefault(_yandex);

var _google = require("./services/google.js");

var _google2 = _interopRequireDefault(_google);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-core/register");

require("babel-polyfill");

class geoTimeGetter {
  constructor(config = {}) {
    // @TODO: validator, default values
    this.config = {
      GOOGLE: {},
      YANDEX: {},
      ...config
    };
  }

  async get(cityName) {
    const {
      config
    } = this;
    console.log(cityName);
    const coords = await (0, _yandex2.default)({
      config,
      cityName
    });
    console.log(coords);
    const result = await (0, _google2.default)({
      config,
      coords
    });
    return result;
  }

}

exports.default = geoTimeGetter;