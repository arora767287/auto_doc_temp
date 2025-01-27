'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var locale$1 = require('./locale.js');

var locale;
exports.format = void 0;
exports.formatPrefix = void 0;

defaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function defaultLocale(definition) {
  locale = locale$1(definition);
  exports.format = locale.format;
  exports.formatPrefix = locale.formatPrefix;
  return locale;
}

exports.default = defaultLocale;
