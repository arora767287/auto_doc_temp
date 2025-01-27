'use strict';

var customComponents = require('../components/custom-components.js');

function getComponents(customComponents$1) {
    return {
        ...customComponents,
        ...customComponents$1
    };
}

exports.getComponents = getComponents;
