'use strict';

var array = require('./array.js');
var constant = require('./constant.js');
var linear = require('./curve/linear.js');
var path = require('./path.js');
var point = require('./point.js');

function shapeLine(x, y) {
  var defined = constant(true),
      context = null,
      curve = linear,
      output = null,
      path$1 = path.withPath(line);

  x = typeof x === "function" ? x : (x === undefined) ? point.x : constant(x);
  y = typeof y === "function" ? y : (y === undefined) ? point.y : constant(y);

  function line(data) {
    var i,
        n = (data = array(data)).length,
        d,
        defined0 = false,
        buffer;

    if (context == null) output = curve(buffer = path$1());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x(d, i, data), +y(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : constant(+_), line) : x;
  };

  line.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : constant(+_), line) : y;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), line) : defined;
  };

  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
}

module.exports = shapeLine;
