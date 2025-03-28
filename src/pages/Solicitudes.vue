<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar />
    <div class="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <!-- Título, buscador y botones de pestañas -->
      <div class="flex flex-col sm:flex-row items-center justify-between mb-8">
        <div>
          <h3 class="text-2xl font-bold text-gray-800">Solicitudes</h3>
        </div>
        <div class="flex flex-col sm:flex-row items-center gap-4">
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </span>
            <input 
              type="text" 
              v-model="searchTerm" 
              placeholder="Buscar solicitudes..." 
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm"
            >
          </div>
          <div class="flex space-x-4">
            <button 
              @click="currentTab = 'entrantes'" 
              :class="currentTab === 'entrantes' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
              class="px-4 py-2 rounded-md"
            >
              Solicitudes Entrantes
            </button>
            <button 
              @click="switchToAssigned" 
              :class="currentTab === 'asignadas' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
              class="px-4 py-2 rounded-md"
            >
              Solicitudes Asignadas
            </button>
          </div>
        </div>
      </div>

      <!-- Mensaje si no hay solicitudes según pestaña -->
      <div v-if="currentTab === 'entrantes' && filteredSolicitudes.length === 0" class="bg-white rounded-lg shadow-md p-10 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="mt-2 text-gray-600 text-lg">
          {{ solicitudes.length === 0 ? 'No hay solicitudes entrantes.' : 'No se encontraron solicitudes con ese criterio de búsqueda.' }}
        </p>
      </div>

      <div v-if="currentTab === 'asignadas' && filteredAssignedSolicitudes.length === 0" class="bg-white rounded-lg shadow-md p-10 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="mt-2 text-gray-600 text-lg">
          No hay solicitudes asignadas.
        </p>
      </div>

      <!-- Lista de solicitudes según pestaña -->
      <div v-if="currentTab === 'entrantes'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="solicitud in currentPageSolicitudes" :key="solicitud.pg_solicitud_id" 
             class="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
             @click="openModal(solicitud)">
          <div class="p-5">
            <div class="flex items-center justify-between mb-3">
              <h4 class="font-semibold text-lg text-gray-900 truncate">
                {{ solicitud.servicio?.nombre || 'Sin servicio' }}
              </h4>
              <span class="px-2 py-1 text-xs rounded-full" 
                    :class="getStatusClass(solicitud.estado)">
                {{ solicitud.estado || 'Pendiente' }}
              </span>
            </div>
            <div class="space-y-2">
              <div class="flex items-center text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {{ solicitud.metodo_pago || 'No especificado' }}
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ solicitud.fecha_solicitud ? new Date(solicitud.fecha_solicitud).toLocaleDateString() : 'Sin fecha' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Paginación para solicitudes entrantes -->
      <div v-if="currentTab === 'entrantes'" class="mt-8 flex justify-center">
        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button v-if="currentPage > 1" @click="currentPage--" 
                  class="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Anterior
          </button>
          <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
            Página {{ currentPage }} de {{ totalPages }}
          </span>
          <button v-if="currentPage < totalPages" @click="currentPage++" 
                  class="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            Siguiente
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </nav>
      </div>

      <div v-if="currentTab === 'asignadas'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <div v-for="solicitud in currentAssignedPageSolicitudes" :key="solicitud.pg_solicitud_id" 
       class="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
       @click="openModal(solicitud)">
    <div class="p-5">
      <div class="flex items-center justify-between mb-3">
        <h4 class="font-semibold text-lg text-gray-900 truncate">
          {{ solicitud.servicio?.nombre || 'Sin servicio' }}
        </h4>
        <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(solicitud.estado)">
          {{ solicitud.estado || 'Pendiente' }}
        </span>
      </div>
      <div class="space-y-2">
        <div class="flex items-center text-sm text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-400" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {{ solicitud.metodo_pago || 'No especificado' }}
        </div>
        <div class="flex items-center text-sm text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-400" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {{ solicitud.fecha_solicitud ? new Date(solicitud.fecha_solicitud).toLocaleDateString() : 'Sin fecha' }}
        </div>
        <!-- Agregar información del enfermero asignado -->
        <div class="flex items-center text-sm text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          {{ solicitud.enfermero || 'No asignado' }}
        </div>
      </div>
    </div>
  </div>
