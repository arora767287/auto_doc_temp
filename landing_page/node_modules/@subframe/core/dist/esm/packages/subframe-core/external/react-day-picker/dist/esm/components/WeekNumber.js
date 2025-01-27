import React__default from 'react';

/**
 * Render the cell with the number of the week.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function WeekNumber(props) {
    const { week, ...tdProps } = props;
    return React__default.createElement("td", { ...tdProps });
}

export { WeekNumber };
