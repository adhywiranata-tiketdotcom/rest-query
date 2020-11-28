/**
 * Fetcher Engine. Can and should be replaced by any other fetcher
 * Should support POST method and HTTP Call Aborting as well!
 * @param  {string} url
 */
async function get(url: string) {
  const response = await window.fetch(url);
  const data = await response.json();
  return data;
}

async function post(url: string, bodyParams: any) {
  const response = await window.fetch(url, {
    method: 'POST',
    body: JSON.stringify(bodyParams),
  });
  const data = await response.json();
  return data;
}

async function put(url: string, bodyParams: any) {
  const response = await window.fetch(url, {
    method: 'PUT',
    body: JSON.stringify(bodyParams),
  });
  const data = await response.json();
  return data;
}

async function performDelete(url: string) {
  const response = await window.fetch(url, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
}

async function patch(url: string, bodyParams: any) {
  const response = await window.fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(bodyParams),
  });
  const data = await response.json();
  return data;
}

const fetcher = {
  get,
  post,
  put,
  performDelete,
  patch,
};

export default fetcher;
