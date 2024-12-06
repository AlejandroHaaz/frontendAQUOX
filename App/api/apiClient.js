import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuración base para Axios
const apiClient = axios.create({
  baseURL: 'https://aquox.onrender.com', // URL de backend deployado
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para incluir el token JWT
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token'); // Obtener el token desde AsyncStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores de respuesta
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Manejo de errores de autenticación, por ejemplo, redirigir al login
      console.log('Token expirado o no autorizado');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
