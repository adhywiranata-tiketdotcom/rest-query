declare type UseEffectHandler = (...args: any[]) => void;
declare function useEffectOnce(fn: UseEffectHandler): void;
export default useEffectOnce;
