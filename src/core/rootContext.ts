import * as React from 'react';

import { StoreHashMap } from '../interfaces';

interface CoreContextAttributes {
  store: StoreHashMap
}

interface CoreContextMethods {
  getCachedData?(cacheKey: string): string
  setCacheData?(cacheKey: string, data: any, opts: any): void
}

export type CoreContext = CoreContextAttributes & CoreContextMethods

export default React.createContext<CoreContext>({ store: null });
