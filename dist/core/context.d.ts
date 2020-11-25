import * as React from 'react';
interface ICachedData {
    data?: string;
    cacheStoredAt?: string;
    cacheExpiredAt?: string;
}
export interface ICoreContextStore {
    [cacheDataKey: string]: ICachedData;
}
interface ICoreContextAttrs {
    store: ICoreContextStore;
}
interface ICoreContextMethods {
    getCachedData?(cacheKey: string): string;
    setCacheData?(cacheKey: string, data: any): void;
}
declare type CoreContext = ICoreContextAttrs & ICoreContextMethods;
declare const _default: React.Context<CoreContext>;
export default _default;
