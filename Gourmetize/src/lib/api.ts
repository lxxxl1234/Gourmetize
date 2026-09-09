import axios from "axios";

/**
 * Instância única do axios para todas as chamadas à API Laravel.
 * A URL base vem de VITE_API_URL (veja .env.example) com fallback local.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(undefined, (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }
  return Promise.reject(error);
});

export default api;
