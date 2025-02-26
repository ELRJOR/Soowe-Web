import api from './conexionapi';
import { getToken } from './auth';
import { jwtDecode } from 'jwt-decode';

// Obtener la lista de enfermeros
export const fetchEnfermeros = async () => {
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

    return response.data.filter(enfermero => enfermero.organizacion?.organizacion_id === orgId);
  } catch (error) {
    console.error('❌ Error al obtener enfermeros:', error.response?.data || error);
    return [];
  }
};

// Agregar un nuevo enfermero
export const addEnfermero = async (formData) => {
  const token = getToken();
  if (!token) return;

  let validOrgId = null;
  try {
    const decodedToken = jwtDecode(token);
    validOrgId = decodedToken.organizacion_id;
  } catch (error) {
    console.error("❌ Error al decodificar el token:", error);
  }

  if (!validOrgId) {
    console.error("❌ Error: organizacion_id no es válido o no se encontró en el token.");
    return;
  }

  const payload = {
    nombre: formData.nombre,
    apellido: formData.apellido,
    especialidad: formData.especialidad,
    telefono: formData.telefono,
    correo: formData.correo,
    contrasena: formData.contrasena,
    foto_perfil: {
      url: formData.fotoPerfilUrl || 'https://example.com/default-profile.jpg',
      public_id: formData.correo.split('@')[0]
    },
    organizacion_id: validOrgId,
    disponibilidad: false,
    calificacion_promedio: 0,
    resenas: []
  };

  console.log("📤 Datos enviados a la API:", payload);

  try {
    const response = await api.post('/api/admin/enfermeros', payload, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log('✅ Enfermero creado correctamente:', response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error al crear enfermero:", error.response?.data || error);
    return null;
  }
};

// Eliminar un enfermero
export const deleteEnfermero = async (id) => {
  const token = getToken();
  if (!token) return false;

  try {
    console.log(`🗑️ Eliminando enfermero con ID: ${id}`);
    
    await api.delete(`/api/admin/enfermeros/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log('✅ Enfermero eliminado');
    return true;
  } catch (error) {
    console.error('❌ Error al eliminar enfermero:', error.response?.data || error);
    return false;
  }
};
