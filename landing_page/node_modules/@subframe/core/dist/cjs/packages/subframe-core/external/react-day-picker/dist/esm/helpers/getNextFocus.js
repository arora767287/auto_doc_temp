'use strict';

var CalendarDay = require('../classes/CalendarDay.js');
var dateMatchModifiers = require('../utils/dateMatchModifiers.js');
var getFocusableDate = require('./getFocusableDate.js');

function getNextFocus(moveBy, moveDir, 
/** The date that is currently focused. */
refDay, calendarStartMonth, calendarEndMonth, props, dateLib, attempt = 0) {
    if (attempt > 365) {
        // Limit the recursion to 365 attempts
        return undefined;
    }
    const focusableDate = getFocusableDate.getFocusableDate(moveBy, moveDir, refDay.date, // should be refDay? or refDay.date?
    calendarStartMonth, calendarEndMonth, props, dateLib);
    const isDisabled = Boolean(props.disabled && dateMatchModifiers.dateMatchModifiers(focusableDate, props.disabled, dateLib));
    const isHidden = Boolean(props.hidden && dateMatchModifiers.dateMatchModifiers(focusableDate, props.hidden, dateLib));
    const targetMonth = focusableDate;
    const focusDay = new CalendarDay.CalendarDay(focusableDate, targetMonth, dateLib);
    if (!isDisabled && !isHidden) {
        return focusDay;
    }
    // Recursively attempt to find the next focusable date
    return getNextFocus(moveBy, moveDir, focusDay, calendarStartMonth, calendarEndMonth, props, dateLib, attempt + 1);
}

exports.getNextFocus = getNextFocus;
