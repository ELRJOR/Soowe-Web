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
          <ChartCard title="Enfermeros dados de alta" :chartOptions="NaN" />
          <ChartCard title="Dinero generado" :chartOptions="NaN" />
          <ChartCard title="Solicitudes Asignadas" :chartOptions="NaN" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ChartCard title="Estatus de Solicitudes" :chartOptions="NaN" />
          <ChartCard title="Demográfico" :chartOptions="NaN" />
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
  series: [{ name: 'Enfermeros', type: 'line', data: [], color: '#2C5282' }]
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

// Función para obtener y procesar datos de enfermeros por mes
const fetchEnfermerosPorMes = async () => {
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

    console.log("Respuesta completa de la API:", response.data); // Verificar datos

    if (Array.isArray(response.data)) {
      const enfermerosFiltrados = response.data.filter(
        enfermero => String(enfermero.organizacion_id) === String(organizationId)
      );

      console.log("Enfermeros filtrados:", enfermerosFiltrados);

      // Objeto para agrupar enfermeros por mes (clave: 'YYYY-MM')
      const enfermerosPorMes = {};

      enfermerosFiltrados.forEach(enfermero => {
        if (!enfermero.fecha_registro) {
          console.warn("Enfermero sin fecha de registro:", enfermero);
          return;
        }

        // Convertir la fecha a un objeto Date
        const fecha = new Date(enfermero.fecha_registro);
        if (isNaN(fecha)) {
          console.warn("Fecha inválida:", enfermero.fecha_registro);
          return;
        }

        // Formato 'YYYY-MM' para agrupar
        const mesClave = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
        enfermerosPorMes[mesClave] = (enfermerosPorMes[mesClave] || 0) + 1;
      });

      // Ordenar los meses correctamente
      const mesesOrdenados = Object.keys(enfermerosPorMes).sort((a, b) => new Date(a) - new Date(b));

      // Convertir a formato 'MMM YYYY' para mostrar en la gráfica
      const etiquetasMeses = mesesOrdenados.map(mes => {
        const [year, month] = mes.split('-');
        return new Date(year, month - 1).toLocaleString('default', { month: 'short', year: 'numeric' });
      });

      // Obtener valores en el orden correcto
      const valoresEnfermeros = mesesOrdenados.map(mes => enfermerosPorMes[mes]);

      // Mostrar los datos en consola para depuración
      console.log("Meses Ordenados:", mesesOrdenados);
      console.log("Etiquetas Meses:", etiquetasMeses);
      console.log("Valores Enfermeros:", valoresEnfermeros);

      // Actualizar opciones de la gráfica
      nursesChartOptions.value = {
        xAxis: { type: 'category', data: etiquetasMeses },
        yAxis: { type: 'value' },
        series: [{ name: 'Enfermeros', type: 'line', data: valoresEnfermeros, color: '#2C5282' }]
      };
    } else {
      console.error("Respuesta no es un array:", response.data);
    }
  } catch (error) {
    console.error('Error al obtener enfermeros por mes:', error.response?.data || error);
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
  fetchEnfermerosPorMes();
});
</script>