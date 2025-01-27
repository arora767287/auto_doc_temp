'use strict';

var React = require('react');

/**
 * Render the root element.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Root(props) {
    return React.createElement("div", { ...props });
}

exports.Root = Root;
