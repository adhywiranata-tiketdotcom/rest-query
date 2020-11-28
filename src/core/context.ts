import * as React from 'react';

interface CachedData {
  data?: string
  cacheStoredAt?: string
  cacheExpiredAt?: string
}

export interface StoreHashMap {
  [cacheDataKey: string]: CachedData
}

interface CoreContextAttributes {
  store: StoreHashMap
}

interface CoreContextMethods {
  getCachedData?(cacheKey: string): string
  setCacheData?(cacheKey: string, data: any): void
}

export type CoreContext = CoreContextAttributes & CoreContextMethods

export default React.createContext<CoreContext>({ store: null });
