import { enUS } from '../../../../date-fns/locale/en-US.js';

/**
 * Format the month number for the dropdown option label.
 *
 * @defaultValue The localized month name
 * @group Formatters
 * @see https://daypicker.dev/docs/translation#custom-formatters
 */
function formatMonthDropdown(
/** The month number to format. */
monthNumber, 
/** The locale to use for formatting. */
locale = enUS) {
    return locale.localize?.month(monthNumber);
}

export { formatMonthDropdown };
