/*
Fetcher Engine which contains tipical RESTful HTTP Method operations.
Only supports client-side fetching and might change its implementation
depending on the implementation of Abort request and upcoming SSR strategy.
*/

// Fetcher HTTP object signature
interface Fetcher {
  get: (url: string) => Promise<any>
  post: (url: string, bodyParams: any) => Promise<any>
  put: (url: string, bodyParams: any) => Promise<any>
  performDelete: (url: string) => Promise<any>
  patch: (url: string, bodyParams: any) => Promise<any>
}

/**
 * Fetch GET request
 * @param url service url to fetch from
 */
async function get(url: string):Promise<any> {
  const response = await window.fetch(url);
  const data = await response.json();
  return data;
}

/**
 * Fetch POST request
 * @param url service url to fetch from
 * @param bodyParams body to set to POST request
 */
async function post(url: string, bodyParams: any):Promise<any> {
  const response = await window.fetch(url, {
    method: 'POST',
    body: JSON.stringify(bodyParams),
  });
  const data = await response.json();
  return data;
}

/**
 * Fetch PUT request
 * @param url service url to fetch from
 * @param bodyParams body to set to PUT request
 */
async function put(url: string, bodyParams: any):Promise<any> {
  const response = await window.fetch(url, {
    method: 'PUT',
    body: JSON.stringify(bodyParams),
  });
  const data = await response.json();
  return data;
}

/**
 * Fetch DELETE request
 * @param url service url to fetch from
 */
async function performDelete(url: string):Promise<any> {
  const response = await window.fetch(url, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
}

/**
 * Fetch PATCH request
 * @param url service url to fetch from
 * @param bodyParams body to set to PATCH request
 */
async function patch(url: string, bodyParams: any):Promise<any> {
  const response = await window.fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(bodyParams),
  });
  const data = await response.json();
  return data;
}

const fetcher: Fetcher = {
  get,
  post,
  put,
  performDelete,
  patch,
};

export default fetcher;
