import * as React from 'react';

type UseEffectHandler = (...args: any[]) => void

/**
 * React useEffect which runs only once per component lifecycle
 * @param fn effect function to run once
 */
function useEffectOnce(fn: UseEffectHandler) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(fn, []);
}

export default useEffectOnce;
