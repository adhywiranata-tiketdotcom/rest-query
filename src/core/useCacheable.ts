import * as React from 'react';
import { useEffectOnce, cacheKeyObfuscator, fetcher } from '../utils';

import libContext from './context';

const WARN_LEADING = '[RESTICACHE WARNING]';
const WARN_INVALID_OPTION_PROPERTY = (property: string) => `Option [${property}] is not part of the API. While this is not an error, ensure the options matches the API.`;

interface IDataState<T> {
  isLoading: boolean
  error?: Error
  data?: T
}
const initialDataState: IDataState<any> = {
  isLoading: false,
  error: null,
  data: null,
};

type CachePolicy = 'cache-first' | 'network-only' | 'cache-only'

interface ICachePolicies {
  CACHE_FIRST: CachePolicy
  NETWORK_ONLY: CachePolicy
  CACHE_ONLY: CachePolicy
}

const CACHE_POLICIES: ICachePolicies = {
  CACHE_FIRST: 'cache-first',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only',
};

type HookOptionVal = string | boolean | null

interface IHookOptions {
  key?: string
  cachePolicy: CachePolicy
  [optKey: string]: HookOptionVal
}

const DEFAULT_OPTS: IHookOptions = {
  key: null,
  cachePolicy: CACHE_POLICIES.CACHE_FIRST,

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

function useCacheable(serviceUrl: string, argOpts = DEFAULT_OPTS) {
  const options = mergeOptsDefault(argOpts);
  const ctx = React.useContext(libContext);
  const serviceCacheKey = options.key;

  // Determine the cache key based on user-defined key and fallback to encoded service URL
  // User-defined cache key disregards url into its key, so changing urls will override the data
  const cacheKey = serviceCacheKey || cacheKeyObfuscator.encode(serviceUrl);
  const cachedData = ctx.getCachedData(cacheKey);

  // Logic flags based on Cache Policies
  const isCacheAvailable = Boolean(cachedData);
  const isCacheAllowed = options.cachePolicy !== CACHE_POLICIES.NETWORK_ONLY;
  const isNetworkAllowed = [
    CACHE_POLICIES.CACHE_FIRST,
    CACHE_POLICIES.NETWORK_ONLY,
  ].includes(options.cachePolicy);
  const shouldUseCache = isCacheAvailable && isCacheAllowed;

  // Prepare data for initial hook load
  const cacheDataForBootstrap = { ...initialDataState, data: cachedData };
  const bootstrappedData = shouldUseCache ? cacheDataForBootstrap : initialDataState;
  const [dataState, setDataState] = React.useState(bootstrappedData);

  /**
   * Perform Fetch Side Effect from Service Url
   * Will store the data to cache if cache is allowed
   */
  const performFetch = React.useCallback(async () => {
    if (isCacheAvailable || !isNetworkAllowed) {
      return;
    }

    // start the fetcher processes
    setDataState({ ...dataState, isLoading: true });
    const data = await fetcher.get(serviceUrl);
    setDataState({ ...dataState, data });

    // set fetched data to cache
    if (isCacheAllowed) {
      ctx.setCacheData(cacheKey, data);
    }
  }, [isCacheAvailable, isNetworkAllowed, dataState, serviceUrl, isCacheAllowed, ctx, cacheKey]);

  useEffectOnce(() => {
    performFetch();
  });

  return dataState;
}

export default useCacheable;
