<template>
  <div>
    <NavBar />
    <div class="bg-gray-100 min-h-screen">
      <div class="p-6 mx-20">
        <header class="flex justify-between items-center mb-6">
          <ViewButtons :selectedView="selectedView" :changeView="changeView" />
        </header>

        <!-- Resumen de estadísticas -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <StatsCard title="Solicitudes" :value="requestCount" />
          <StatsCard title="Enfermeros" :value="nurseCount" />
          <StatsCard title="Solicitudes Atendidas" :value="attendedRequests" />
          <StatsCard title="Solicitudes Pendientes" :value="pendingRequests" />
        </div>

        <!-- Gráficos -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <ChartCard title="Pacientes" :chartOptions="patientsChartOptions" />
          <ChartCard title="Enfermeros" :chartOptions="nursesChartOptions" />
          <ChartCard title="Solicitudes Asignadas" :chartOptions="assignedRequestsChartOptions" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ChartCard title="Estatus de Solicitudes" :chartOptions="statusChartOptions" />
          <ChartCard title="Demográfico" :chartOptions="demographicsChartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getToken, getOrganizationId } from '../api/auth'; // Ajusta la ruta
import api from '../api/conexionapi'; // Ajusta la ruta
import * as echarts from 'echarts';

// Importar componentes
import NavBar from '@/components/DashboardComponents/NavBar.vue'; // Ajusta la ruta
import ViewButtons from '@/components/DashboardComponents/ViewButtons.vue'; // Ajusta la ruta
import StatsCard from '@/components/DashboardComponents/StatsCard.vue'; // Ajusta la ruta
import ChartCard from '@/components/DashboardComponents/ChartCard.vue'; // Ajusta la ruta

// Variables reactivas
const selectedView = ref('organization');
const requestCount = ref(0);
const nurseCount = ref(0);
const attendedRequests = ref(0);
const pendingRequests = ref(0);

// Opciones de gráficos (inicialmente vacías, se actualizarán dinámicamente)
const patientsChartOptions = ref({
  xAxis: { type: 'category', data: [] },
  yAxis: { type: 'value' },
  series: [{ name: 'Pacientes', type: 'bar', data: [], color: '#3182CE' }]
});

const nursesChartOptions = ref({
  xAxis: { type: 'category', data: [] },
  yAxis: { type: 'value' },
  series: [{ name: 'Enfermeros', type: 'bar', data: [], color: '#2C5282' }]
});

const assignedRequestsChartOptions = ref({
  xAxis: { type: 'category', data: [] },
  yAxis: { type: 'value' },
  series: [{ name: 'Solicitudes', type: 'bar', data: [], color: '#D69E2E' }]
});

const statusChartOptions = ref({
  tooltip: { trigger: 'item' },
  legend: { top: '5%', left: 'center' },
  series: [
    {
      name: 'Estatus',
      type: 'pie',
      radius: '50%',
      data: [],
      color: ['#38A169', '#E53E3E', '#DD6B20']
    }
  ]
});

const demographicsChartOptions = ref({
  xAxis: { type: 'category', data: [] },
  yAxis: { type: 'value' },
  series: [{ name: 'Demográfico', type: 'bar', data: [], color: '#805AD5' }]
});

// Función para cambiar la vista
const changeView = (view) => {
  selectedView.value = view;
};


// Función para obtener solicitudes
const fetchSolicitudes = async () => {
  try {
    const token = getToken();
    const organizationId = getOrganizationId();

    if (!token || !organizationId) {
      console.error("Token u organización no válidos");
      return;
    }

    const response = await api.get('/api/mobile/solicitudes');
    
    // Verificar estructura de respuesta
    if (Array.isArray(response.data)) {
      console.log("Datos de solicitudes:", response.data); // Depuración

      requestCount.value = response.data.length;

      // Solicitudes atendidas
      const solicitudesAtendidas = response.data.filter(
        solicitud => solicitud.estado.trim().toLowerCase() === 'atendida'
      );
      attendedRequests.value = solicitudesAtendidas.length;

      // Solicitudes pendientes
      const solicitudesPendientes = response.data.filter(
        solicitud => solicitud.estado.trim().toLowerCase() === 'pendiente'
      );
      console.log("Solicitudes pendientes:", solicitudesPendientes); // Depuración
      pendingRequests.value = solicitudesPendientes.length;

      // Si el conteo sigue siendo incorrecto, prueba con un filtro más estricto:
      /*
      const solicitudesPendientesEstricto = response.data.filter(
        solicitud => solicitud.estado === 'Pendiente'
      );
      console.log("Solicitudes pendientes (filtro estricto):", solicitudesPendientesEstricto);
      pendingRequests.value = solicitudesPendientesEstricto.length;
      */

      // Actualizar gráfico de estado de solicitudes
      statusChartOptions.value.series[0].data = [
        { value: attendedRequests.value, name: 'Atendidas' },
        { value: pendingRequests.value, name: 'Pendientes' }
      ];
    } else {
      console.error("Respuesta no es un array:", response.data);
    }
  } catch (error) {
    console.error('Error en solicitudes:', error.response?.data || error);
  }
};

// Función para obtener enfermeros
const fetchEnfermeros = async () => {
  try {
    const token = getToken();
    const organizationId = getOrganizationId();

    if (!token || !organizationId) {
      console.error("Token u organización no válidos");
      return;
    }

    const response = await api.get('/api/mobile/enfermeros');
    
    // Verificar estructura de respuesta
    if (Array.isArray(response.data)) {
      console.log("Respuesta de la API (enfermeros):", response.data); // Depuración

      // Comparar organizationId con los valores de organizacion_id
      console.log("Organization ID:", organizationId);
      console.log("Valores de organizacion_id en los datos:", response.data.map(e => e.organizacion_id));

      // Filtrar enfermeros con organizacion_id definido
      const enfermerosConOrganizacion = response.data.filter(
        enfermero => enfermero.organizacion_id !== null && enfermero.organizacion_id !== undefined
      );
      console.log("Enfermeros con organizacion_id definido:", enfermerosConOrganizacion);
      console.log("Número de enfermeros con organizacion_id definido:", enfermerosConOrganizacion.length);

      // Filtrar enfermeros por organización
      const enfermerosFiltrados = response.data.filter(
        enfermero => String(enfermero.organizacion_id) === String(organizationId)
      );
      console.log("Enfermeros filtrados:", enfermerosFiltrados); // Depuración
      nurseCount.value = enfermerosFiltrados.length;

      // Actualizar gráfico de enfermeros
      nursesChartOptions.value.xAxis.data = ['Turno 1', 'Turno 2', 'Turno 3']; // Ejemplo de turnos
      nursesChartOptions.value.series[0].data = [8, 10, 6]; // Ejemplo de datos
    } else {
      console.error("Respuesta no es un array:", response.data);
    }
  } catch (error) {
    console.error('Error en enfermeros:', error.response?.data || error);
  }
};

// Al montar el componente
onMounted(() => {
  fetchSolicitudes();
  fetchEnfermeros();
});
</script>