import api from '../api/conexionapi'; // Importa la configuración de API

// Obtener todas las solicitudes
export const getSolicitudes = async () => {
  try {
    const response = await api.get('/api/mobile/solicitudes');
    console.log("🔍 Respuesta de solicitudes:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener las solicitudes:", error.response?.data || error);
    throw error.response?.data?.message || 'Error al obtener las solicitudes';
  }
};

// Obtener datos de un usuario por ID
export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/api/mobile/usuarios/${userId}`);
    console.log("👤 Datos del usuario:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener el usuario:", error.response?.data || error);
    throw error.response?.data?.message || 'Error al obtener el usuario';
  }
};

// Obtener datos de un paciente por ID
export const getPatientById = async (patientId) => {
  try {
    const response = await api.get(`/api/mobile/pacientes/${patientId}`);
    console.log("🏥 Datos del paciente:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener el paciente:", error.response?.data || error);
    throw error.response?.data?.message || 'Error al obtener el paciente';
  }
};
