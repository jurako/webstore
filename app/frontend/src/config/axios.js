import axios from 'axios'
import toNetworkError from '@/misc/errors/NetworkError';
import { handleNetworkError } from '@/misc/errors/handlers'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API_URL}/api`,
  withCredentials: true
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    error.requestedURL = error?.config?.url ?? '';
    error.redirectToNotFound = error?.config?.redirectToNotFound ?? false;

    const networkError = toNetworkError(error);
    handleNetworkError(networkError);

    return Promise.reject(networkError);
  }
)

export default api;