'use strict';

var React = require('react');

/**
 * Render the label in the month caption.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function CaptionLabel(props) {
    return React.createElement("span", { ...props });
}

exports.CaptionLabel = CaptionLabel;
