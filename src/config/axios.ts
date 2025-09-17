import axios from 'axios';

const api = axios.create({
  baseURL: 'https://web-production-9089.up.railway.app', 
  timeout: 10000, 
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }
  ,
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  }
  ,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject(new Error('No response received from server'));
    } else {
      return Promise.reject(new Error(error.message));
    }
  }
);

export default api 