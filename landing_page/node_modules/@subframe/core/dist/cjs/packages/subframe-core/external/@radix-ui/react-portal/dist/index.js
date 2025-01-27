"use client";
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var index$1 = require('../../react-primitive/dist/index.js');
var index = require('../../react-use-layout-effect/dist/index.js');
var jsxRuntime = require('react/jsx-runtime');

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

var PORTAL_NAME = "Portal";
var Portal = React__namespace.forwardRef((props, forwardedRef) => {
  const { container: containerProp, ...portalProps } = props;
  const [mounted, setMounted] = React__namespace.useState(false);
  index.useLayoutEffect(() => setMounted(true), []);
  const container = containerProp || mounted && globalThis?.document?.body;
  return container ? ReactDOM.createPortal(/* @__PURE__ */ jsxRuntime.jsx(index$1.Primitive.div, { ...portalProps, ref: forwardedRef }), container) : null;
});
Portal.displayName = PORTAL_NAME;

exports.Portal = Portal;
