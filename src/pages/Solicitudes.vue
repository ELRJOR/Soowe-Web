<template>
  <div>
    <NavBar />
    <div class="mt-10 px-4 sm:px-6 lg:px-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-6">Solicitudes Entrantes</h3>

      <!-- Mensaje si no hay solicitudes -->
      <div v-if="solicitudes.length === 0">
        <p class="text-center text-gray-600">No hay solicitudes entrantes.</p>
      </div>

      <!-- Lista de solicitudes -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="solicitud in currentPageSolicitudes" :key="solicitud.pg_solicitud_id" 
             class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
             @click="openModal(solicitud)">
          <h4 class="font-semibold text-lg text-gray-900">
            Solicitud #{{ solicitud.pg_solicitud_id || 'N/A' }}
          </h4>
          <p class="text-sm text-gray-600"><strong>Estado:</strong> {{ solicitud.estado || 'No especificado' }}</p>
          <p class="text-sm text-gray-600"><strong>Método de pago:</strong> {{ solicitud.metodo_pago || 'No especificado' }}</p>
          <p class="text-sm text-gray-600"><strong>Fecha de solicitud:</strong> {{ solicitud.fecha_solicitud ? new Date(solicitud.fecha_solicitud).toLocaleDateString() : 'Sin fecha' }}</p>
        </div>
      </div>

      <!-- Paginación de solicitudes -->
      <div class="mt-6 flex justify-center">
        <button v-if="currentPage > 1" @click="currentPage--" class="px-4 py-2 bg-gray-300 rounded-md mr-2">
          Anterior
        </button>
        <button v-if="currentPage < totalPages" @click="currentPage++" class="px-4 py-2 bg-gray-300 rounded-md">
          Siguiente
        </button>
      </div>

      <!-- Modal para detalles de la solicitud -->
      <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-8 rounded-lg w-11/12 max-w-4xl shadow-2xl max-h-[90vh] overflow-y-auto">
          <h2 class="text-2xl font-semibold mb-6 text-blue-600">Detalles de la Solicitud</h2>

          <!-- Sección 1: Información básica -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="font-semibold text-lg text-gray-800 mb-2">Información Básica</h3>
              <p><strong>ID de la Solicitud:</strong> {{ selectedSolicitud.pg_solicitud_id || 'N/A' }}</p>
              <p><strong>Estado:</strong> {{ selectedSolicitud.estado || 'No especificado' }}</p>
              <p><strong>Método de Pago:</strong> {{ selectedSolicitud.metodo_pago || 'No especificado' }}</p>
              <p><strong>Fecha de Solicitud:</strong> {{ selectedSolicitud.fecha_solicitud ? new Date(selectedSolicitud.fecha_solicitud).toLocaleDateString() : 'Sin fecha' }}</p>
              <p><strong>Fecha de Servicio:</strong> {{ selectedSolicitud.fecha_servicio ? new Date(selectedSolicitud.fecha_servicio).toLocaleString() : 'Sin fecha' }}</p>
            </div>

            <!-- Sección 2: Detalles del servicio -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="font-semibold text-lg text-gray-800 mb-2">Detalles del Servicio</h3>
              <p><strong>Servicio:</strong> {{ selectedSolicitud.servicio?.nombre || 'No especificado' }}</p>
              <p><strong>Precio Estimado:</strong> {{ selectedSolicitud.servicio?.precio_estimado || 'No especificado' }}</p>
              <p><strong>Descripción:</strong> {{ selectedSolicitud.servicio?.descripcion || 'No especificado' }}</p>
              <p><strong>Categoría:</strong> {{ selectedSolicitud.servicio?.categoria?.nombre_categoria || 'No especificado' }}</p>
            </div>
          </div>

          <!-- Sección 3: Información adicional -->
          <div class="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 class="font-semibold text-lg text-gray-800 mb-2">Información Adicional</h3>
            <p><strong>Comentarios:</strong> {{ selectedSolicitud.comentarios || 'No hay comentarios' }}</p>
            <p><strong>Ubicación:</strong> {{ selectedSolicitud.ubicacion || 'No especificada' }}</p>
            <p><strong>Paciente:</strong> {{ patientName || 'Cargando...' }}</p>
            <p><strong>Enfermero Asignado:</strong> {{ selectedSolicitud.enfermero_id ? `ID: ${selectedSolicitud.enfermero_id}` : 'No asignado' }}</p>
          </div>

          <!-- Botón para asignar enfermero -->
          <button @click="openNurseAssignment" class="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
            Asignar Enfermero
          </button>

          <!-- Botón para cerrar el modal -->
          <button @click="closeModal" class="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            Cerrar
          </button>
        </div>
      </div>

      <!-- Modal para asignar enfermero -->
      <div v-if="isNurseAssignmentOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-8 rounded-lg w-11/12 max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
          <h2 class="text-2xl font-semibold mb-6 text-blue-600">Asignar Enfermero</h2>

          <!-- Lista de enfermeros -->
          <div v-if="nurses.length > 0">
            <div v-for="nurse in currentPageNurses" :key="nurse.enfermero_id" 
                 class="p-4 mb-2 border rounded-lg cursor-pointer hover:bg-gray-50"
                 @click="assignNurse(nurse.enfermero_id)">
              <p class="font-semibold">{{ nurse.nombre }}</p>
              <p class="text-sm text-gray-600">ID: {{ nurse.enfermero_id }}</p>
            </div>
          </div>
          <div v-else>
            <p class="text-center text-gray-600">No hay enfermeros disponibles.</p>
          </div>

          <!-- Paginación de enfermeros -->
          <div class="mt-6 flex justify-center">
            <button v-if="currentNursePage > 1" @click="currentNursePage--" class="px-4 py-2 bg-gray-300 rounded-md mr-2">
              Anterior
            </button>
            <button v-if="currentNursePage < totalNursePages" @click="currentNursePage++" class="px-4 py-2 bg-gray-300 rounded-md">
              Siguiente
            </button>
          </div>

          <!-- Botón para cerrar el modal de asignación -->
          <button @click="closeNurseAssignment" class="mt-6 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getSolicitudes, getPatientById, getNurses, assignNurseToRequest } from '@/api/solicitudesService';
