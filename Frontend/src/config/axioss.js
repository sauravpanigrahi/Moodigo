import axios from 'axios';

const API_BASE_URL = 'https://moodigo-96i1.onrender.com';
// const API_BASE_URL = 'http://localhost:3000';


const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor to handle session expiry
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear local storage and dispatch logout event
      localStorage.removeItem('user');
      window.dispatchEvent(new CustomEvent('logout'));
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 