import * as React from 'react';

interface ICachedData {
  data?: string
  cacheStoredAt?: string
  cacheExpiredAt?: string
}

export interface ICoreContextStore {
  [cacheDataKey: string]: ICachedData
}

interface ICoreContextAttrs {
  store: ICoreContextStore
}

interface ICoreContextMethods {
  getCachedData?(cacheKey: string): string
  setCacheData?(cacheKey: string, data: any): void
}

type CoreContext = ICoreContextAttrs & ICoreContextMethods

export default React.createContext<CoreContext>({ store: null });
