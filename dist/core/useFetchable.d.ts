declare type HookOptionVal = string | boolean | null;
declare type HttpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
interface IHookOptions {
    key?: string;
    httpFetchMethod?: HttpMethods;
    httpFetchBody?: any;
    [optKey: string]: HookOptionVal;
}
/**
 * Hook to Fetch data without any Cache or any other means of data intervention
 * Fetches only once per component mounted, until the refetch method is requested
 * @param serviceUrl URL endpoint to fetch data from
 * @param argOpts Options to modify the behaviour and other configurables
 */
declare function useFetchable(serviceUrl: string, argOpts?: IHookOptions): {
    refetch: () => Promise<void>;
    isLoading: boolean;
    error?: Error;
    data?: any;
};
export default useFetchable;
