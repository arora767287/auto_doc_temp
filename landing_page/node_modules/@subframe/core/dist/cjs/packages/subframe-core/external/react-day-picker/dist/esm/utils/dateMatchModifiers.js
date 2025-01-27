'use strict';

var rangeIncludesDate = require('./rangeIncludesDate.js');
var typeguards = require('./typeguards.js');

/**
 * Returns whether a day matches against at least one of the given
 * {@link Matcher}.
 *
 * ```tsx
 * const day = new Date(2022, 5, 19);
 * const matcher1: DateRange = {
 *  from: new Date(2021, 12, 21),
 *  to: new Date(2021, 12, 30)
 * }
 * const matcher2: DateRange = {
 *  from: new Date(2022, 5, 1),
 *  to: new Date(2022, 5, 23)
 * }
 * const isMatch(day, [matcher1, matcher2]); // true, since day is in the matcher1 range.
 * ```
 *
 * @group Utilities
 */
function dateMatchModifiers(date, matchers, dateLib) {
    const matchersArr = !Array.isArray(matchers) ? [matchers] : matchers;
    const { isSameDay, differenceInCalendarDays, isAfter } = dateLib;
    return matchersArr.some((matcher) => {
        if (typeof matcher === "boolean") {
            return matcher;
        }
        if (dateLib.isDate(matcher)) {
            return isSameDay(date, matcher);
        }
        if (typeguards.isDatesArray(matcher, dateLib)) {
            return matcher.includes(date);
        }
        if (typeguards.isDateRange(matcher)) {
            return rangeIncludesDate.rangeIncludesDate(matcher, date, false, dateLib);
        }
        if (typeguards.isDayOfWeekType(matcher)) {
            if (!Array.isArray(matcher.dayOfWeek)) {
                return matcher.dayOfWeek === date.getDay();
            }
            return matcher.dayOfWeek.includes(date.getDay());
        }
        if (typeguards.isDateInterval(matcher)) {
            const diffBefore = differenceInCalendarDays(matcher.before, date);
            const diffAfter = differenceInCalendarDays(matcher.after, date);
            const isDayBefore = diffBefore > 0;
            const isDayAfter = diffAfter < 0;
            const isClosedInterval = isAfter(matcher.before, matcher.after);
            if (isClosedInterval) {
                return isDayAfter && isDayBefore;
            }
            else {
                return isDayBefore || isDayAfter;
            }
        }
        if (typeguards.isDateAfterType(matcher)) {
            return differenceInCalendarDays(date, matcher.after) > 0;
        }
        if (typeguards.isDateBeforeType(matcher)) {
            return differenceInCalendarDays(matcher.before, date) > 0;
        }
        if (typeof matcher === "function") {
            return matcher(date);
        }
        return false;
    });
}

exports.dateMatchModifiers = dateMatchModifiers;
