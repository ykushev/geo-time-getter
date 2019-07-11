"use strict";

var _yandex = require("./services/yandex.js");

var _yandex2 = _interopRequireDefault(_yandex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-core/register");

require("babel-polyfill");

const main = async cityName => {
  console.log(cityName);
  const coords = await (0, _yandex2.default)(cityName);
  console.log(coords);
};

main('Novosibirsk');