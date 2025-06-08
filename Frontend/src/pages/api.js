// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://moodigo-1jm5.onrender.com',
  withCredentials: true,
});

let csrfToken = '';

// Call this once when app loads (e.g., in App.js useEffect)
export const fetchCsrfToken = async () => {
  try {
    const res = await api.get('/get-csrf-token');
    csrfToken = res.data.csrfToken;
  } catch (err) {
    console.error('Failed to fetch CSRF token:', err);
  }
};

// Add CSRF token automatically to unsafe HTTP methods
api.interceptors.request.use((config) => {
  if (['post', 'put', 'delete'].includes(config.method)) {
    config.headers['X-CSRF-Token'] = csrfToken;
  }
  return config;
});

export default api;
