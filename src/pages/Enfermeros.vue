<template>
  <NavBar />
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Administración de Enfermeros</h1>

    <!-- Componente para el formulario -->
    <EnfermeroForm @submit="handleFormSubmit" />

    <!-- Componente para la lista -->
    <EnfermeroList 
      :enfermeros="enfermeros" 
      @edit="editEnfermero" 
      @delete="deleteEnfermero" 
    />
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref, onMounted } from 'vue';
import api from '../api/conexionapi';
import { getOrganizationId, getToken } from '../api/auth';
import { jwtDecode } from 'jwt-decode'; 
import EnfermeroForm from '../components/EnfermerosComponents/EnfermeroForm.vue';
import EnfermeroList from '../components/EnfermerosComponents/EnfermeroList.vue';

const NavBar = defineAsyncComponent(() => import('@/components/DashboardComponents/NavBar.vue'));

const enfermeros = ref([]);
const token = getToken();
let organizationId = getOrganizationId(); // Intentar obtenerlo desde localStorage

// **Si no hay organizationId, decodificar el token**
if (!organizationId && token) {
  try {
    const decodedToken = jwtDecode(token);
    organizationId = decodedToken.organizacion_id;
    console.log("🔑 Organización ID extraída del token:", organizationId);
  } catch (error) {
    console.error("❌ Error al decodificar el token:", error);
  }
}

// **Asegurar que organizationId sea un número válido**
const orgId = organizationId?.organizacion_id ?? organizationId; 

if (!orgId || isNaN(orgId)) {
  console.error('❌ ID de organización inválido:', organizationId);
}

// **Función para obtener la lista de enfermeros**
const fetchEnfermeros = async () => {
  try {
    let orgId = null;

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("🔑 Token decodificado:", decodedToken);

        // Extraer correctamente el ID de la organización del token
        if (decodedToken.organizacion_id && typeof decodedToken.organizacion_id === "object") {
          orgId = decodedToken.organizacion_id.organizacion_id; // Acceder al ID correcto
        } else {
          orgId = decodedToken.organizacion_id; // En caso de que no sea un objeto
        }

        console.log("✅ ID de organización confirmado:", orgId);
      } catch (error) {
        console.error("❌ Error al decodificar el token:", error);
      }
    }

    if (!orgId || isNaN(orgId)) {
      console.error("❌ ID de organización inválido:", orgId);
      return;
    }

    console.log(`🔄 Cargando enfermeros de la organización ${orgId}`);

    const response = await api.get('/api/admin/enfermeros', {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log('📥 Datos recibidos de la API:', response.data);

    // **Filtrar manualmente en el frontend**
    enfermeros.value = response.data.filter(enfermero => {
      if (!enfermero.organizacion || !enfermero.organizacion.organizacion_id) {
        console.warn("⚠️ Enfermero sin organización asignada:", enfermero);
        return false;
      }

      console.log("🔍 Comparando IDs: Enfermero", enfermero.organizacion.organizacion_id, "vs", orgId);

      return enfermero.organizacion.organizacion_id === orgId;
    });

    console.log('🎯 Enfermeros filtrados:', enfermeros.value);

  } catch (error) {
    console.error('❌ Error al obtener enfermeros:', error.response?.data || error);
  }
};
  


// **Registrar un nuevo enfermero**
const handleFormSubmit = async (formData) => {
  try {
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
      organizacion_id: orgId, // Asignar la organización correcta
      disponibilidad: false,
      calificacion_promedio: 0,
      resenas: []
    };

    const response = await api.post('/api/admin/enfermeros', payload, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log('✅ Enfermero creado correctamente:', response.data);
    fetchEnfermeros();
  } catch (error) {
    console.error('❌ Error al crear enfermero:', error.response?.data || error);
  }
};

// **Eliminar enfermero**
const deleteEnfermero = async (id) => {
  try {
    console.log(`🗑️ Eliminando enfermero con ID: ${id}`);
    
    await api.delete(`/api/admin/enfermeros/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log('✅ Enfermero eliminado');
    fetchEnfermeros();
  } catch (error) {
    console.error('❌ Error al eliminar enfermero:', error.response?.data || error);
  }
};

// **Cargar los enfermeros cuando se monta el componente**
onMounted(() => {
  if (orgId && token) {
    fetchEnfermeros();
  } else {
    console.error('❌ No se puede cargar enfermeros sin un ID de organización válido.');
  }
});
</script>
