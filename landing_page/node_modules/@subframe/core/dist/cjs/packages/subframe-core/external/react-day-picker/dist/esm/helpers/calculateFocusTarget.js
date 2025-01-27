'use strict';

var UI = require('../UI.js');

function calculateFocusTarget(days, getModifiers, isSelected, lastFocused) {
    let focusTarget;
    let index = 0;
    let found = false;
    while (index < days.length && !found) {
        const day = days[index];
        const modifiers = getModifiers(day);
        if (!modifiers[UI.DayFlag.disabled] &&
            !modifiers[UI.DayFlag.hidden] &&
            !modifiers[UI.DayFlag.outside]) {
            if (modifiers[UI.DayFlag.focused]) {
                focusTarget = day;
                found = true;
            }
            else if (lastFocused?.isEqualTo(day)) {
                focusTarget = day;
                found = true;
            }
            else if (isSelected(day.date)) {
                focusTarget = day;
                found = true;
            }
            else if (modifiers[UI.DayFlag.today]) {
                focusTarget = day;
                found = true;
            }
        }
        index++;
    }
    if (!focusTarget) {
        // return the first day that is focusable
        focusTarget = days.find((day) => {
            const m = getModifiers(day);
            return !m[UI.DayFlag.disabled] && !m[UI.DayFlag.hidden] && !m[UI.DayFlag.outside];
        });
    }
    return focusTarget;
}

exports.calculateFocusTarget = calculateFocusTarget;
