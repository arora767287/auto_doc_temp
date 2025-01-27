import React__default from 'react';

/**
 * Render the button for a day in the calendar.
 *
 * When not interactive, DayPicker will render a `DayContent` component instead
 * of a `DayButton` component.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function DayButton(props) {
    const { day, modifiers, ...buttonProps } = props;
    const ref = React__default.useRef(null);
    React__default.useEffect(() => {
        if (modifiers.focused)
            ref.current?.focus();
    }, [modifiers.focused]);
    return React__default.createElement("button", { ref: ref, ...buttonProps });
}

export { DayButton };
