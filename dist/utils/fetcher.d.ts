interface Fetcher {
    get: (url: string) => Promise<any>;
    post: (url: string, bodyParams: any) => Promise<any>;
    put: (url: string, bodyParams: any) => Promise<any>;
    performDelete: (url: string) => Promise<any>;
    patch: (url: string, bodyParams: any) => Promise<any>;
}
declare const fetcher: Fetcher;
export default fetcher;
