'use strict';

var dateLib = require('../lib/dateLib.js');

/**
 * Format the weekday name to be displayed in the weekdays header.
 *
 * @defaultValue `cccccc` (e.g. "Mo" for Monday)
 * @group Formatters
 * @see https://daypicker.dev/docs/translation#custom-formatters
 */
function formatWeekdayName(weekday, options, 
/** @ignore */
dateLib$1 = dateLib.dateLib) {
    return dateLib$1.format(weekday, "cccccc", options);
}

exports.formatWeekdayName = formatWeekdayName;
