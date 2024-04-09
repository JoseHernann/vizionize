import axios from 'axios';
const protocol = typeof window !== 'undefined' ? window.location.protocol : 'https:';
const instance = axios.create({
  baseURL: `${protocol}//vizionizewebapi.somee.com/api/`,
  timeout: 0,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export default instance;
