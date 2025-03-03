<template>
  <div>
    <NavBar />
    <div class="mt-10 px-4 sm:px-6 lg:px-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-6">Solicitudes Pendientes</h3>

      <!-- Mensaje si no hay solicitudes -->
      <div v-if="filteredSolicitudes.length === 0">
        <p class="text-center text-gray-600">No hay solicitudes pendientes.</p>
      </div>

      <!-- Listado de solicitudes -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="solicitud in currentPageSolicitudes" :key="solicitud._id" 
             class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
          <h4 class="font-semibold text-lg text-gray-900">
            Solicitud #{{ solicitud.solicitud_id || 'N/A' }}
          </h4>
          <p class="text-sm text-gray-600">
            <strong>Estado:</strong> {{ solicitud.estado || 'No especificado' }}
          </p>
          <p class="text-sm text-gray-600">
            <strong>Método de pago:</strong> {{ solicitud.metodo_pago || 'No especificado' }}
          </p>
          <p class="text-sm text-gray-600">
            <strong>Fecha de solicitud:</strong>
            {{ solicitud.fecha_solicitud ? new Date(solicitud.fecha_solicitud).toLocaleDateString() : 'Sin fecha' }}
          </p>

          <!-- Botones de acción -->
          <button class="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
                  @click="fetchUserData(solicitud.usuario_id)">
            Datos del Usuario
          </button>
          <button class="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-full"
                  @click="fetchPatientData(solicitud.paciente_id)">
            Datos del Paciente
          </button>
        </div>
      </div>

      <!-- Paginación -->
      <div class="flex justify-center mt-8">
        <button class="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600 disabled:opacity-50"
                :disabled="currentPage === 1"
                @click="changePage(currentPage - 1)">
          Anterior
        </button>
        <span class="text-lg font-medium text-gray-700">Página {{ currentPage }} de {{ totalPages }}</span>
        <button class="px-4 py-2 bg-blue-500 text-white rounded-md ml-2 hover:bg-blue-600 disabled:opacity-50"
                :disabled="currentPage === totalPages"
                @click="changePage(currentPage + 1)">
          Siguiente
        </button>
      </div>

      <!-- Modal -->
      <div v-if="isUserModalOpen || isPatientModalOpen"
           class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
          <h4 class="text-xl font-semibold text-gray-900">
            {{ isUserModalOpen ? 'Datos del Usuario' : 'Datos del Paciente' }}
          </h4>
          <p><strong>Nombre:</strong> {{ selectedData?.nombre || 'No disponible' }}</p>
          <p><strong>Correo:</strong> {{ selectedData?.correo || 'No disponible' }}</p>
          <p><strong>Teléfono:</strong> {{ selectedData?.telefono || 'No disponible' }}</p>
          <p><strong>Dirección:</strong> {{ selectedData?.direccion || 'No disponible' }}</p>

          <button @click="closeModal"
                  class="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full">
            Cerrar
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getSolicitudes, getUserById, getPatientById } from '@/api/solicitudesService';
import NavBar from '@/components/DashboardComponents/NavBar.vue';

// Estado reactivo
const solicitudes = ref([]);
const currentPage = ref(1);
const pageSize = 6;

// Estados para modal y datos seleccionados
const isUserModalOpen = ref(false);
const isPatientModalOpen = ref(false);
const selectedData = ref({});

// Filtrar solicitudes pendientes
const filteredSolicitudes = computed(() => {
  return Array.isArray(solicitudes.value)
    ? solicitudes.value.filter(solicitud => solicitud.estado === 'pendiente')
    : [];
});

// Paginación
const totalPages = computed(() => Math.max(1, Math.ceil(filteredSolicitudes.value.length / pageSize)));

const currentPageSolicitudes = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  return filteredSolicitudes.value.slice(startIndex, startIndex + pageSize);
});

// Cargar solicitudes al montar el componente
onMounted(async () => {
  try {
    const response = await getSolicitudes();
    if (Array.isArray(response)) {
      solicitudes.value = response;
    } else {
      console.error('Respuesta inesperada de getSolicitudes:', response);
      solicitudes.value = [];
    }
  } catch (err) {
    console.error('Error al obtener solicitudes:', err);
    solicitudes.value = [];
  }
});

// Cambiar página
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Obtener datos del usuario
const fetchUserData = async (userId) => {
  if (!userId) {
    console.warn('Usuario ID no proporcionado.');
    return;
  }
  try {
    const user = await getUserById(userId);
    selectedData.value = user || {};
    isUserModalOpen.value = true;
    isPatientModalOpen.value = false;
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    selectedData.value = {};
  }
};

// Obtener datos del paciente
const fetchPatientData = async (patientId) => {
  if (!patientId) {
    console.warn('Paciente ID no proporcionado.');
    return;
  }
  try {
    const patient = await getPatientById(patientId);
    selectedData.value = patient || {};
    isPatientModalOpen.value = true;
    isUserModalOpen.value = false;
  } catch (error) {
    console.error('Error al obtener datos del paciente:', error);
    selectedData.value = {};
  }
};

// Cerrar modal
const closeModal = () => {
  isUserModalOpen.value = false;
  isPatientModalOpen.value = false;
  selectedData.value = {};
};
</script>

<style scoped>
/* Puedes personalizar estilos aquí */
</style>
