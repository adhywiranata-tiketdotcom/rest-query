interface IDataState<T> {
    isLoading: boolean;
    error?: Error;
    data?: T;
}
declare type CachePolicy = 'cache-first' | 'network-only' | 'cache-only';
declare type HookOptionVal = string | boolean | null;
interface IHookOptions {
    key?: string;
    cachePolicy: CachePolicy;
    shouldPersist?: boolean;
    [optKey: string]: HookOptionVal;
}
declare function useCacheable(serviceUrl: string, argOpts?: IHookOptions): IDataState<any>;
export default useCacheable;
