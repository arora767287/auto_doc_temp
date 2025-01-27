/**
 * Format the years for the dropdown option label.
 *
 * @defaultValue `year.toString()`
 * @group Formatters
 * @see https://daypicker.dev/docs/translation#custom-formatters
 */
function formatYearDropdown(year) {
    return year.toString();
}
/**
 * @private
 * @deprecated Use `formatYearDropdown` instead.
 * @group Formatters
 */
const formatYearCaption = formatYearDropdown;

export { formatYearCaption, formatYearDropdown };
