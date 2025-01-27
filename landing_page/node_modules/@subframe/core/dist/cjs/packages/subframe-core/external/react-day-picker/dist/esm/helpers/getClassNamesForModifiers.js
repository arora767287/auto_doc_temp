'use strict';

var UI = require('../UI.js');

function getClassNamesForModifiers(modifiers, classNames, modifiersClassNames = {}) {
    const modifierClassNames = Object.entries(modifiers)
        .filter(([, active]) => active === true)
        .reduce((previousValue, [key]) => {
        if (modifiersClassNames[key]) {
            previousValue.push(modifiersClassNames[key]);
        }
        else if (classNames[UI.DayFlag[key]]) {
            previousValue.push(classNames[UI.DayFlag[key]]);
        }
        else if (classNames[UI.SelectionState[key]]) {
            previousValue.push(classNames[UI.SelectionState[key]]);
        }
        return previousValue;
    }, [classNames[UI.UI.Day]]);
    return modifierClassNames;
}

exports.getClassNamesForModifiers = getClassNamesForModifiers;
