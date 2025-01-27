'use strict';

var dateLib = require('../lib/dateLib.js');

/**
 * Determines whether a given date is inside a specified date range.
 *
 * @since 9.0.0
 * @group Utilities
 */
function rangeIncludesDate(range, date, 
/** If `true`, the ends of the range are excluded. */
excludeEnds = false, 
/** @ignore */
dateLib$1 = dateLib.dateLib) {
    let { from, to } = range;
    const { differenceInCalendarDays, isSameDay } = dateLib$1;
    if (from && to) {
        const isRangeInverted = differenceInCalendarDays(to, from) < 0;
        if (isRangeInverted) {
            [from, to] = [to, from];
        }
        const isInRange = differenceInCalendarDays(date, from) >= (excludeEnds ? 1 : 0) &&
            differenceInCalendarDays(to, date) >= (excludeEnds ? 1 : 0);
        return isInRange;
    }
    if (!excludeEnds && to) {
        return isSameDay(to, date);
    }
    if (!excludeEnds && from) {
        return isSameDay(from, date);
    }
    return false;
}

exports.rangeIncludesDate = rangeIncludesDate;