import NavBar from '@/components/DashboardComponents/NavBar.vue';

// Variables reactivas
const solicitudes = ref([]);
const currentPage = ref(1);
const pageSize = 6;
const isModalOpen = ref(false);
const isNurseAssignmentOpen = ref(false);
const selectedSolicitud = ref(null);
const patientName = ref('');
const nurses = ref([]);

// Variables para la paginación de enfermeros
const currentNursePage = ref(1);
const nursePageSize = 5; // Número de enfermeros por página

// Calcular enfermeros para la página actual
const currentPageNurses = computed(() => {
  const startIndex = (currentNursePage.value - 1) * nursePageSize;
  return nurses.value.slice(startIndex, startIndex + nursePageSize);
});

// Calcular el número total de páginas de enfermeros
const totalNursePages = computed(() => Math.ceil(nurses.value.length / nursePageSize));

// Paginación de solicitudes
const totalPages = computed(() => Math.max(1, Math.ceil(solicitudes.value.length / pageSize)));
const currentPageSolicitudes = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  return solicitudes.value.slice(startIndex, startIndex + pageSize);
});

// Obtener solicitudes al montar el componente
onMounted(async () => {
  try {
    const data = await getSolicitudes();
    solicitudes.value = data; // Asigna los datos a la variable reactiva
    console.log('Solicitudes obtenidas:', solicitudes.value); // Verifica los datos en la consola
  } catch (err) {
    console.error('Error al obtener solicitudes:', err);
  }
});

// Abrir modal con los detalles de la solicitud
const openModal = async (solicitud) => {
  selectedSolicitud.value = solicitud;
  isModalOpen.value = true;

  // Obtener el nombre del paciente
  try {
    const patient = await getPatientById(solicitud.paciente_id);
    patientName.value = patient.nombre || 'Nombre no disponible';
  } catch (error) {
    console.error('Error al obtener el nombre del paciente:', error);
    patientName.value = 'Error al cargar el nombre';
  }
};

// Cerrar modal
const closeModal = () => {
  isModalOpen.value = false;
  selectedSolicitud.value = null;
  patientName.value = ''; // Limpiar el nombre del paciente al cerrar el modal
};

// Abrir modal de asignación de enfermero
const openNurseAssignment = async () => {
  try {
    const data = await getNurses(); // Obtener la lista de enfermeros de la organización
    nurses.value = data;
    isNurseAssignmentOpen.value = true;
    currentNursePage.value = 1; // Reiniciar la paginación al abrir el modal
  } catch (error) {
    console.error('Error al obtener la lista de enfermeros:', error);
  }
};

// Cerrar modal de asignación de enfermero
const closeNurseAssignment = () => {
  isNurseAssignmentOpen.value = false;
  nurses.value = []; // Limpiar la lista de enfermeros
};

// Asignar enfermero a la solicitud
const assignNurse = async (enfermeroId) => {
  try {
    await assignNurseToRequest(selectedSolicitud.value.pg_solicitud_id, enfermeroId);
    alert('Enfermero asignado con éxito');
    closeNurseAssignment(); // Cerrar el modal de asignación
    closeModal(); // Cerrar el modal de detalles
    solicitudes.value = await getSolicitudes(); // Actualizar la lista de solicitudes
  } catch (error) {
    console.error('Error al asignar enfermero:', error);
    alert('Error al asignar enfermero');
  }
};
</script>

<style scoped>
/* Estilos personalizados */
</style>