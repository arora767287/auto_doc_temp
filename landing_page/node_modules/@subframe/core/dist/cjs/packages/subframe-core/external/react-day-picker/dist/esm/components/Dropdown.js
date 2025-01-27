'use strict';

var React = require('react');
var UI = require('../UI.js');

/**
 * Render a dropdown component to use in the navigation bar.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Dropdown(props) {
    const { options, className, components, classNames, ...selectProps } = props;
    const cssClassSelect = [classNames[UI.UI.Dropdown], className].join(" ");
    const selectedOption = options?.find(({ value }) => value === selectProps.value);
    return (React.createElement("span", { "data-disabled": selectProps.disabled, className: classNames[UI.UI.DropdownRoot] },
        React.createElement(components.Select, { className: cssClassSelect, ...selectProps }, options?.map(({ value, label, disabled }) => (React.createElement(components.Option, { key: value, value: value, disabled: disabled }, label)))),
        React.createElement("span", { className: classNames[UI.UI.CaptionLabel], "aria-hidden": true },
            selectedOption?.label,
            React.createElement(components.Chevron, { orientation: "down", size: 18, className: classNames[UI.UI.Chevron] }))));
}

exports.Dropdown = Dropdown;
