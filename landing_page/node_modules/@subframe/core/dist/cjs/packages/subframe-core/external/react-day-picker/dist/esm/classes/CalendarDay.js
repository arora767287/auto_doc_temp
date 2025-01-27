'use strict';

var dateLib = require('../lib/dateLib.js');

/**
 * Represent the day displayed in the calendar.
 *
 * In DayPicker, a `Day` is a `Date` that can be displayed in the calendar. It
 * is used as extension of the native `Date` object to provide additional
 * information about the day.
 */
class CalendarDay {
    constructor(date, displayMonth, 
    /** @ignore */
    dateLib$1 = dateLib.dateLib) {
        this.date = date;
        this.displayMonth = displayMonth;
        this.outside = Boolean(displayMonth && !dateLib$1.isSameMonth(date, displayMonth));
        this.dateLib = dateLib$1;
    }
    /**
     * Check if the day is the same as the given day: considering if it is in the
     * same display month.
     */
    isEqualTo(day) {
        return (this.dateLib.isSameDay(day.date, this.date) &&
            this.dateLib.isSameMonth(day.displayMonth, this.displayMonth));
    }
}

exports.CalendarDay = CalendarDay;
