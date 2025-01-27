'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var formatDistance = require('./en-US/_lib/formatDistance.js');
var formatLong = require('./en-US/_lib/formatLong.js');
var formatRelative = require('./en-US/_lib/formatRelative.js');
var localize = require('./en-US/_lib/localize.js');
var match = require('./en-US/_lib/match.js');

/**
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp](https://github.com/kossnocorp)
 * @author Lesha Koss [@leshakoss](https://github.com/leshakoss)
 */
const enUS = {
  code: "en-US",
  formatDistance: formatDistance.formatDistance,
  formatLong: formatLong.formatLong,
  formatRelative: formatRelative.formatRelative,
  localize: localize.localize,
  match: match.match,
  options: {
    weekStartsOn: 0 /* Sunday */,
    firstWeekContainsDate: 1,
  },
};

exports.default = enUS;
exports.enUS = enUS;
