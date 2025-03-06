import api from '../api/conexionapi'; // Importa la configuración de API
import { getToken } from '../api/auth'; // Importa la función para obtener el token
import { jwtDecode } from 'jwt-decode'; // Importa jwtDecode para decodificar el token

// Obtener todas las solicitudes entrantes
export const getSolicitudes = async () => {
  try {
    const response = await api.get('/api/admin/solicitudes/entrantes');
    console.log("🔍 Respuesta de solicitudes entrantes:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener las solicitudes entrantes:", error.response?.data || error);
    throw error.response?.data?.message || 'Error al obtener las solicitudes entrantes';
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

// Obtener datos de un enfermero por ID
export const getNurseById = async (nurseId) => {
  try {
    const response = await api.get(`/api/mobile/enfermeros/${nurseId}`);
    console.log("🩺 Datos del enfermero:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener el enfermero:", error.response?.data || error);
    throw error.response?.data?.message || 'Error al obtener el enfermero';
  }
};

// Obtener la lista de enfermeros de la organización del administrador
export const getNurses = async () => {
  const token = getToken();
  if (!token) return [];

  let orgId = null;
  try {
    const decodedToken = jwtDecode(token);
    orgId = decodedToken.organizacion_id?.organizacion_id ?? decodedToken.organizacion_id;
  } catch (error) {
    console.error("❌ Error al decodificar el token:", error);
  }

  if (!orgId || isNaN(orgId)) return [];

  try {
    const response = await api.get('/api/admin/enfermeros', {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Filtrar enfermeros por organización
    return response.data.filter(enfermero => enfermero.organizacion?.organizacion_id === orgId);
  } catch (error) {
    console.error('❌ Error al obtener enfermeros:', error.response?.data || error);
    return [];
  }
};

// Asignar un enfermero a una solicitud
export const assignNurseToRequest = async (solicitudId, enfermeroId) => {
  try {
    const response = await api.put(`/api/admin/solicitudes/${solicitudId}/enfermero/${enfermeroId}`);
    console.log("✅ Enfermero asignado:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error al asignar enfermero:", error.response?.data || error);
    throw error.response?.data?.message || 'Error al asignar enfermero';
  }
};