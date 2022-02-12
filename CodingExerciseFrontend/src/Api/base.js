import 'whatwg-fetch';

export function GetRequest(url, headers) {
  return fetch(url, {
    credentials: 'same-origin',
    method: 'GET',
    headers,
  })
    .then(response => response);
}

export function Request(url, headers, method, body) {
  return fetch(url, {
    credentials: 'same-origin',
    method,
    body: JSON.stringify(body),
    headers,
  })
    .then(response => response);
}