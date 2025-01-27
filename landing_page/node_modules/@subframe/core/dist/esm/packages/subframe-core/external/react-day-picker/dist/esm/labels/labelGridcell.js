import { dateLib } from '../lib/dateLib.js';

/**
 * The label for the day gridcell when the calendar is not interactive.
 *
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */
function labelGridcell(date, 
/** The modifiers for the day. */
modifiers, options, 
/** @ignore */
dateLib$1 = dateLib) {
    let label = dateLib$1.format(date, "PPPP", options);
    if (modifiers?.today) {
        label = `Today, ${label}`;
    }
    return label;
}

export { labelGridcell };
