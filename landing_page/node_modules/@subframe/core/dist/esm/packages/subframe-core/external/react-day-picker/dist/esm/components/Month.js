import React__default from 'react';

/**
 * Render the grid with the weekday header row and the weeks for the given
 * month.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Month(props) {
    const { calendarMonth, displayIndex, ...divProps } = props;
    return React__default.createElement("div", { ...divProps }, props.children);
}

export { Month };