</div>

      <!-- Paginación para solicitudes asignadas -->
      <div v-if="currentTab === 'asignadas'" class="mt-8 flex justify-center">
        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button v-if="assignedCurrentPage > 1" @click="assignedCurrentPage--" 
                  class="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Anterior
          </button>
          <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
            Página {{ assignedCurrentPage }} de {{ totalAssignedPages }}
          </span>
          <button v-if="assignedCurrentPage < totalAssignedPages" @click="assignedCurrentPage++" 
                  class="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            Siguiente
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </nav>
      </div>
    </div>

    <!-- Modal para detalles de la solicitud -->
    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-xl w-11/12 max-w-4xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 class="text-2xl font-bold text-gray-800">Detalles de la Solicitud</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-6">
          <!-- Sección 1: Información básica -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="bg-gray-50 p-5 rounded-xl">
              <h3 class="font-semibold text-lg text-gray-800 mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Información Básica
              </h3>
              <div class="space-y-2">
                <p class="flex justify-between">
                  <span class="font-medium text-gray-600">ID de la Solicitud:</span> 
                  <span>{{ selectedSolicitud.pg_solicitud_id || 'N/A' }}</span>
                </p>
                <p class="flex justify-between">
                  <span class="font-medium text-gray-600">Estado:</span> 
                  <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(selectedSolicitud.estado)">
                    {{ selectedSolicitud.estado || 'No especificado' }}
                  </span>
                </p>
                <p class="flex justify-between">
                  <span class="font-medium text-gray-600">Método de Pago:</span> 
                  <span>{{ selectedSolicitud.metodo_pago || 'No especificado' }}</span>
                </p>
                <p class="flex justify-between">
                  <span class="font-medium text-gray-600">Fecha de Solicitud:</span> 
                  <span>{{ selectedSolicitud.fecha_solicitud ? new Date(selectedSolicitud.fecha_solicitud).toLocaleDateString() : 'Sin fecha' }}</span>
                </p>
                <p class="flex justify-between">
                  <span class="font-medium text-gray-600">Fecha de Servicio:</span> 
                  <span>{{ selectedSolicitud.fecha_servicio ? new Date(selectedSolicitud.fecha_servicio).toLocaleString() : 'Sin fecha' }}</span>
                </p>
              </div>
            </div>

            <!-- Sección 2: Detalles del servicio -->
            <div class="bg-gray-50 p-5 rounded-xl">
              <h3 class="font-semibold text-lg text-gray-800 mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Detalles del Servicio
              </h3>
              <div class="space-y-2">
                <p class="flex justify-between">
                  <span class="font-medium text-gray-600">Servicio:</span> 
                  <span>{{ selectedSolicitud.servicio?.nombre || 'No especificado' }}</span>
                </p>
                <p class="flex justify-between">
                  <span class="font-medium text-gray-600">Precio Estimado:</span> 
                  <span>{{ selectedSolicitud.servicio?.precio_estimado || 'No especificado' }}</span>
                </p>
                <p class="flex justify-between">
                  <span class="font-medium text-gray-600">Categoría:</span> 
                  <span>{{ selectedSolicitud.servicio?.categoria?.nombre_categoria || 'No especificado' }}</span>
                </p>
                <div>
                  <p class="font-medium text-gray-600 mb-1">Descripción:</p>
                  <p class="text-gray-700">{{ selectedSolicitud.servicio?.descripcion || 'No especificado' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sección 3: Información adicional -->
          <div class="bg-gray-50 p-5 rounded-xl mb-6">
            <h3 class="font-semibold text-lg text-gray-800 mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              Información Adicional
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="font-medium text-gray-600 mb-1">Comentarios:</p>
                <p class="text-gray-700">{{ selectedSolicitud.comentarios || 'No hay comentarios' }}</p>
              </div>
              <div>
                <p class="font-medium text-gray-600 mb-1">Ubicación:</p>
                <p class="text-gray-700">{{ selectedSolicitud.ubicacion || 'No especificada' }}</p>
              </div>
              <div>
                <p class="font-medium text-gray-600 mb-1">Paciente:</p>
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 mr-2">
                    {{ patientName ? patientName.charAt(0).toUpperCase() : '?' }}
                  </div>
                  <p class="text-gray-700">{{ patientName || 'Cargando...' }}</p>
                </div>
              </div>
              <div>
                <p class="font-medium text-gray-600 mb-1">Enfermero Asignado:</p>
                <p class="text-gray-700">{{ nurseName || 'Cargando...' }}</p>
              </div>
            </div>
          </div>

          <!-- Botón para cerrar el modal -->
          <div class="flex flex-col sm:flex-row gap-3 justify-end">
            <button @click="closeModal" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { getToken, getOrganizationId } from '@/api/auth';
import api from '@/api/conexionapi';
import { getSolicitudes, getPatientById, getNurses, assignNurseToRequest, getNurseById } from '@/api/solicitudesService';
import NavBar from '@/components/DashboardComponents/NavBar.vue';

// Solicitudes entrantes
const solicitudes = ref([]);
const searchTerm = ref('');
const currentPage = ref(1);
const pageSize = 8;

// Modal de detalles de solicitud
const isModalOpen = ref(false);
const selectedSolicitud = ref(null);
const patientName = ref('');
const nurseName = ref('');

// Solicitudes asignadas y paginación
const assignedSolicitudes = ref([]);
const assignedCurrentPage = ref(1);
const assignedPageSize = ref(8);
const filteredAssignedSolicitudes = computed(() => {
  if (!searchTerm.value.trim()) return assignedSolicitudes.value;
  const term = searchTerm.value.toLowerCase().trim();
  return assignedSolicitudes.value.filter(solicitud => {
    return (
      (solicitud.servicio?.nombre || '').toLowerCase().includes(term) ||
      (solicitud.estado || '').toLowerCase().includes(term) ||
      (solicitud.metodo_pago || '').toLowerCase().includes(term) ||
      (solicitud.comentarios || '').toLowerCase().includes(term) ||
      (solicitud.ubicacion || '').toLowerCase().includes(term) ||
      (solicitud.pg_solicitud_id?.toString() || '').includes(term)
    );
  });
});
const totalAssignedPages = computed(() => Math.max(1, Math.ceil(filteredAssignedSolicitudes.value.length / assignedPageSize.value)));
const currentAssignedPageSolicitudes = computed(() => {
  const startIndex = (assignedCurrentPage.value - 1) * assignedPageSize.value;
  return filteredAssignedSolicitudes.value.slice(startIndex, startIndex + assignedPageSize.value);
});

// Variable para la pestaña actual ("entrantes" o "asignadas")
const currentTab = ref('entrantes');

// Variables para enfermeros (modal de asignación, sin cambios en este ejemplo)
const isNurseAssignmentOpen = ref(false);
const nurses = ref([]);
const nurseSearchTerm = ref('');
const currentNursePage = ref(1);
const nursePageSize = 5;

// Computed: solicitudes entrantes filtradas y paginación
const filteredSolicitudes = computed(() => {
  if (!searchTerm.value.trim()) return solicitudes.value;
  const term = searchTerm.value.toLowerCase().trim();
  return solicitudes.value.filter(solicitud => {
    return (
      (solicitud.servicio?.nombre || '').toLowerCase().includes(term) ||
      (solicitud.estado || '').toLowerCase().includes(term) ||
      (solicitud.metodo_pago || '').toLowerCase().includes(term) ||
      (solicitud.comentarios || '').toLowerCase().includes(term) ||
      (solicitud.ubicacion || '').toLowerCase().includes(term) ||
      (solicitud.pg_solicitud_id?.toString() || '').includes(term)
    );
  });
});
const totalPages = computed(() => Math.max(1, Math.ceil(filteredSolicitudes.value.length / pageSize)));
const currentPageSolicitudes = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  return filteredSolicitudes.value.slice(startIndex, startIndex + pageSize);
});

