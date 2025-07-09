// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://store-rating-app-backend-1vuk.onrender.com',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
