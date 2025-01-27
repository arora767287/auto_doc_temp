'use strict';

var useMulti = require('./selection/useMulti.js');
var useRange = require('./selection/useRange.js');
var useSingle = require('./selection/useSingle.js');

function useSelection(props, dateLib) {
    const single = useSingle.useSingle(props, dateLib);
    const multi = useMulti.useMulti(props, dateLib);
    const range = useRange.useRange(props, dateLib);
    switch (props.mode) {
        case "single":
            return single;
        case "multiple":
            return multi;
        case "range":
            return range;
        default:
            return undefined;
    }
}

exports.useSelection = useSelection;
