'use strict';

var React = require('react');
var calculateFocusTarget = require('./helpers/calculateFocusTarget.js');
var getNextFocus = require('./helpers/getNextFocus.js');

/** @private */
function useFocus(props, calendar, getModifiers, isSelected, dateLib) {
    const { autoFocus } = props;
    const [lastFocused, setLastFocused] = React.useState();
    const focusTarget = calculateFocusTarget.calculateFocusTarget(calendar.days, getModifiers, isSelected || (() => false), lastFocused);
    const [focusedDay, setFocused] = React.useState(autoFocus ? focusTarget : undefined);
    const blur = () => {
        setLastFocused(focusedDay);
        setFocused(undefined);
    };
    const moveFocus = (moveBy, moveDir) => {
        if (!focusedDay)
            return;
        const nextFocus = getNextFocus.getNextFocus(moveBy, moveDir, focusedDay, calendar.navStart, calendar.navEnd, props, dateLib);
        if (!nextFocus)
            return;
        calendar.goToDay(nextFocus);
        setFocused(nextFocus);
    };
    const isFocusTarget = (day) => {
        return Boolean(focusTarget?.isEqualTo(day));
    };
    const useFocus = {
        isFocusTarget,
        setFocused,
        focused: focusedDay,
        blur,
        moveFocus
    };
    return useFocus;
}

exports.useFocus = useFocus;
