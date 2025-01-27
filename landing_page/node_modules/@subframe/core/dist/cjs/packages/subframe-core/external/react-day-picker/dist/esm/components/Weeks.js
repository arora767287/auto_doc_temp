'use strict';

var React = require('react');

/**
 * Render the weeks in the month grid.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Weeks(props) {
    return React.createElement("tbody", { ...props });
}

exports.Weeks = Weeks;
