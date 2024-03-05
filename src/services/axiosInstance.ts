import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://acm.net/WebApi/api',
  timeout: 10000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export default instance;
