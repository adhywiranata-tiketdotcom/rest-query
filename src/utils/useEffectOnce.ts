import * as React from 'react';

type UseEffectHandler = (...args: any[]) => void

function useEffectOnce(fn: UseEffectHandler) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(fn, []);
}

export default useEffectOnce;
