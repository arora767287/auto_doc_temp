import React__default from 'react';

/**
 * Render the caption of a month in the calendar.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function MonthCaption(props) {
    const { calendarMonth, displayIndex, ...divProps } = props;
    return React__default.createElement("div", { ...divProps });
}

export { MonthCaption };
