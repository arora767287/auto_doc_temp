import { dateLib } from '../lib/dateLib.js';

function getDateLib(customLib) {
    return {
        ...dateLib,
        ...customLib
    };
}

export { getDateLib };
