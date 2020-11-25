declare type CallbackFunc = (data: any) => any;
interface IStreamableDataState<T> {
    isStreaming: boolean;
    isStreamingDone: boolean;
    error: Error | null;
    data: T | null;
}
declare type StreamDataFlow = 'stack' | 'object';
declare type HookOptionVal = string | boolean | CallbackFunc | null;
interface IStreamHookOption {
    streamEndFlag: string;
    reqBodyParamsKey: string;
    initialRequestBodyParams: any | null;
    responseReqBodyExtractorKey: string;
    stopStreamOnError: boolean;
    stackDataMapper: any;
    stackDataReducer: any;
    onStreamEnd: any;
    onNextTick: any;
    onStreamError: any;
    streamDataFlow: StreamDataFlow;
    [optKey: string]: HookOptionVal;
}
/**
 * Fetches streaming data and returns the of streaming
 * response, depending on the stream data flow shape
 * Current implementation uses POST request
 * @param {string} serviceUrl
 * @param {*} argOpts
 */
declare function useStreamable(serviceUrl: string, argOpts?: IStreamHookOption): IStreamableDataState<any>;
export default useStreamable;
