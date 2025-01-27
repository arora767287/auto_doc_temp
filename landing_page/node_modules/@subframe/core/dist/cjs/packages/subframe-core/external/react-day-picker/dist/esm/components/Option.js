'use strict';

var React = require('react');

/**
 * Render the `option` element.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Option(props) {
    return React.createElement("option", { ...props });
}

exports.Option = Option;
