import * as React from 'react';
import { StoreHashMap } from '../interfaces';
interface CoreContextAttributes {
    store: StoreHashMap;
}
interface CoreContextMethods {
    getCachedData?(cacheKey: string): string;
    setCacheData?(cacheKey: string, data: any, opts: any): void;
}
export declare type CoreContext = CoreContextAttributes & CoreContextMethods;
declare const _default: React.Context<CoreContext>;
export default _default;
