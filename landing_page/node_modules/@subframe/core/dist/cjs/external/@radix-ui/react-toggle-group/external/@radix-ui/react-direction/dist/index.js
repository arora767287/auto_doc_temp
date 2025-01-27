'use strict';

var React = require('react');
require('react/jsx-runtime');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

// packages/react/direction/src/Direction.tsx
var DirectionContext = React__namespace.createContext(void 0);
function useDirection(localDir) {
  const globalDir = React__namespace.useContext(DirectionContext);
  return localDir || globalDir || "ltr";
}

exports.useDirection = useDirection;
