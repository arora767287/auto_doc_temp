'use strict';

/**
 * Format the week number.
 *
 * @defaultValue `weekNumber.toLocaleString()` with a leading zero for single-digit numbers
 * @group Formatters
 * @see https://daypicker.dev/docs/translation#custom-formatters
 */
function formatWeekNumber(weekNumber) {
    if (weekNumber < 10) {
        return `0${weekNumber.toLocaleString()}`;
    }
    return `${weekNumber.toLocaleString()}`;
}

exports.formatWeekNumber = formatWeekNumber;
