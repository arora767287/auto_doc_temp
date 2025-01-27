'use strict';

var React = require('react');

/**
 * Render the column header for the week numbers.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function WeekNumberHeader(props) {
    return React.createElement("th", { ...props });
}

exports.WeekNumberHeader = WeekNumberHeader;
