import * as index from '../formatters/index.js';

/** Return the formatters from the props merged with the default formatters. */
function getFormatters(customFormatters) {
    if (customFormatters?.formatMonthCaption && !customFormatters.formatCaption) {
        customFormatters.formatCaption = customFormatters.formatMonthCaption;
    }
    if (customFormatters?.formatYearCaption &&
        !customFormatters.formatYearDropdown) {
        customFormatters.formatYearDropdown = customFormatters.formatYearCaption;
    }
    return {
        ...index,
        ...customFormatters
    };
}

export { getFormatters };
