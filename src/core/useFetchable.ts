import * as React from 'react';
import {
  useEffectOnce,
  consoleLogger,
  fetcher,
} from '../utils';

const WARN_INVALID_OPTION_PROPERTY = (property: string) => `Option [${property}] is not part of the API. While this is not an error, ensure the options matches the API.`;

interface Fetchable<TResponseData> {
  isLoading: boolean
  error?: Error
  data?: TResponseData
  refetch?: () => void
}

const initialDataState: Fetchable<any> = {
  isLoading: false,
  error: null,
  data: null,
  refetch: () => {},
};

type HookOptionVal = string | boolean | null
type HttpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface IHookOptions {
  key?: string
  httpFetchMethod?: HttpMethods
  httpFetchBody?: any
  [optKey: string]: HookOptionVal
}

const DEFAULT_OPTS: IHookOptions = {
  key: null,
  httpFetchMethod: 'GET',
  httpFetchBody: null,
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
      consoleLogger.warn(WARN_INVALID_OPTION_PROPERTY(property));
    }
  });

  return opts;
};

/**
 * Hook to Fetch data without any Cache or any other means of data intervention
 * Fetches only once per component mounted, until the refetch method is requested
 * @param serviceUrl URL endpoint to fetch data from
 * @param argOpts Options to modify the behaviour and other configurables
 */
function useFetchable(serviceUrl: string, argOpts = DEFAULT_OPTS) {
  const options = mergeOptsDefault(argOpts);

  const [dataState, setDataState] = React.useState(initialDataState);

  /**
   * Perform fetch from service url according to the HTTP methods specified in the options
   */
  const performFetch = React.useCallback(async () => {
    // start the fetcher processes
    setDataState({ ...dataState, isLoading: true });

    let fetcherResponseData;

    if (options.httpFetchMethod === 'GET') {
      fetcherResponseData = await fetcher.get(serviceUrl);
    }

    if (options.httpFetchMethod === 'POST') {
      fetcherResponseData = await fetcher.post(serviceUrl, options.httpFetchBody);
    }

    if (options.httpFetchMethod === 'PUT') {
      fetcherResponseData = await fetcher.put(serviceUrl, options.httpFetchBody);
    }

    if (options.httpFetchMethod === 'DELETE') {
      fetcherResponseData = await fetcher.performDelete(serviceUrl);
    }

    if (options.httpFetchMethod === 'PATCH') {
      fetcherResponseData = await fetcher.patch(serviceUrl, options.httpFetchBody);
    }

    // mutate the response data into fetchable data state
    setDataState({ ...dataState, data: fetcherResponseData });
  }, [dataState, options.httpFetchBody, options.httpFetchMethod, serviceUrl]);

  useEffectOnce(() => {
    performFetch();

    // TODO: handle fetch abortion during unmounting to avoid memory leak and wasted API calls
  });

  return { ...dataState, refetch: performFetch };
}

export default useFetchable;
