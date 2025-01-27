"use client";
import * as React from 'react';
import ReactDOM__default from 'react-dom';
import { Primitive } from '../../react-primitive/dist/index.js';
import { useLayoutEffect as useLayoutEffect2 } from '../../react-use-layout-effect/dist/index.js';
import { jsx } from 'react/jsx-runtime';

var PORTAL_NAME = "Portal";
var Portal = React.forwardRef((props, forwardedRef) => {
  const { container: containerProp, ...portalProps } = props;
  const [mounted, setMounted] = React.useState(false);
  useLayoutEffect2(() => setMounted(true), []);
  const container = containerProp || mounted && globalThis?.document?.body;
  return container ? ReactDOM__default.createPortal(/* @__PURE__ */ jsx(Primitive.div, { ...portalProps, ref: forwardedRef }), container) : null;
});
Portal.displayName = PORTAL_NAME;

export { Portal };
