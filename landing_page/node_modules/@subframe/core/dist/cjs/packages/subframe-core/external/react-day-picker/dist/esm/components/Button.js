'use strict';

var React = require('react');

/**
 * Render the button elements in the calendar.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Button(props) {
    return React.createElement("button", { ...props });
}

exports.Button = Button;
