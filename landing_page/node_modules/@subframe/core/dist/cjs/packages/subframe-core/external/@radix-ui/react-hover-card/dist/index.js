"use client";
'use strict';

var React = require('react');
var index$4 = require('../../primitive/dist/index.js');
var index = require('../../react-context/dist/index.js');
var index$2 = require('../../react-use-controllable-state/dist/index.js');
var index$7 = require('../../react-compose-refs/dist/index.js');
var index$1 = require('../../react-popper/dist/index.js');
var index$6 = require('../../react-portal/dist/index.js');
var index$5 = require('../../react-presence/dist/index.js');
var index$3 = require('../../react-primitive/dist/index.js');
var index$8 = require('../../react-dismissable-layer/dist/index.js');
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

var originalBodyUserSelect;
var HOVERCARD_NAME = "HoverCard";
var [createHoverCardContext, createHoverCardScope] = index.createContextScope(HOVERCARD_NAME, [
  index$1.createPopperScope
]);
var usePopperScope = index$1.createPopperScope();
var [HoverCardProvider, useHoverCardContext] = createHoverCardContext(HOVERCARD_NAME);
var HoverCard = (props) => {
  const {
    __scopeHoverCard,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    openDelay = 700,
    closeDelay = 300
  } = props;
  const popperScope = usePopperScope(__scopeHoverCard);
  const openTimerRef = React__namespace.useRef(0);
  const closeTimerRef = React__namespace.useRef(0);
  const hasSelectionRef = React__namespace.useRef(false);
  const isPointerDownOnContentRef = React__namespace.useRef(false);
  const [open = false, setOpen] = index$2.useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange
  });
  const handleOpen = React__namespace.useCallback(() => {
    clearTimeout(closeTimerRef.current);
    openTimerRef.current = window.setTimeout(() => setOpen(true), openDelay);
  }, [openDelay, setOpen]);
  const handleClose = React__namespace.useCallback(() => {
    clearTimeout(openTimerRef.current);
    if (!hasSelectionRef.current && !isPointerDownOnContentRef.current) {
      closeTimerRef.current = window.setTimeout(() => setOpen(false), closeDelay);
    }
  }, [closeDelay, setOpen]);
  const handleDismiss = React__namespace.useCallback(() => setOpen(false), [setOpen]);
  React__namespace.useEffect(() => {
    return () => {
      clearTimeout(openTimerRef.current);
      clearTimeout(closeTimerRef.current);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntime.jsx(
    HoverCardProvider,
    {
      scope: __scopeHoverCard,
      open,
      onOpenChange: setOpen,
      onOpen: handleOpen,
      onClose: handleClose,
      onDismiss: handleDismiss,
      hasSelectionRef,
      isPointerDownOnContentRef,
      children: /* @__PURE__ */ jsxRuntime.jsx(index$1.Root, { ...popperScope, children })
    }
  );
};
HoverCard.displayName = HOVERCARD_NAME;
var TRIGGER_NAME = "HoverCardTrigger";
var HoverCardTrigger = React__namespace.forwardRef(
  (props, forwardedRef) => {
    const { __scopeHoverCard, ...triggerProps } = props;
    const context = useHoverCardContext(TRIGGER_NAME, __scopeHoverCard);
    const popperScope = usePopperScope(__scopeHoverCard);
    return /* @__PURE__ */ jsxRuntime.jsx(index$1.Anchor, { asChild: true, ...popperScope, children: /* @__PURE__ */ jsxRuntime.jsx(
      index$3.Primitive.a,
      {
        "data-state": context.open ? "open" : "closed",
        ...triggerProps,
        ref: forwardedRef,
        onPointerEnter: index$4.composeEventHandlers(props.onPointerEnter, excludeTouch(context.onOpen)),
        onPointerLeave: index$4.composeEventHandlers(props.onPointerLeave, excludeTouch(context.onClose)),
        onFocus: index$4.composeEventHandlers(props.onFocus, context.onOpen),
        onBlur: index$4.composeEventHandlers(props.onBlur, context.onClose),
        onTouchStart: index$4.composeEventHandlers(props.onTouchStart, (event) => event.preventDefault())
      }
    ) });
  }
);
HoverCardTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "HoverCardPortal";
var [PortalProvider, usePortalContext] = createHoverCardContext(PORTAL_NAME, {
  forceMount: void 0
});
var HoverCardPortal = (props) => {
  const { __scopeHoverCard, forceMount, children, container } = props;
  const context = useHoverCardContext(PORTAL_NAME, __scopeHoverCard);
  return /* @__PURE__ */ jsxRuntime.jsx(PortalProvider, { scope: __scopeHoverCard, forceMount, children: /* @__PURE__ */ jsxRuntime.jsx(index$5.Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntime.jsx(index$6.Portal, { asChild: true, container, children }) }) });
};
HoverCardPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "HoverCardContent";
var HoverCardContent = React__namespace.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeHoverCard);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useHoverCardContext(CONTENT_NAME, props.__scopeHoverCard);
    return /* @__PURE__ */ jsxRuntime.jsx(index$5.Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntime.jsx(
      HoverCardContentImpl,
      {
        "data-state": context.open ? "open" : "closed",
        ...contentProps,
        onPointerEnter: index$4.composeEventHandlers(props.onPointerEnter, excludeTouch(context.onOpen)),
        onPointerLeave: index$4.composeEventHandlers(props.onPointerLeave, excludeTouch(context.onClose)),
        ref: forwardedRef
      }
    ) });
  }
);
HoverCardContent.displayName = CONTENT_NAME;
var HoverCardContentImpl = React__namespace.forwardRef((props, forwardedRef) => {
  const {
    __scopeHoverCard,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
    ...contentProps
  } = props;
  const context = useHoverCardContext(CONTENT_NAME, __scopeHoverCard);
  const popperScope = usePopperScope(__scopeHoverCard);
  const ref = React__namespace.useRef(null);
  const composedRefs = index$7.useComposedRefs(forwardedRef, ref);
  const [containSelection, setContainSelection] = React__namespace.useState(false);
  React__namespace.useEffect(() => {
    if (containSelection) {
      const body = document.body;
      originalBodyUserSelect = body.style.userSelect || body.style.webkitUserSelect;
      body.style.userSelect = "none";
      body.style.webkitUserSelect = "none";
      return () => {
        body.style.userSelect = originalBodyUserSelect;
        body.style.webkitUserSelect = originalBodyUserSelect;
      };
    }
  }, [containSelection]);
  React__namespace.useEffect(() => {
    if (ref.current) {
      const handlePointerUp = () => {
        setContainSelection(false);
        context.isPointerDownOnContentRef.current = false;
        setTimeout(() => {
          const hasSelection = document.getSelection()?.toString() !== "";
          if (hasSelection) context.hasSelectionRef.current = true;
        });
      };
      document.addEventListener("pointerup", handlePointerUp);
      return () => {
        document.removeEventListener("pointerup", handlePointerUp);
        context.hasSelectionRef.current = false;
        context.isPointerDownOnContentRef.current = false;
      };
    }
  }, [context.isPointerDownOnContentRef, context.hasSelectionRef]);
  React__namespace.useEffect(() => {
    if (ref.current) {
      const tabbables = getTabbableNodes(ref.current);
      tabbables.forEach((tabbable) => tabbable.setAttribute("tabindex", "-1"));
    }
  });
  return /* @__PURE__ */ jsxRuntime.jsx(
    index$8.DismissableLayer,
    {
      asChild: true,
      disableOutsidePointerEvents: false,
      onInteractOutside,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside: index$4.composeEventHandlers(onFocusOutside, (event) => {
        event.preventDefault();
      }),
      onDismiss: context.onDismiss,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        index$1.Content,
        {
          ...popperScope,
          ...contentProps,
          onPointerDown: index$4.composeEventHandlers(contentProps.onPointerDown, (event) => {
            if (event.currentTarget.contains(event.target)) {
              setContainSelection(true);
            }
            context.hasSelectionRef.current = false;
            context.isPointerDownOnContentRef.current = true;
          }),
          ref: composedRefs,
          style: {
            ...contentProps.style,
            userSelect: containSelection ? "text" : void 0,
            // Safari requires prefix
            WebkitUserSelect: containSelection ? "text" : void 0,
            // re-namespace exposed content custom properties
            ...{
              "--radix-hover-card-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-hover-card-content-available-width": "var(--radix-popper-available-width)",
              "--radix-hover-card-content-available-height": "var(--radix-popper-available-height)",
              "--radix-hover-card-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-hover-card-trigger-height": "var(--radix-popper-anchor-height)"
            }
          }
        }
      )
    }
  );
});
var ARROW_NAME = "HoverCardArrow";
var HoverCardArrow = React__namespace.forwardRef(
  (props, forwardedRef) => {
    const { __scopeHoverCard, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopeHoverCard);
    return /* @__PURE__ */ jsxRuntime.jsx(index$1.Arrow, { ...popperScope, ...arrowProps, ref: forwardedRef });
  }
);
HoverCardArrow.displayName = ARROW_NAME;
function excludeTouch(eventHandler) {
  return (event) => event.pointerType === "touch" ? void 0 : eventHandler();
}
function getTabbableNodes(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode()) nodes.push(walker.currentNode);
  return nodes;
}
var Root2 = HoverCard;
var Trigger = HoverCardTrigger;
var Portal = HoverCardPortal;
var Content2 = HoverCardContent;
var Arrow2 = HoverCardArrow;

exports.Arrow = Arrow2;
exports.Content = Content2;
exports.HoverCard = HoverCard;
exports.HoverCardArrow = HoverCardArrow;
exports.HoverCardContent = HoverCardContent;
exports.HoverCardPortal = HoverCardPortal;
exports.HoverCardTrigger = HoverCardTrigger;
exports.Portal = Portal;
exports.Root = Root2;
exports.Trigger = Trigger;
exports.createHoverCardScope = createHoverCardScope;
