'use strict';

var dateLib = require('../lib/dateLib.js');

/**
 * Generate a series of 7 days, starting from the week, to use for formatting
 * the weekday names (Monday, Tuesday, etc.).
 */
function getWeekdays(locale, 
/** The index of the first day of the week (0 - Sunday). */
weekStartsOn, 
/** Use ISOWeek instead of locale/ */
ISOWeek, 
/** @ignore */
dateLib$1 = dateLib.dateLib) {
    const start = ISOWeek
        ? dateLib$1.startOfISOWeek(new dateLib$1.Date())
        : dateLib$1.startOfWeek(new dateLib$1.Date(), { locale, weekStartsOn });
    const days = [];
    for (let i = 0; i < 7; i++) {
        const day = dateLib$1.addDays(start, i);
        days.push(day);
    }
    return days;
}

exports.getWeekdays = getWeekdays;
