'use strict';

var math = require('../math.js');

const tan30 = math.sqrt(1 / 3);
const tan30_2 = tan30 * 2;

var symbolDiamond = {
  draw(context, size) {
    const y = math.sqrt(size / tan30_2);
    const x = y * tan30;
    context.moveTo(0, -y);
    context.lineTo(x, 0);
    context.lineTo(0, y);
    context.lineTo(-x, 0);
    context.closePath();
  }
};

module.exports = symbolDiamond;
