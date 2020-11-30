import { CachedData, StoreHashMap } from '../interfaces';
declare abstract class CachePersistor {
    static save(cacheKey: string, serializedData: CachedData): void;
    static getStore(): StoreHashMap;
    static setStore(persistedCacheStore: StoreHashMap): void;
}
export default CachePersistor;
