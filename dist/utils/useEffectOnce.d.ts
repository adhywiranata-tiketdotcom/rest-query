declare type UseEffectHandler = (...args: any[]) => void;
/**
 * React useEffect which runs only once per component lifecycle
 * @param fn effect function to run once
 */
declare function useEffectOnce(fn: UseEffectHandler): void;
export default useEffectOnce;
