import api from './conexionapi';
import { jwtDecode } from 'jwt-decode'; // ✅ Importación correcta para Vite

// Función para hacer login
export const login = async (correo, contrasena) => {
  try {
    const response = await api.post('/login', { correo, contrasena });

    console.log("🔍 Respuesta del login:", response);

    if (response.data && response.data.token) {
      const token = response.data.token;
      console.log("🔑 Guardando en localStorage:", token);

      // **Decodificar el token**
      const decodedToken = jwtDecode(token);
      console.log("🔍 Token decodificado:", decodedToken);

      // Extraer organizacion_id si existe dentro del token
      if (decodedToken.organizacion_id) {
        localStorage.setItem('organizacion_id', decodedToken.organizacion_id);
        console.log("✅ organizacion_id:", decodedToken.organizacion_id);
      } else {
        console.error("❌ No se encontró el ID de la organización en el token.");
      }

      // Guardar el token en localStorage
      localStorage.setItem('token', token);
    } else {
      console.error("❌ La respuesta no contiene el token.");
    }

    return response.data;
  } catch (error) {
    console.error('❌ Error al autenticar:', error.response?.data || error);
    throw error.response?.data?.message || 'Error en la autenticación';
  }
};

// Obtener organizacion_id desde localStorage
export const getOrganizationId = () => {
  const organizacionId = localStorage.getItem('organizacion_id');
  if (!organizacionId) {
    console.error("❌ No se encontró el ID de la organización en localStorage.");
    return null;
  }
  return organizacionId;
};

// Obtener el token desde localStorage
export const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error("❌ No se encontró el token en localStorage.");
    return null;
  }
  return token;
};
