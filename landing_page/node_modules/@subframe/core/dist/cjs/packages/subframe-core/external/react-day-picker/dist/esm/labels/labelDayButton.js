'use strict';

var dateLib = require('../lib/dateLib.js');

/**
 * The ARIA label for the day button.
 *
 * Use the `modifiers` argument to add additional context to the label, e.g.
 * when a day is selected or is today.
 *
 * @defaultValue The formatted date.
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */
function labelDayButton(date, 
/** The modifiers for the day. */
modifiers, options, 
/** @ignore */
dateLib$1 = dateLib.dateLib) {
    let label = dateLib$1.format(date, "PPPP", options);
    if (modifiers.today)
        label = `Today, ${label}`;
    if (modifiers.selected)
        label = `${label}, selected`;
    return label;
}
/** @deprecated Use `labelDayButton` instead. */
const labelDay = labelDayButton;

exports.labelDay = labelDay;
exports.labelDayButton = labelDayButton;
