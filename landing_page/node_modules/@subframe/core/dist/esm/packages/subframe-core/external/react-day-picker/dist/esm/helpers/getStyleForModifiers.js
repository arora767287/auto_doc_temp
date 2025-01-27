import { UI } from '../UI.js';

function getStyleForModifiers(dayModifiers, styles = {}, modifiersStyles = {}) {
    let style = { ...styles?.[UI.Day] };
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

export { getStyleForModifiers };
