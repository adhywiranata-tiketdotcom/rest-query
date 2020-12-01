import { CachedData, StoreHashMap } from '../interfaces';
/**
 * CachePersistor works as a single source of truth - engine on cache persistence
 * This pattern avoids any direct access to any other means of browser storage,
 * hence, close for modification outside this particular class.
 */
declare abstract class CachePersistor {
    /**
     * Mutate the store based on changes on a single key
     */
    static save(cacheKey: string, serializedData: CachedData): void;
    /**
     * Get the value of store from the storage engine
     */
    static getStore(): StoreHashMap;
    /**
     * Overwrite the value of store inside the storage engine
     */
    static setStore(persistedCacheStore: StoreHashMap): void;
    /**
     * Purge the cached data from the storage engine. This won't directly affect the context's store.
     */
    static removeStore(): void;
}
export default CachePersistor;
