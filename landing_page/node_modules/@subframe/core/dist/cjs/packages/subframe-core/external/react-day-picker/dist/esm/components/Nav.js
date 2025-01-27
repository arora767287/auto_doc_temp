'use strict';

var React = require('react');

/**
 * Render the toolbar with the navigation button.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Nav(props) {
    return React.createElement("nav", { ...props });
}

exports.Nav = Nav;
