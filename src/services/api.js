import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for handling common request tasks
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for handling common response tasks
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle common errors here
    if (error.response) {
      console.error('API Error:', error.response.data);
    }
    return Promise.reject(error);
  }
);

// Example API functions
export const testConnection = () => api.get('/');

// Add more API functions here as needed
// export const getUsers = () => api.get('/users');
// export const createUser = (data) => api.post('/users', data);

export default api; 