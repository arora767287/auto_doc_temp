import * as React from 'react';

// packages/react/use-callback-ref/src/useCallbackRef.tsx
function useCallbackRef(callback) {
  const callbackRef = React.useRef(callback);
  React.useEffect(() => {
    callbackRef.current = callback;
  });
  return React.useMemo(() => (...args) => callbackRef.current?.(...args), []);
}

export { useCallbackRef };
