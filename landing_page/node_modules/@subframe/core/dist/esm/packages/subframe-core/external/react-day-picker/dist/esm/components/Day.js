import React__default from 'react';

/**
 * Render the gridcell of a day in the calendar and handle the interaction and
 * the focus with they day.
 *
 * If you need to just change the content of the day cell, consider swapping the
 * `DayDate` component instead.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Day(props) {
    const { day, modifiers, ...tdProps } = props;
    return React__default.createElement("td", { ...tdProps });
}

export { Day };
