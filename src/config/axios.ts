import axios from 'axios';

const api = axios.create({
  baseURL: 'https://4ad7-179-34-231-208.ngrok-free.app', // API base URL
  timeout: 10000, // Request timeout
});
// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }
  ,
  (error) => {
    console.error('Request error:', error);
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
      console.error('Response error:', error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
      return Promise.reject(new Error('No response received from server'));
    } else {
      console.error('Request setup error:', error.message);
      return Promise.reject(new Error(error.message));
    }
  }
);

export default api 