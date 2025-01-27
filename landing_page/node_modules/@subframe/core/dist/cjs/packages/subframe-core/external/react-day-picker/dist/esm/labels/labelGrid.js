'use strict';

var dateLib = require('../lib/dateLib.js');

/**
 * Return an ARIA label for the month grid, that will be announced when entering
 * the grid.
 *
 * @defaultValue `LLLL y` (e.g. "November 2022")
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */
function labelGrid(date, options, 
/** @ignore */
dateLib$1 = dateLib.dateLib) {
    return dateLib$1.format(date, "LLLL y", options);
}
/**
 * @deprecated Use {@link labelGrid} instead.
 * @protected
 */
const labelCaption = labelGrid;

exports.labelCaption = labelCaption;
exports.labelGrid = labelGrid;
