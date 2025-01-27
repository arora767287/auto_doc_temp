'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var differenceInCalendarDays = require('./differenceInCalendarDays.js');
var startOfYear = require('./startOfYear.js');
var toDate = require('./toDate.js');

/**
 * @name getDayOfYear
 * @category Day Helpers
 * @summary Get the day of the year of the given date.
 *
 * @description
 * Get the day of the year of the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 *
 * @returns The day of year
 *
 * @example
 * // Which day of the year is 2 July 2014?
 * const result = getDayOfYear(new Date(2014, 6, 2))
 * //=> 183
 */
function getDayOfYear(date) {
  const _date = toDate.toDate(date);
  const diff = differenceInCalendarDays.differenceInCalendarDays(_date, startOfYear.startOfYear(_date));
  const dayOfYear = diff + 1;
  return dayOfYear;
}

exports.default = getDayOfYear;
exports.getDayOfYear = getDayOfYear;
