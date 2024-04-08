import axios from 'axios';

const instance = axios.create({
  baseURL: `http://josehernan-001-site1.ltempurl.com`,
  timeout: 0,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  auth: {
    username: '11171419',
    password: '60-dayfreetrial',
  },
});

export default instance;
