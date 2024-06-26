// src/api/axiosConfig.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // You can add other default configurations here
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add any headers or configurations before the request is sent
    // For example, adding an Authorization token:
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx cause this function to trigger
    return response.data;
  },
  (error) => {
    // Any status codes outside the range of 2xx cause this function to trigger
    // You can handle global API error responses here
    const isAuthError = error.response.status === 401;
    if (isAuthError) {
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      if (localStorage.getItem('authToken')) {
        localStorage.removeItem('authToken');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
