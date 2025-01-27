'use strict';

var addDays = require('../../../../date-fns/addDays.js');
var addMonths = require('../../../../date-fns/addMonths.js');
var addWeeks = require('../../../../date-fns/addWeeks.js');
var addYears = require('../../../../date-fns/addYears.js');
var differenceInCalendarDays = require('../../../../date-fns/differenceInCalendarDays.js');
var differenceInCalendarMonths = require('../../../../date-fns/differenceInCalendarMonths.js');
var endOfISOWeek = require('../../../../date-fns/endOfISOWeek.js');
var endOfMonth = require('../../../../date-fns/endOfMonth.js');
var endOfWeek = require('../../../../date-fns/endOfWeek.js');
var endOfYear = require('../../../../date-fns/endOfYear.js');
var format = require('../../../../date-fns/format.js');
var getISOWeek = require('../../../../date-fns/getISOWeek.js');
var getWeek = require('../../../../date-fns/getWeek.js');
var isAfter = require('../../../../date-fns/isAfter.js');
var isBefore = require('../../../../date-fns/isBefore.js');
var isDate = require('../../../../date-fns/isDate.js');
var isSameDay = require('../../../../date-fns/isSameDay.js');
var isSameMonth = require('../../../../date-fns/isSameMonth.js');
var isSameYear = require('../../../../date-fns/isSameYear.js');
var max = require('../../../../date-fns/max.js');
var min = require('../../../../date-fns/min.js');
var setMonth = require('../../../../date-fns/setMonth.js');
var setYear = require('../../../../date-fns/setYear.js');
var startOfDay = require('../../../../date-fns/startOfDay.js');
var startOfISOWeek = require('../../../../date-fns/startOfISOWeek.js');
var startOfMonth = require('../../../../date-fns/startOfMonth.js');
var startOfWeek = require('../../../../date-fns/startOfWeek.js');
var startOfYear = require('../../../../date-fns/startOfYear.js');

/**
 * The default date library to use with the date picker.
 *
 * @private
 * @internal
 */
const dateLib = {
    /** The constructor of the date object. */
    Date: Date,
    addDays: addDays.addDays,
    addMonths: addMonths.addMonths,
    addWeeks: addWeeks.addWeeks,
    addYears: addYears.addYears,
    differenceInCalendarDays: differenceInCalendarDays.differenceInCalendarDays,
    differenceInCalendarMonths: differenceInCalendarMonths.differenceInCalendarMonths,
    endOfISOWeek: endOfISOWeek.endOfISOWeek,
    endOfMonth: endOfMonth.endOfMonth,
    endOfWeek: endOfWeek.endOfWeek,
    endOfYear: endOfYear.endOfYear,
    format: format.formatDate,
    getISOWeek: getISOWeek.getISOWeek,
    getWeek: getWeek.getWeek,
    isAfter: isAfter.isAfter,
    isBefore: isBefore.isBefore,
    isDate: isDate.isDate,
    isSameDay: isSameDay.isSameDay,
    isSameMonth: isSameMonth.isSameMonth,
    isSameYear: isSameYear.isSameYear,
    max: max.max,
    min: min.min,
    setMonth: setMonth.setMonth,
    setYear: setYear.setYear,
    startOfDay: startOfDay.startOfDay,
    startOfISOWeek: startOfISOWeek.startOfISOWeek,
    startOfMonth: startOfMonth.startOfMonth,
    startOfWeek: startOfWeek.startOfWeek,
    startOfYear: startOfYear.startOfYear
};

exports.dateLib = dateLib;
