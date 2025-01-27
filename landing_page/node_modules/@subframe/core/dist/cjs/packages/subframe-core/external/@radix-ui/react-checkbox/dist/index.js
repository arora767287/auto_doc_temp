"use client";
'use strict';

var React = require('react');
var index$1 = require('../../react-compose-refs/dist/index.js');
var index = require('../../react-context/dist/index.js');
var index$4 = require('../../primitive/dist/index.js');
var index$2 = require('../../react-use-controllable-state/dist/index.js');
var index$6 = require('../../react-use-previous/dist/index.js');
var index$7 = require('../../react-use-size/dist/index.js');
var index$5 = require('../../react-presence/dist/index.js');
var index$3 = require('../../react-primitive/dist/index.js');
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

var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext, createCheckboxScope] = index.createContextScope(CHECKBOX_NAME);
var [CheckboxProvider, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
var Checkbox = React__namespace.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    const [button, setButton] = React__namespace.useState(null);
    const composedRefs = index$1.useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = React__namespace.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked = false, setChecked] = index$2.useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked,
      onChange: onCheckedChange
    });
    const initialCheckedStateRef = React__namespace.useRef(checked);
    React__namespace.useEffect(() => {
      const form2 = button?.form;
      if (form2) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form2.addEventListener("reset", reset);
        return () => form2.removeEventListener("reset", reset);
      }
    }, [button, setChecked]);
    return /* @__PURE__ */ jsxRuntime.jsxs(CheckboxProvider, { scope: __scopeCheckbox, state: checked, disabled, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        index$3.Primitive.button,
        {
          type: "button",
          role: "checkbox",
          "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...checkboxProps,
          ref: composedRefs,
          onKeyDown: index$4.composeEventHandlers(props.onKeyDown, (event) => {
            if (event.key === "Enter") event.preventDefault();
          }),
          onClick: index$4.composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntime.jsx(
        BubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" },
          defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked
        }
      )
    ] });
  }
);
Checkbox.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = React__namespace.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntime.jsx(index$5.Presence, { present: forceMount || isIndeterminate(context.state) || context.state === true, children: /* @__PURE__ */ jsxRuntime.jsx(
      index$3.Primitive.span,
      {
        "data-state": getState(context.state),
        "data-disabled": context.disabled ? "" : void 0,
        ...indicatorProps,
        ref: forwardedRef,
        style: { pointerEvents: "none", ...props.style }
      }
    ) });
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BubbleInput = (props) => {
  const { control, checked, bubbles = true, defaultChecked, ...inputProps } = props;
  const ref = React__namespace.useRef(null);
  const prevChecked = index$6.usePrevious(checked);
  const controlSize = index$7.useSize(control);
  React__namespace.useEffect(() => {
    const input = ref.current;
    const inputProto = window.HTMLInputElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(inputProto, "checked");
    const setChecked = descriptor.set;
    if (prevChecked !== checked && setChecked) {
      const event = new Event("click", { bubbles });
      input.indeterminate = isIndeterminate(checked);
      setChecked.call(input, isIndeterminate(checked) ? false : checked);
      input.dispatchEvent(event);
    }
  }, [prevChecked, checked, bubbles]);
  const defaultCheckedRef = React__namespace.useRef(isIndeterminate(checked) ? false : checked);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "input",
    {
      type: "checkbox",
      "aria-hidden": true,
      defaultChecked: defaultChecked ?? defaultCheckedRef.current,
      ...inputProps,
      tabIndex: -1,
      ref,
      style: {
        ...props.style,
        ...controlSize,
        position: "absolute",
        pointerEvents: "none",
        opacity: 0,
        margin: 0
      }
    }
  );
};
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
var Root = Checkbox;
var Indicator = CheckboxIndicator;

exports.Checkbox = Checkbox;
exports.CheckboxIndicator = CheckboxIndicator;
exports.Indicator = Indicator;
exports.Root = Root;
exports.createCheckboxScope = createCheckboxScope;
