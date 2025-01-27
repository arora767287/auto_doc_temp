/** Return the years to show in the dropdown. */
function getYearOptions(displayMonth, calendarStart, calendarEnd, formatters, dateLib) {
    if (!calendarStart)
        return undefined;
    if (!calendarEnd)
        return undefined;
    const { startOfMonth, startOfYear, endOfYear, addYears, isBefore, isSameYear, Date } = dateLib;
    const month = displayMonth.getMonth();
    const firstNavYear = startOfYear(calendarStart);
    const lastNavYear = endOfYear(calendarEnd);
    const years = [];
    let year = firstNavYear;
    while (isBefore(year, lastNavYear) || isSameYear(year, lastNavYear)) {
        years.push(year.getFullYear());
        year = addYears(year, 1);
    }
    return years.map((value) => {
        const disabled = (calendarStart && new Date(value, month) < startOfMonth(calendarStart)) ||
            (month &&
                calendarEnd &&
                new Date(value, month) > startOfMonth(calendarEnd)) ||
            false;
        const label = formatters.formatYearDropdown(value);
        return {
            value,
            label,
            disabled
        };
    });
}

export { getYearOptions };
