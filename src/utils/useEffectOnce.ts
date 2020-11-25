import * as React from 'react';

type UseEffectHandler = (...args: any[]) => void

function useEffectOnce(fn: UseEffectHandler) {
  React.useEffect(fn, []);
}

export default useEffectOnce;
