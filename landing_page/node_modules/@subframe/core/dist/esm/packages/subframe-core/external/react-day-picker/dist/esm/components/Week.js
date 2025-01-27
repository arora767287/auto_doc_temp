import React__default from 'react';

/**
 * Render a row in the calendar, with the days and the week number.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
function Week(props) {
    const { week, ...trProps } = props;
    return React__default.createElement("tr", { ...trProps });
}

export { Week };
