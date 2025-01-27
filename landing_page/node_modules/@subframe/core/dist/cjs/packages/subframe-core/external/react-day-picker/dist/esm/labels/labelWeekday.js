'use strict';

var dateLib = require('../lib/dateLib.js');

/**
 * The ARIA label for the Weekday column header.
 *
 * @defaultValue `"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"`
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */
function labelWeekday(date, options, 
/** @ignore */
dateLib$1 = dateLib.dateLib) {
    return dateLib$1.format(date, "cccc", options);
}

exports.labelWeekday = labelWeekday;
