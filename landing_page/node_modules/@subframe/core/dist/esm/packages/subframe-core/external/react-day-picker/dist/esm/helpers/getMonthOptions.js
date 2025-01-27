/** Return the months to show in the dropdown. */
function getMonthOptions(displayMonth, navStart, navEnd, formatters, locale, dateLib) {
    if (!navStart)
        return undefined;
    if (!navEnd)
        return undefined;
    const { addMonths, startOfMonth, isBefore, Date } = dateLib;
    const year = displayMonth.getFullYear();
    const months = [];
    let month = navStart;
    while (months.length < 12 && isBefore(month, addMonths(navEnd, 1))) {
        months.push(month.getMonth());
        month = addMonths(month, 1);
    }
    const sortedMonths = months.sort((a, b) => {
        return a - b;
    });
    const options = sortedMonths.map((value) => {
        const label = formatters.formatMonthDropdown(value, locale);
        const disabled = (navStart && new Date(year, value) < startOfMonth(navStart)) ||
            (navEnd && new Date(year, value) > startOfMonth(navEnd)) ||
            false;
        return { value, label, disabled };
    });
    return options;
}

export { getMonthOptions };
