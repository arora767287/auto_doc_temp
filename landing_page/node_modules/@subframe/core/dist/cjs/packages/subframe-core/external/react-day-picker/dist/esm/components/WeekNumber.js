'use strict';

var React = require('react');

/**
 * Render the cell with the number of the week.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function WeekNumber(props) {
    const { week, ...tdProps } = props;
    return React.createElement("td", { ...tdProps });
}

exports.WeekNumber = WeekNumber;
