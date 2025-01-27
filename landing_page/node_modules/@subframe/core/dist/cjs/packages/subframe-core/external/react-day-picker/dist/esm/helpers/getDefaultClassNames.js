'use strict';

var UI = require('../UI.js');

/**
 * Get the default class names for the UI elements.
 *
 * @group Utilities
 */
function getDefaultClassNames() {
    const classNames = {};
    for (const key in UI.UI) {
        classNames[UI.UI[key]] =
            `rdp-${UI.UI[key]}`;
    }
    for (const key in UI.DayFlag) {
        classNames[UI.DayFlag[key]] =
            `rdp-${UI.DayFlag[key]}`;
    }
    for (const key in UI.SelectionState) {
        classNames[UI.SelectionState[key]] =
            `rdp-${UI.SelectionState[key]}`;
    }
    return classNames;
}

exports.getDefaultClassNames = getDefaultClassNames;
