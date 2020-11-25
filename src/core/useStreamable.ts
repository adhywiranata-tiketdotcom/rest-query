import * as React from 'react';
import { useEffectOnce, fetcher } from '../utils';

const WARN_LEADING = '[RESTICACHE WARNING]';
const WARN_INVALID_OPTION_PROPERTY = (property: string) => `Option [${property}] is not part of the API. While this is not an error, ensure the options matches the API.`;

const IDENTITY = (data: any) => data;
const EMPTY = () => ({});
const NO_OP = () => {};

type CallbackFunc = (data: any) => any

interface IStreamableDataState<T> {
  isStreaming: boolean,
  isStreamingDone: boolean,
  error: Error | null,
  data: T | null,
}

const initialDataState: IStreamableDataState<any> = {
  isStreaming: false,
  isStreamingDone: false,
  error: null,
  data: null,
};

type StreamDataFlow = 'stack' | 'object';
type HookOptionVal = string | boolean | CallbackFunc | null

interface IStreamHookOption {
  streamEndFlag: string,
  reqBodyParamsKey: string,
  initialRequestBodyParams: any | null,
  responseReqBodyExtractorKey: string,
  stopStreamOnError: boolean,
  stackDataMapper: any,
  stackDataReducer: any,
  onStreamEnd: any,
  onNextTick: any,
  onStreamError: any,
  streamDataFlow: StreamDataFlow
  [optKey: string]: HookOptionVal
}

const DEFAULT_OPTS: IStreamHookOption = {
  // flag to decide when a stream should be ended. Deep field NOT YET SUPPORTED.
  streamEndFlag: 'isStreamEnded',
  // Field that works as a body params for the next request. Deep field NOT YET SUPPORTED.
  reqBodyParamsKey: 'requestKeys',
  // Specify the requestBodyParams value that performed during the first time of streaming process
  initialRequestBodyParams: null,
  // Field that is going to be passed to the next `reqBodyParamsKey`
  // from previous streaming response. Deep field NOT YET SUPPORTED.
  responseReqBodyExtractorKey: 'requestKeys',
  // if set to true, streaming will stop when api returns error
  stopStreamOnError: false,
  stackDataMapper: IDENTITY,
  stackDataReducer: EMPTY,
  onStreamEnd: NO_OP,
  onNextTick: NO_OP,
  onStreamError: NO_OP,
  streamDataFlow: 'stack', // stack | object, STACK will place all responses into a single array. OBJECT will replace.
};

interface IOptsParam {
  [optKey: string]: HookOptionVal
}

const mergeOptsDefault = (optsParam: IOptsParam) => {
  const opts = { ...DEFAULT_OPTS };

  Object.keys(optsParam).forEach((property) => {
    if (Object.prototype.hasOwnProperty.call(DEFAULT_OPTS, property)) {
      opts[property] = optsParam[property];
    } else {
      // eslint-disable-next-line no-console
      console.warn(WARN_LEADING, WARN_INVALID_OPTION_PROPERTY(property));
    }
  });

  return opts;
};

/**
 * Fetches streaming data and returns the of streaming
 * response, depending on the stream data flow shape
 * Current implementation uses POST request
 * @param {string} serviceUrl
 * @param {*} argOpts
 */
function useStreamable(serviceUrl: string, argOpts = DEFAULT_OPTS) {
  const options = mergeOptsDefault(argOpts);
  const [dataState, setDataState] = React.useState(initialDataState);

  // Run PerformFetch function recursively while mutating the streamQueue
  // streamQueue might be spammed with lots of responses, but after streaming done performed,
  // the value will automatically be garbage collected.
  const performFetch = React.useCallback(async (requestBodyParams = {}, streamQueue = []) => {
    try {
      const streamDataResponse = await fetcher.post(serviceUrl, requestBodyParams);

      options.onNextTick();

      if (streamDataResponse[options.streamEndFlag] === false) {
        // perform next fetch with updated stream bodyParamsKey as request body
        performFetch(
          { [options.reqBodyParamsKey]: streamDataResponse[options.responseReqBodyExtractorKey] },
          [...streamQueue, { ...streamDataResponse }],
        );

        return;
      }

      if (streamDataResponse[options.streamEndFlag] === true) {
        options.onStreamEnd();

        if (options.streamDataFlow === 'stack') {
          setDataState({
            ...dataState,
            data: [...streamQueue, { ...streamDataResponse }].map(options.stackDataMapper),
          });

          return;
        }

        if (options.streamDataFlow === 'object') {
          setDataState({
            ...dataState,
            data: [...streamQueue, { ...streamDataResponse }]
              .map(options.stackDataMapper)
              .reduce(options.stackDataReducer),
          });

          return;
        }
      }

      // eslint-disable-next-line no-console
      console.warn('Stream ended due to stream ending flag is not found or not a proper boolean value');
      return;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('something went wrong ', e);
    }
  }, [serviceUrl, options, dataState]);

  useEffectOnce(() => {
    performFetch({ [options.reqBodyParamsKey]: options.initialRequestBodyParams });
  });

  return dataState;
}

export default useStreamable;
