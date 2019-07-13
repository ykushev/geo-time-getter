"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const HOST_DEFAULT = 'https://maps.googleapis.com/';

const getTimezoneByCoords = async ({
  config,
  coords
}) => {
  // @TODO: create once
  const axiosInstance = _axios2.default.create({
    baseURL: config.GOOGLE.HOST || HOST_DEFAULT,
    timeout: 10000
  });

  console.log({
    location: coords.join(','),
    timestamp: Date.now(),
    key: config.GOOGLE.apiKey
  });
  const {
    data
  } = await axiosInstance.get('maps/api/timezone/json', {
    params: {
      location: coords.join(','),
      timestamp: Date.now(),
      key: config.GOOGLE.apiKey
    }
  }).catch(error => {
    console.error('google api error', error);
  });
  return data;
};

exports.default = getTimezoneByCoords;