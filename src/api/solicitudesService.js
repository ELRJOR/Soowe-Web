import api from '../api/conexionapi'; // Importa la configuración de API

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

// Asignar un enfermero a una solicitud
export const assignNurseToRequest = async (solicitudId, nurseId) => {
  try {
    const response = await api.put(`/api/admin/solicitudes/${solicitudId}/asignar`, { enfermero_id: nurseId });
    console.log("✅ Enfermero asignado:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error al asignar enfermero:", error.response?.data || error);
    throw error.response?.data?.message || 'Error al asignar enfermero';
  }
};