'use strict';

var React = require('react');

/**
 * Render the grid with the weekday header row and the weeks for the given
 * month.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Month(props) {
    const { calendarMonth, displayIndex, ...divProps } = props;
    return React.createElement("div", { ...divProps }, props.children);
}

exports.Month = Month;
