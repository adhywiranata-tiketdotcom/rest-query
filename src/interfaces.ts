export interface CachedData {
  data?: string
  cacheStoredAt?: string
  cacheExpiredAt?: string
}

export interface StoreHashMap {
  [cacheDataKey: string]: CachedData
}
