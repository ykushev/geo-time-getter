"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _ServiceUnavailable = require("./../errors/ServiceUnavailable");

var _ServiceUnavailable2 = _interopRequireDefault(_ServiceUnavailable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const HOST_DEFAULT = 'https://maps.googleapis.com/';
/**
 * @method getTimezoneByCoords - getting from google
 *
 * @param {Object} config 
 * @param {Array.<String>} coords
 * 
 * @throws {ServiceUnavailable}
 * @return {Object} google response https://developers.google.com/maps/documentation/timezone/intro
 */

const getTimezoneByCoords = async ({
  config,
  coords
}) => {
  // @TODO: create once
  const axiosInstance = _axios2.default.create({
    baseURL: config.GOOGLE.HOST || HOST_DEFAULT,
    timeout: 10000
  });

  try {
    const {
      data
    } = await axiosInstance.get('maps/api/timezone/json', {
      params: {
        location: coords.join(','),
        timestamp: Date.now() / 1000,
        key: config.GOOGLE.apiKey
      }
    });
    return data;
  } catch (error) {
    throw new _ServiceUnavailable2.default(error);
  }
};

exports.default = getTimezoneByCoords;