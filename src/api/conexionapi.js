import axios from 'axios';

// Función para obtener el token almacenado en localStorage
const getToken = () => localStorage.getItem('token');

const api = axios.create({
  baseURL: 'https://soowe-apidata.onrender.com/', 
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para agregar automáticamente el token a cada petición
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 🔥 Agrega el token aquí
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
