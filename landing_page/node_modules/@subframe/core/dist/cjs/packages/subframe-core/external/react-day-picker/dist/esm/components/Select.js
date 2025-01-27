'use strict';

var React = require('react');

/**
 * Render the `select` element.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Select(props) {
    return React.createElement("select", { ...props });
}

exports.Select = Select;
