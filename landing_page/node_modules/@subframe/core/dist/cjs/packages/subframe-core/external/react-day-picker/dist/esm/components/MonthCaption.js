'use strict';

var React = require('react');

/**
 * Render the caption of a month in the calendar.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function MonthCaption(props) {
    const { calendarMonth, displayIndex, ...divProps } = props;
    return React.createElement("div", { ...divProps });
}

exports.MonthCaption = MonthCaption;
