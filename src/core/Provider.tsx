import * as React from 'react';

import libContext from './rootContext';
import { CachedData, StoreHashMap } from '../interfaces';
import { consoleLogger, CachePersistor, useEffectOnce } from '../utils';

interface RestQueryProps {
  children: React.ReactElement
}

function RestQueryProvider({ children }: RestQueryProps) {
  const [cacheStore, setCacheStore] = React.useState<StoreHashMap>({});

  useEffectOnce(() => {
    // Rehydrate the persisted cache into the cache store once per page load
    setCacheStore(CachePersistor.getStore());
  });

  /**
   * Sets provided data to cache depending on the caching storage strategy
   * @param cacheKey unique key as a reference to the store's hash table
   * @param data data to cache
   * @param opts hook options
   */
  function setCacheData(cacheKey: string, data: any, opts: any) {
    // serialize data into JSON string to let the data be stored in browser storage or cookies
    const serializedData = JSON.stringify(data);

    const cachedData: CachedData = {
      data: serializedData,
      // TODO: implement cache expiration logic
      cacheStoredAt: null,
      cacheExpiredAt: null,
    };

    // Persist the serialized data into the cache persistor storage engine
    if (opts.shouldPersist) {
      CachePersistor.save(cacheKey, cachedData);
    }

    setCacheStore({
      ...cacheStore,
      [cacheKey]: cachedData,
    });
  }

  /**
   * Returns data stored in the Query Cache
   * @param cacheKey unique key as a reference to the store's hash table
   */
  function getCachedData(cacheKey: string): any {
    // returns null when requested cache key is not available in the store hash table
    if (!cacheStore[cacheKey]) {
      return null;
    }

    // TODO: implement cache expiration logic before retrieving the data

    try {
      // deserialized the cached data
      const deserializedData = JSON.parse(cacheStore[cacheKey]?.data);

      return deserializedData;
    } catch (e) {
      // returns null when data failed to be deserialized due to unknown reasons
      consoleLogger.err('something went wrong when deserializing data ', e);

      return null;
    }
  }

  const ctxValue = {
    store: cacheStore,
    getCachedData,
    setCacheData,
  };

  return (
    <libContext.Provider value={ctxValue}>
      {children}
    </libContext.Provider>
  );
}

export default RestQueryProvider;
