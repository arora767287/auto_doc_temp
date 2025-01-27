import * as React from 'react';

// packages/react/use-layout-effect/src/useLayoutEffect.tsx
var useLayoutEffect2 = Boolean(globalThis?.document) ? React.useLayoutEffect : () => {
};

export { useLayoutEffect2 as useLayoutEffect };
