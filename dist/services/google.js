"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const axiosInstance = _axios2.default.create({
  baseURL: _config.GOOGLE.HOST,
  timeout: 10000
});

const getTimezoneByCoords = async coords => {
  const {
    data
  } = await axiosInstance.get('maps/api/timezone/json', {
    params: {
      location: coords.join(',')
    }
  });
  console.log(data);
  return data;
};

exports.default = getTimezoneByCoords;