// Watchers para reiniciar paginación
watch(searchTerm, () => { 
  currentPage.value = 1; 
  assignedCurrentPage.value = 1;
});
watch(nurseSearchTerm, () => { currentNursePage.value = 1; });

// Función para la clase del estado
const getStatusClass = (estado) => {
  if (!estado) return 'bg-gray-100 text-gray-800';
  switch (estado.toLowerCase()) {
    case 'pendiente': return 'bg-yellow-100 text-yellow-800';
    case 'asignado': return 'bg-blue-100 text-blue-800';
    case 'completado': return 'bg-green-100 text-green-800';
    case 'cancelado': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Obtener solicitudes entrantes al montar el componente
onMounted(async () => {
  try {
    const data = await getSolicitudes();
    solicitudes.value = data;
    console.log('Solicitudes obtenidas:', solicitudes.value);
    // Si la pestaña actual es "asignadas", cargar también esas solicitudes
    if (currentTab.value === 'asignadas') await loadAssigned();
  } catch (err) {
    console.error('Error al obtener solicitudes:', err);
  }
});

// Función para cargar solicitudes asignadas
const loadAssigned = async () => {
  try {
    const orgId = getOrganizationId();
    const token = getToken();
    if (!orgId || !token) {
      console.error('No se encontró el id de la organización o el token');
      return;
    }
    const response = await api.get(`/api/admin/organizaciones/${orgId}/solicitudes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // Obtener información de enfermeros para cada solicitud
    const solicitudesConEnfermeros = await Promise.all(
      response.data.map(async solicitud => {
        if (solicitud.enfermero_id) {
          try {
            const nurse = await getNurseById(solicitud.enfermero_id);
            return {
              ...solicitud,
              enfermero: nurse ? `${nurse.nombre} ${nurse.apellido}` : 'No asignado'
            };
          } catch (error) {
            console.error('Error al obtener enfermero:', error);
            return {
              ...solicitud,
              enfermero: 'Error al cargar'
            };
          }
        }
        return {
          ...solicitud,
          enfermero: 'No asignado'
        };
      })
    );
    
    assignedSolicitudes.value = solicitudesConEnfermeros;
  } catch (error) {
    console.error('Error al obtener las solicitudes asignadas:', error);
  }
};

// Función para cambiar a la pestaña de asignadas y cargar datos
const switchToAssigned = async () => {
  currentTab.value = 'asignadas';
  await loadAssigned();
};

// Abrir modal de detalles de solicitud
const openModal = async (solicitud) => {
  selectedSolicitud.value = solicitud;
  isModalOpen.value = true;
  
  // Obtener nombre del paciente
  try {
    const patient = await getPatientById(solicitud.paciente_id);
    patientName.value = patient.nombre || 'Nombre no disponible';
  } catch (error) {
    console.error('Error al obtener el nombre del paciente:', error);
    patientName.value = 'Error al cargar el nombre';
  }

  // Obtener el nombre del enfermero asignado (si existe)
  if (solicitud.enfermero_id) {
    try {
      const nurse = await getNurseById(solicitud.enfermero_id); // Llamada a la función
      if (nurse && nurse.nombre && nurse.apellido) {
        nurseName.value = `${nurse.nombre} ${nurse.apellido}`;  // Mostrar el nombre completo del enfermero
      } else {
        nurseName.value = 'No asignado'; // Si no tiene nombre o apellido
      }
    } catch (error) {
      console.error('Error al obtener el enfermero:', error);
      nurseName.value = 'No asignado'; // Si no se puede obtener el enfermero, muestra 'No asignado'
    }
  } else {
    nurseName.value = 'No asignado'; // Si no hay enfermero asignado
  }
};


// Cerrar modal de detalles
const closeModal = () => {
  isModalOpen.value = false;
  selectedSolicitud.value = null;
  patientName.value = '';
  nurseName.value = '';
};
</script>

<style scoped>
/* Transiciones suaves */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Sombras */
.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Bordes redondeados */
.rounded-xl {
  border-radius: 0.75rem;
}

/* Hover */
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
