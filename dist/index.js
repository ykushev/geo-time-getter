"use strict";

var _yandex = require("./services/yandex.js");

var _yandex2 = _interopRequireDefault(_yandex);

var _google = require("./services/google.js");

var _google2 = _interopRequireDefault(_google);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-core/register");

require("babel-polyfill");

const main = async cityName => {
  console.log(cityName);
  const coords = await (0, _yandex2.default)(cityName);
  console.log(coords);
  const result = (0, _google2.default)(coords);
};

main('Novosibirsk');