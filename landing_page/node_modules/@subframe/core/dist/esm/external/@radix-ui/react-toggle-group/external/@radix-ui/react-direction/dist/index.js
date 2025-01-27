import * as React from 'react';
import 'react/jsx-runtime';

// packages/react/direction/src/Direction.tsx
var DirectionContext = React.createContext(void 0);
function useDirection(localDir) {
  const globalDir = React.useContext(DirectionContext);
  return localDir || globalDir || "ltr";
}

export { useDirection };
