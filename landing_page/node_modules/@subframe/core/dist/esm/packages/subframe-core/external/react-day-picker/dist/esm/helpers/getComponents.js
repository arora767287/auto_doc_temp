import * as customComponents from '../components/custom-components.js';

function getComponents(customComponents$1) {
    return {
        ...customComponents,
        ...customComponents$1
    };
}

export { getComponents };
