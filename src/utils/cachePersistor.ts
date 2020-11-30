import { CachedData, StoreHashMap } from '../interfaces';

const CACHE_PERSISTOR_KEY_PREFIX = 'tix_rest_query_persisted_cache';
const INITIAL_CACHE_VAL = '{}';
const storageEngine = window.localStorage;

/**
 * CachePersistor works as a single source of truth - engine on cache persistence
 * This pattern avoids any direct access to any other means of browser storage,
 * hence, close for modification outside this particular class.
 */
abstract class CachePersistor {
  /**
   * Mutate the store based on changes on a single key
   */
  static save(cacheKey: string, serializedData: CachedData) {
    const store = CachePersistor.getStore();
    store[cacheKey] = serializedData;
    CachePersistor.setStore(store);
  }

  /**
   * Get the value of store from the storage engine
   */
  static getStore(): StoreHashMap {
    return JSON.parse(storageEngine.getItem(CACHE_PERSISTOR_KEY_PREFIX) || INITIAL_CACHE_VAL);
  }

  /**
   * Overwrite the value of store inside the storage engine
   */
  static setStore(persistedCacheStore: StoreHashMap) {
    storageEngine.setItem(CACHE_PERSISTOR_KEY_PREFIX, JSON.stringify(persistedCacheStore));
  }

  /**
   * Purge the cached data from the storage engine. This won't directly affect the context's store.
   */
  static removeStore() {
    storageEngine.removeItem(CACHE_PERSISTOR_KEY_PREFIX);
  }
}

export default CachePersistor;
