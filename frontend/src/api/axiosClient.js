import axios from 'axios';

// Konfigurasi dasar pemanggilan API ke backend
const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Interceptor: Otomatis sisipkan token JWT ke setiap request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosClient;
