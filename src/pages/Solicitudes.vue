<template>
    <div>
      <NavBar />
      <div class="mt-10 px-4 sm:px-6 lg:px-8">
        <h3 class="text-2xl font-semibold text-gray-800 mb-6">Solicitudes Pendientes</h3>
  
        <!-- Verifica si hay solicitudes, si no muestra un mensaje -->
        <div v-if="filteredSolicitudes.length === 0">
          <p class="text-center text-gray-600">No hay solicitudes pendientes.</p>
        </div>
  
        <!-- Muestra las solicitudes filtradas y paginadas -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="solicitud in currentPageSolicitudes" :key="solicitud._id" class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
               @click="openModal(solicitud)">
            <h4 class="font-semibold text-lg text-gray-900">Solicitud #{{ solicitud.solicitud_id }}</h4>
            <p class="text-sm text-gray-600"><strong>Estado:</strong> {{ solicitud.estado || 'No especificado' }}</p>
            <p class="text-sm text-gray-600"><strong>Método de pago:</strong> {{ solicitud.metodo_pago || 'No especificado' }}</p>
            <p class="text-sm text-gray-600"><strong>Fecha de solicitud:</strong> {{ new Date(solicitud.fecha_solicitud).toLocaleDateString() || 'Sin fecha' }}</p>
          </div>
        </div>
  
        <!-- Paginación -->
        <div class="flex justify-center mt-8">
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600 disabled:opacity-50"
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          >
            Anterior
          </button>
          <span class="text-lg font-medium text-gray-700">Página {{ currentPage }} de {{ totalPages }}</span>
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded-md ml-2 hover:bg-blue-600 disabled:opacity-50"
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
          >
            Siguiente
          </button>
        </div>
  
        <!-- Modal de detalles de solicitud -->
        <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div class="bg-white p-6 rounded-lg shadow-lg w-96">
            <h4 class="text-xl font-semibold text-gray-900">Detalles de Solicitud #{{ selectedSolicitud.solicitud_id }}</h4>
            <p><strong>Usuario ID:</strong> {{ selectedSolicitud.usuario_id }}</p>
            <p><strong>Paciente ID:</strong> {{ selectedSolicitud.paciente_id }}</p>
            <p><strong>Fecha de solicitud:</strong> {{ new Date(selectedSolicitud.fecha_solicitud).toLocaleString() }}</p>
            <p><strong>Estado:</strong> {{ selectedSolicitud.estado }}</p>
            <p><strong>Método de pago:</strong> {{ selectedSolicitud.metodo_pago }}</p>
            <p><strong>Comentarios:</strong> {{ selectedSolicitud.comentarios || 'Sin comentarios' }}</p>
  
            <button
              @click="closeModal"
              class="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { getSolicitudes } from '@/api/solicitudesService'; // Servicio para obtener las solicitudes
  import NavBar from '@/components/DashboardComponents/NavBar.vue'; // Componente NavBar
  
  // Estado reactivo para almacenar las solicitudes
  const solicitudes = ref([]);
  const currentPage = ref(1);
  const pageSize = 6; // Número de solicitudes por página
  
  // Estado para el modal
  const isModalOpen = ref(false);
  const selectedSolicitud = ref(null);
  
  // Filtrar solo las solicitudes con estado 'pendiente'
  const filteredSolicitudes = computed(() => {
    return solicitudes.value.filter(solicitud => solicitud.estado === 'pendiente');
  });
  
  // Dividir las solicitudes filtradas en páginas
  const totalPages = computed(() => {
    return Math.ceil(filteredSolicitudes.value.length / pageSize);
  });
  
  const currentPageSolicitudes = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredSolicitudes.value.slice(startIndex, endIndex);
  });
  
  // Llamar a la API para obtener las solicitudes cuando el componente se monta
  onMounted(async () => {
    try {
      const response = await getSolicitudes();
      solicitudes.value = response;
    } catch (err) {
      console.error('Error al obtener solicitudes:', err);
    }
  });
  
  // Función para cambiar de página
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };
  
  // Función para abrir el modal con la información de la solicitud seleccionada
  const openModal = (solicitud) => {
    selectedSolicitud.value = solicitud;
    isModalOpen.value = true;
  };
  
  // Función para cerrar el modal
  const closeModal = () => {
    isModalOpen.value = false;
    selectedSolicitud.value = null;
  };
  </script>
  
  <style scoped>
  /* Estilos opcionales para personalizar el modal */
  </style>
  