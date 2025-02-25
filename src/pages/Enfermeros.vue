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
let organizationId = getOrganizationId();

if (!organizationId && token) {
  try {
    const decodedToken = jwtDecode(token);
    organizationId = decodedToken.organizacion_id;
  } catch (error) {
    console.error("❌ Error al decodificar el token:", error);
  }
}

const orgId = organizationId?.organizacion_id ?? organizationId; 

const fetchEnfermeros = async () => {
  try {
    let orgId = null;

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        orgId = decodedToken.organizacion_id?.organizacion_id ?? decodedToken.organizacion_id;
      } catch (error) {
        console.error("❌ Error al decodificar el token:", error);
      }
    }

    if (!orgId || isNaN(orgId)) return;

    const response = await api.get('/api/admin/enfermeros', {
      headers: { Authorization: `Bearer ${token}` }
    });

    enfermeros.value = response.data.filter(enfermero => 
      enfermero.organizacion?.organizacion_id === orgId
    );
  } catch (error) {
    console.error('❌ Error al obtener enfermeros:', error.response?.data || error);
  }
};

const handleFormSubmit = async (formData) => {
  console.log("📥 Datos recibidos en handleFormSubmit:", formData); // Depuración

  let validOrgId = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);  // Decodificar el token
      validOrgId = decodedToken.organizacion_id;  // Obtener el organizacion_id desde el token
      console.log("✅ organizacion_id:", validOrgId); // Verificar que se extrajo correctamente el organizacion_id
    } catch (error) {
      console.error("❌ Error al decodificar el token:", error);
    }
  }

  if (!validOrgId) {
    console.error("❌ Error: organizacion_id no es válido o no se encontró en el token.");
    return;
  }

  // Crear el payload para la API
  const payload = {
    nombre: formData.nombre,
    apellido: formData.apellido,
    especialidad: formData.especialidad,
    telefono: formData.telefono,
    correo: formData.correo,
    contrasena: formData.contrasena,
    foto_perfil: {
      url: formData.fotoPerfilUrl || 'https://example.com/default-profile.jpg',
      public_id: formData.correo.split('@')[0]  // Usa una versión más segura para el nombre público de la foto
    },
    organizacion_id: validOrgId, // Asignar el organizacion_id del administrador (extraído del token)
    disponibilidad: false,
    calificacion_promedio: 0,
    resenas: []
  };

  console.log("📤 Datos enviados a la API:", payload); // Depuración

  try {
    const response = await api.post('/api/admin/enfermeros', payload, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log('✅ Enfermero creado correctamente:', response.data);
    fetchEnfermeros(); // Recargar la lista de enfermeros
  } catch (error) {
    // Imprimir el error completo recibido del servidor
    console.error("❌ Error al crear enfermero:", error.response?.data || error);

    // Si el servidor devuelve un mensaje de error detallado, podemos imprimirlo
    if (error.response && error.response.data && error.response.data.errors) {
      console.error("Mensaje de error del servidor:", error.response.data.errors);
    }
  }
};


// **Eliminar enfermero**
const handleDelete = async (id) => {
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

// **Cargar enfermeros cuando se monta el componente**
onMounted(() => {
  if (orgId && token) {
    fetchEnfermeros();
  }
});
</script>

<template>
  <NavBar />
  <div class="max-w-5xl mx-auto p-6">
    <h1 class="text-3xl font-bold text-gray-800 text-center mb-6">
      Administración de Enfermeros
    </h1>

    <div class="bg-white shadow-md rounded-lg p-6">
      <!-- 📌 Sección de formulario -->
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Registrar Enfermero</h2>
      <EnfermeroForm @submit="handleFormSubmit" /> <!-- 🔥 Corrección aquí -->

      <hr class="my-6 border-gray-300" />

      <!-- 📌 Sección de lista de enfermeros -->
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Lista de Enfermeros</h2>
      <EnfermeroList 
        :enfermeros="enfermeros" 
        @edit="handleEdit" 
        @delete="handleDelete"
      />
    </div>
  </div>
</template>
