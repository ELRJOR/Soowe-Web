// src/services/solicitudesService.js
import api from '../api/conexionapi'; // Asegúrate de importar tu archivo de API correctamente

// Función para obtener las solicitudes
export const getSolicitudes = async () => {
  try {
    const response = await api.get('/api/mobile/solicitudes');
    console.log("🔍 Respuesta de solicitudes:", response.data);
    return response.data; // Devuelve los datos de las solicitudes
  } catch (error) {
    console.error("❌ Error al obtener las solicitudes:", error.response?.data || error);
    throw error.response?.data?.message || 'Error al obtener las solicitudes'; // Manejo de errores
  }
};
