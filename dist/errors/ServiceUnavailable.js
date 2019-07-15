"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

class ServiceUnavailable extends Error {
  constructor(error) {
    if (error.code) {
      this.code = error.code;
    }

    super(error);
  }

}

exports.default = ServiceUnavailable;