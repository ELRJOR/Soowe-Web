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
          <StatsCard title="Enfermeros Registrados" :value="nurseCount" />
          <StatsCard title="Solicitudes Entrantes" :value="incomingRequests" />
          <StatsCard title="Solicitudes Completadas" :value="completedRequests" />
          <StatsCard title="Dinero Neto Generado" :value="netRevenue" />
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
const nurseCount = ref(0);
const incomingRequests = ref(0);
const completedRequests = ref(0);
const netRevenue = ref(0); // Dinero neto generado

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

// Función para obtener solicitudes entrantes
const fetchIncomingRequests = async () => {
  try {
    const token = getToken();
    const organizationId = getOrganizationId();

    if (!token || !organizationId) {
      console.error("Token u organización no válidos");
      return;
    }

    const response = await api.get('/api/admin/solicitudes/entrantes', {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (Array.isArray(response.data)) {
      incomingRequests.value = response.data.length;
    } else {
      console.error("Respuesta no es un array:", response.data);
    }
  } catch (error) {
    console.error('Error en solicitudes entrantes:', error.response?.data || error);
  }
};

// Función para obtener solicitudes completadas y calcular el dinero neto generado
const fetchCompletedRequests = async () => {
  try {
    const token = getToken();
    const organizationId = getOrganizationId();

    if (!token || !organizationId) {
      console.error("Token u organización no válidos");
      return;
    }

    const response = await api.get(`/api/admin/organizaciones/${organizationId}/solicitudes`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (Array.isArray(response.data)) {
      // Filtrar solicitudes completadas
      const solicitudesCompletadas = response.data.filter(
        solicitud => solicitud.estado.trim().toLowerCase() === 'completado'
      );
      completedRequests.value = solicitudesCompletadas.length;

      // Calcular dinero neto generado
      netRevenue.value = solicitudesCompletadas.reduce((total, solicitud) => {
        // Convertir el precio_estimado a número y sumarlo
        const precio = parseFloat(solicitud.servicio.precio_estimado) || 0;
        return total + precio;
      }, 0);
    } else {
      console.error("Respuesta no es un array:", response.data);
    }
  } catch (error) {
    console.error('Error en solicitudes completadas:', error.response?.data || error);
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

    const response = await api.get('/api/mobile/enfermeros', {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (Array.isArray(response.data)) {
      const enfermerosFiltrados = response.data.filter(
        enfermero => String(enfermero.organizacion_id) === String(organizationId)
      );
      nurseCount.value = enfermerosFiltrados.length;
    } else {
      console.error("Respuesta no es un array:", response.data);
    }
  } catch (error) {
    console.error('Error en enfermeros:', error.response?.data || error);
  }
};

// Al montar el componente
onMounted(() => {
  fetchEnfermeros();
  fetchIncomingRequests();
  fetchCompletedRequests();
});
</script>