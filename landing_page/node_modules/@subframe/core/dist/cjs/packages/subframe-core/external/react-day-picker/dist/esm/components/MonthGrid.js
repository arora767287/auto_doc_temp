'use strict';

var React = require('react');

/**
 * Render the grid of days in a month.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function MonthGrid(props) {
    return React.createElement("table", { ...props });
}

exports.MonthGrid = MonthGrid;
