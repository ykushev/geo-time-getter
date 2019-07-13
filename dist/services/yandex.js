"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEFAULT_HOST = 'https://geocode-maps.yandex.ru/1.x/';
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
 * @method getCoordsByName - получает координаты из Яндекс Апи по названию
 *
 * @param {String} cityName - название города чьи координаты надо получить
 * 
 * @return {Array.<String>} координаты
 */


const getCoordsByName = async ({
  config,
  cityName
}) => {
  // @TODO: create once
  const axiosInstance = _axios2.default.create({
    baseURL: config.YANDEX.HOST || DEFAULT_HOST,
    timeout: 10000
  });

  const response = await axiosInstance.get('', {
    params: {
      format: 'json',
      geocode: cityName
    }
  });
  return getCoordsFromYandexResponse(response.data.response);
};

exports.default = getCoordsByName;