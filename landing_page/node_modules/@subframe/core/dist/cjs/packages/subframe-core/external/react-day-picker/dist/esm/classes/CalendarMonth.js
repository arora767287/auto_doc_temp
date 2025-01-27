'use strict';

/** Represent a month in a calendar year. Contains the weeks within the month. */
class CalendarMonth {
    constructor(month, weeks) {
        this.date = month;
        this.weeks = weeks;
    }
}

exports.CalendarMonth = CalendarMonth;
