'use strict';

/** Return the start and end months for the calendar navigation. */
function getNavMonths(props, dateLib) {
    let { startMonth, endMonth } = props;
    const { startOfYear, startOfDay, startOfMonth, endOfMonth, addYears, endOfYear, Date } = dateLib;
    // Handle deprecated code
    const { fromYear, toYear, fromMonth, toMonth } = props;
    if (!startMonth && fromMonth) {
        startMonth = fromMonth;
    }
    if (!startMonth && fromYear) {
        startMonth = new Date(fromYear, 0, 1);
    }
    if (!endMonth && toMonth) {
        endMonth = toMonth;
    }
    if (!endMonth && toYear) {
        endMonth = new Date(toYear, 11, 31);
    }
    const hasDropdowns = props.captionLayout?.startsWith("dropdown");
    if (startMonth) {
        startMonth = startOfMonth(startMonth);
    }
    else if (fromYear) {
        startMonth = new Date(fromYear, 0, 1);
    }
    else if (!startMonth && hasDropdowns) {
        startMonth = startOfYear(addYears(props.today ?? new Date(), -100));
    }
    if (endMonth) {
        endMonth = endOfMonth(endMonth);
    }
    else if (toYear) {
        endMonth = new Date(toYear, 11, 31);
    }
    else if (!endMonth && hasDropdowns) {
        endMonth = endOfYear(props.today ?? new Date());
    }
    return [
        startMonth ? startOfDay(startMonth) : startMonth,
        endMonth ? startOfDay(endMonth) : endMonth
    ];
}

exports.getNavMonths = getNavMonths;
