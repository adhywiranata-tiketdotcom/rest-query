/**
 * Fetcher Engine. Can and should be replaced by any other fetcher
 * Should support POST method and HTTP Call Aborting as well!
 * @param  {string} url
 */
declare function get(url: string): Promise<any>;
declare function post(url: string, bodyParams: any): Promise<any>;
declare const fetcher: {
    get: typeof get;
    post: typeof post;
};
export default fetcher;
