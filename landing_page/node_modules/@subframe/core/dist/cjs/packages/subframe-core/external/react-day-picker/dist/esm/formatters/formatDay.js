'use strict';

var dateLib = require('../lib/dateLib.js');

/**
 * Format the day date shown in the day cell.
 *
 * @defaultValue `d` (e.g. "1")
 * @group Formatters
 * @see https://daypicker.dev/docs/translation#custom-formatters
 */
function formatDay(date, options, 
/** @ignore */
dateLib$1 = dateLib.dateLib) {
    return dateLib$1.format(date, "d", options);
}

exports.formatDay = formatDay;
