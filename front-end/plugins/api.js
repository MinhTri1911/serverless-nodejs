import axios from 'axios'

const concatUrl = function (url) {
  const baseUrl = process.env.baseUrl + '/';

  return baseUrl.concat(url);
}

export function get(url, payload = '') {
  return axios({
    method: 'GET',
    url: concatUrl(url),
    params: payload
  });
}

export function post(url, payload = '') {
  return axios({
    method: 'POST',
    url: concatUrl(url),
    data: payload
  });
}

export function patch(url, payload = '') {
  return axios({
    method: 'PATCH',
    url: concatUrl(url),
    data: payload
  });
}

export function put(url, payload = '') {
  return axios({
    method: 'PUT',
    url: concatUrl(url),
    data: payload
  });
}

export function del(url, payload = '') {
  return axios({
    method: 'DELETE',
    url: concatUrl(url),
    data: payload
  });
}
