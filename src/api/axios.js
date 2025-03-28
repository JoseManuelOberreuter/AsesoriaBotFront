// src/api/axios.js
import axios from 'axios';
import { useUserStore } from '@/store/userStore';

const instance = axios.create({
  baseURL: 'http://localhost:4005', // 🛠️ Cámbialo si usas otra URL en producción
});

// 🔒 Agrega token automáticamente si está disponible
instance.interceptors.request.use((config) => {
  const userStore = useUserStore();
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;