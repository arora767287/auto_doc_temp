import { dateLib } from '../lib/dateLib.js';

/**
 * Format the caption of the month.
 *
 * @defaultValue `LLLL y` (e.g. "November 2022")
 * @group Formatters
 * @see https://daypicker.dev/docs/translation#custom-formatters
 */
function formatCaption(month, options, 
/** @ignore */
dateLib$1 = dateLib) {
    return dateLib$1.format(month, "LLLL y", options);
}
/**
 * @private
 * @deprecated Use {@link formatCaption} instead.
 * @group Formatters
 */
const formatMonthCaption = formatCaption;

export { formatCaption, formatMonthCaption };
