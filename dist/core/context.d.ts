import * as React from 'react';
interface CachedData {
    data?: string;
    cacheStoredAt?: string;
    cacheExpiredAt?: string;
}
export interface StoreHashMap {
    [cacheDataKey: string]: CachedData;
}
interface CoreContextAttributes {
    store: StoreHashMap;
}
interface CoreContextMethods {
    getCachedData?(cacheKey: string): string;
    setCacheData?(cacheKey: string, data: any): void;
}
export declare type CoreContext = CoreContextAttributes & CoreContextMethods;
declare const _default: React.Context<CoreContext>;
export default _default;
