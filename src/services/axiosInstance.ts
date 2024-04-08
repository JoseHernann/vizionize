import axios from 'axios';

const protocol = typeof window !== 'undefined' ? window.location.protocol : 'https:';
const instance = axios.create({
  // Usa el protocolo determinado y asegura que el resto de la URL permanezca igual.
  baseURL: `${protocol}//acm.net/WebApi/api/`,
  timeout: 0,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export default instance;
