import { CachedData, StoreHashMap } from '../interfaces';

const CACHE_PERSISTOR_KEY_PREFIX = 'tix-rest-query-cache';
const INITIAL_CACHE_VAL = '{}';

abstract class CachePersistor {
  static save(cacheKey: string, serializedData: CachedData) {
    const store = CachePersistor.getStore();
    store[cacheKey] = serializedData;
    CachePersistor.setStore(store);
  }

  static getStore(): StoreHashMap {
    return JSON.parse(window.localStorage.getItem(CACHE_PERSISTOR_KEY_PREFIX) || INITIAL_CACHE_VAL);
  }

  static setStore(persistedCacheStore: StoreHashMap) {
    window.localStorage.setItem(CACHE_PERSISTOR_KEY_PREFIX, JSON.stringify(persistedCacheStore));
  }
}

export default CachePersistor;
