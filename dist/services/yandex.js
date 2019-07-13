"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const axiosInstance = _axios2.default.create({
  baseURL: _config.YANDEX.HOST,
  timeout: 10000
});
/**
 * @method getCoordsFromYandexResponse - Достаёт координаты из http ответа яндекса
 * @private
 * 
 * @param {Object} yandexRes - объект http ответа яндекса
 *
 * @return {Array.<String>} Массив координат
 */


const getCoordsFromYandexResponse = yandexRes => {
  if (!yandexRes.GeoObjectCollection || !yandexRes.GeoObjectCollection.featureMember) {
    throw new Error();
  }

  const firstRes = yandexRes.GeoObjectCollection.featureMember[0];

  if (!firstRes || !firstRes.GeoObject || !firstRes.GeoObject.Point || !firstRes.GeoObject.Point.pos) {
    throw new Error();
  }

  const coords = firstRes.GeoObject.Point.pos.split(' ');
  return coords;
};
/**
 * @method getCoords - получает координаты из Яндекс Апи по названию
 *
 * @param {String} cityName - название города чьи координаты надо получить
 * 
 * @return {Array.<String>} координаты
 */


const getCoords = async cityName => {
  const response = await axiosInstance.get('', {
    params: {
      format: 'json',
      geocode: cityName
    }
  });
  return getCoordsFromYandexResponse(response.data.response);
};

exports.default = getCoords;