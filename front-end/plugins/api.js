import axios from 'axios'

const concatUrl = function (url) {
  const baseUrl = process.env.baseUrl + '/';

  return baseUrl.concat(url);
}

export function get(url, payload = '') {
  axios.defaults.headers.common = {
    'Content-Type': 'application/json',
    Authorization: "",
  };

  return axios({
    method: 'GET',
    url: concatUrl(url),
    params: payload
  });
}

export function post(url, payload = '') {
  axios.defaults.headers.common = {
    'Content-Type': 'application/json',
    Authorization: "",
  };

  return axios({
    method: 'POST',
    url: concatUrl(url),
    data: payload
  });
}

export function patch(url, payload = '') {
  axios.defaults.headers.common = {
    'Content-Type': 'application/json',
    Authorization: "",
  };

  return axios({
    method: 'PATCH',
    url: concatUrl(url),
    data: payload
  });
}

export function put(url, payload = '') {
  axios.defaults.headers.common = {
    'Content-Type': 'application/json',
    Authorization: "",
  };

  return axios({
    method: 'PUT',
    url: concatUrl(url),
    data: payload
  });
}

export function del(url, payload = '') {
  axios.defaults.headers.common = {
    'Content-Type': 'application/json',
    Authorization: "",
  };

  return axios({
    method: 'DELETE',
    url: concatUrl(url),
    data: payload
  });
}
