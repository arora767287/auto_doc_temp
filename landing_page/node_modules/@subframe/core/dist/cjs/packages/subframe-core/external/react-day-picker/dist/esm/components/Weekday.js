'use strict';

var React = require('react');

/**
 * Render the column header with the weekday name (e.g. "Mo", "Tu", etc.).
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Weekday(props) {
    return React.createElement("th", { ...props });
}

exports.Weekday = Weekday;
