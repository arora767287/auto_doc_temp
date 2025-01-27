'use strict';

var dateLib = require('../lib/dateLib.js');

function getDateLib(customLib) {
    return {
        ...dateLib.dateLib,
        ...customLib
    };
}

exports.getDateLib = getDateLib;
