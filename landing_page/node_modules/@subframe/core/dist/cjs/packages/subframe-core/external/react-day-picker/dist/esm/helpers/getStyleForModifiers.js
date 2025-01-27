'use strict';

var UI = require('../UI.js');

function getStyleForModifiers(dayModifiers, styles = {}, modifiersStyles = {}) {
    let style = { ...styles?.[UI.UI.Day] };
    Object.entries(dayModifiers)
        .filter(([, active]) => active === true)
        .forEach(([modifier]) => {
        style = {
            ...style,
            ...modifiersStyles?.[modifier]
        };
    });
    return style;
}

exports.getStyleForModifiers = getStyleForModifiers;
