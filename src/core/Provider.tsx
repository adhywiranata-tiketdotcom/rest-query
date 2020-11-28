import * as React from 'react';

import libContext, { StoreHashMap } from './context';
import { consoleLogger } from '../utils';

interface RestQueryProps {
  children: React.ReactElement
}

function RestQueryProvider({ children }: RestQueryProps) {
  const [cacheStore, setCacheStore] = React.useState<StoreHashMap>({});

  /**
   * Sets provided data to cache depending on the caching storage strategy
   * @param cacheKey unique key as a reference to the store's hash table
   * @param data data to cache
   */
  function setCacheData(cacheKey: string, data: any) {
    // serialize data into JSON string to let the data be stored in browser storage or cookies
    const serializedData = JSON.stringify(data);

    // TODO: store serialized data to cookie or local storage
    setCacheStore({
      ...cacheStore,
      [cacheKey]: {
        data: serializedData,
        // TODO: implement cache expiration logic
        cacheStoredAt: null,
        cacheExpiredAt: null,
      },
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
