import React__default from 'react';
import { UI } from '../UI.js';

/**
 * Render a dropdown component to use in the navigation bar.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Dropdown(props) {
    const { options, className, components, classNames, ...selectProps } = props;
    const cssClassSelect = [classNames[UI.Dropdown], className].join(" ");
    const selectedOption = options?.find(({ value }) => value === selectProps.value);
    return (React__default.createElement("span", { "data-disabled": selectProps.disabled, className: classNames[UI.DropdownRoot] },
        React__default.createElement(components.Select, { className: cssClassSelect, ...selectProps }, options?.map(({ value, label, disabled }) => (React__default.createElement(components.Option, { key: value, value: value, disabled: disabled }, label)))),
        React__default.createElement("span", { className: classNames[UI.CaptionLabel], "aria-hidden": true },
            selectedOption?.label,
            React__default.createElement(components.Chevron, { orientation: "down", size: 18, className: classNames[UI.Chevron] }))));
}

export { Dropdown };
