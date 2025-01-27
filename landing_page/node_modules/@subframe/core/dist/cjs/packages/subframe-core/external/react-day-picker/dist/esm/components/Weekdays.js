'use strict';

var React = require('react');

/**
 * Render the row with the weekday names.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Weekdays(props) {
    return (React.createElement("thead", null,
        React.createElement("tr", { ...props })));
}

exports.Weekdays = Weekdays;
