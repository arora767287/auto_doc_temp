'use strict';

/** Represent a week in a calendar month. */
class CalendarWeek {
    constructor(weekNumber, days) {
        this.days = days;
        this.weekNumber = weekNumber;
    }
}

exports.CalendarWeek = CalendarWeek;
