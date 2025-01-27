import * as React from 'react';
import { Primitive } from '../../react-primitive/dist/index.js';
import { jsx } from 'react/jsx-runtime';

// packages/react/arrow/src/Arrow.tsx
var NAME = "Arrow";
var Arrow = React.forwardRef((props, forwardedRef) => {
  const { children, width = 10, height = 5, ...arrowProps } = props;
  return /* @__PURE__ */ jsx(
    Primitive.svg,
    {
      ...arrowProps,
      ref: forwardedRef,
      width,
      height,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: props.asChild ? children : /* @__PURE__ */ jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
Arrow.displayName = NAME;
var Root = Arrow;

export { Arrow, Root };
