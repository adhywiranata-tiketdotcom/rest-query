import * as React from 'react';

import libContext, { ICoreContextStore } from './context';

const ERR_LEADING = '[RESTICACHE ERROR]';

interface IProps {
  children: React.ReactElement
}
function ResticacheProvider({ children }: IProps) {
  const [cacheStore, setCacheStore] = React.useState<ICoreContextStore>({});

  /**
   * set data to cache based on provided cache key or encoded url
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
   * get data based on provided cache key or encoded url
   */
  function getCachedData(cacheKey: string) {
    if (!cacheStore[cacheKey]) {
      return null;
    }

    try {
      const deserializedData = JSON.parse(cacheStore[cacheKey]?.data);
      return deserializedData;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(ERR_LEADING, e);
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

export default ResticacheProvider;
