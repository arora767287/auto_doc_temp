'use strict';

/** Return the start month based on the props passed to DayPicker. */
function getInitialMonth(props, dateLib) {
    const { month, defaultMonth, today = new dateLib.Date(), numberOfMonths = 1, endMonth, startMonth } = props;
    let initialMonth = month || defaultMonth || today;
    const { differenceInCalendarMonths, addMonths, startOfMonth } = dateLib;
    // Fix the initialMonth if is after the to-date
    if (endMonth && differenceInCalendarMonths(endMonth, initialMonth) < 0) {
        const offset = -1 * (numberOfMonths - 1);
        initialMonth = addMonths(endMonth, offset);
    }
    // Fix the initialMonth if is before the from-date
    if (startMonth && differenceInCalendarMonths(initialMonth, startMonth) < 0) {
        initialMonth = startMonth;
    }
    return startOfMonth(initialMonth);
}

exports.getInitialMonth = getInitialMonth;
