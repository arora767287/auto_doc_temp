'use strict';

var React = require('react');

/**
 * Render a row in the calendar, with the days and the week number.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Week(props) {
    const { week, ...trProps } = props;
    return React.createElement("tr", { ...trProps });
}

exports.Week = Week;
