<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar />
    <div class="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Panel de Control</h1>
          <p class="text-gray-500">Bienvenido de nuevo,  <span class="font-medium text-blue-600">{{ adminName }}</span></p>
        </div>
        <ViewButtons :selectedView="selectedView" :changeView="changeView" />
      </header>

      <!-- Resumen de estadísticas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <StatsCard title="Enfermeros Registrados" :value="nurseCount" />
        <StatsCard title="Solicitudes Entrantes" :value="incomingRequests" />
        <StatsCard title="Solicitudes Completadas" :value="completedRequests" />
        <StatsCard title="Dinero Neto Generado" :value="netRevenue" />
      </div>

      <!-- Gráficos -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        <ChartCard title="Enfermeros dados de alta" :chartOptions="nursesChartOptions" />
        <ChartCard title="Dinero generado" :chartOptions="patientsChartOptions" />
        <ChartCard title="Solicitudes Asignadas" :chartOptions="assignedRequestsChartOptions" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <ChartCard title="Estatus de Solicitudes" :chartOptions="statusChartOptions" />
        <ChartCard title="Demográfico" :chartOptions="demographicsChartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getToken, getOrganizationId } from '../api/auth';
import api from '../api/conexionapi';
import * as echarts from 'echarts';

// Importar componentes
import NavBar from '@/components/DashboardComponents/NavBar.vue';
import ViewButtons from '@/components/DashboardComponents/ViewButtons.vue';
import StatsCard from '@/components/DashboardComponents/StatsCard.vue';
import ChartCard from '@/components/DashboardComponents/ChartCard.vue';

// Variables reactivas
const adminName = ref("Administrador");
const selectedView = ref('organization');
const nurseCount = ref(0);
const incomingRequests = ref(0);
const completedRequests = ref(0);
const netRevenue = ref(0);

// Opciones de gráficos
const patientsChartOptions = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: { 
    type: 'category', 
    data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    axisLabel: {
      color: '#64748b'
    }
  },
  yAxis: { 
    type: 'value',
    axisLabel: {
      color: '#64748b'
    }
  },
  series: [{ 
    name: 'Ingresos', 
    type: 'bar', 
    data: [2500, 3800, 5200, 4900, 7300, 9200], 
    itemStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#3b82f6' },
        { offset: 1, color: '#60a5fa' }
      ])
    },
    emphasis: {
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#2563eb' },
          { offset: 1, color: '#3b82f6' }
        ])
      }
    }
  }]
});

const nursesChartOptions = ref({
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: { 
    type: 'category', 
    data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    axisLabel: {
      color: '#64748b'
    }
  },
  yAxis: { 
    type: 'value',
    axisLabel: {
      color: '#64748b'
    }
  },
  series: [{ 
    name: 'Enfermeros', 
    type: 'line', 
    smooth: true,
    data: [5, 8, 12, 15, 22, 28], 
    lineStyle: {
      width: 3,
      color: '#2563eb'
    },
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: 'rgba(37, 99, 235, 0.5)' },
        { offset: 1, color: 'rgba(37, 99, 235, 0.1)' }
      ])
    },
    symbol: 'circle',
    symbolSize: 8,
    itemStyle: {
      color: '#2563eb',
      borderColor: '#fff',
      borderWidth: 2
    }
  }]
});

const assignedRequestsChartOptions = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: { 
    type: 'category', 
    data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    axisLabel: {
      color: '#64748b'
    }
  },
  yAxis: { 
    type: 'value',
    axisLabel: {
      color: '#64748b'
    }
  },
  series: [{ 
    name: 'Solicitudes', 
    type: 'bar', 
    data: [12, 19, 23, 18, 25, 31], 
    itemStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#f59e0b' },
        { offset: 1, color: '#fbbf24' }
      ])
    },
    emphasis: {
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#d97706' },
          { offset: 1, color: '#f59e0b' }
        ])
      }
    }
  }]
});

const statusChartOptions = ref({
  tooltip: { 
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: { 
    orient: 'vertical',
    right: 10,
    top: 'center',
    textStyle: {
      color: '#64748b'
    }
  },
  series: [
    {
      name: 'Estatus',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '18',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 48, name: 'Completadas', itemStyle: { color: '#10b981' } },
        { value: 32, name: 'En Proceso', itemStyle: { color: '#3b82f6' } },
        { value: 20, name: 'Canceladas', itemStyle: { color: '#ef4444' } }
      ]
    }
  ]
});

const demographicsChartOptions = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    axisLabel: {
      color: '#64748b'
    },
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  yAxis: {
    type: 'category',
    data: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
    axisLabel: {
      color: '#64748b'
    }
  },
  series: [
    {
      name: 'Hombres',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [8, 15, 12, 10, 7, 4],
      itemStyle: {
        color: '#3b82f6'
      }
    },
    {
      name: 'Mujeres',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [10, 18, 15, 12, 9, 6],
      itemStyle: {
        color: '#ec4899'
      }
    }
  ]
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

const fetchAdminDetails = async () => {
  try {
    const token = getToken();
    const orgId = getOrganizationId();  // Usamos el id almacenado en localStorage
    if (!token || !orgId) {
      console.error("Token o id de la organización no válidos");
      return;
    }
    
    const response = await api.get('/api/admin/administradores', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (Array.isArray(response.data)) {
      const admin = response.data.find(item => String(item.organizacion_id) === String(orgId));
      if (admin) {
        adminName.value = `${admin.nombre} ${admin.apellido}`;
      } else {
        console.warn("No se encontró un administrador para la organizacion_id:", orgId);
      }
    } else {
      console.error("La respuesta no es un array:", response.data);
    }
  } catch (error) {
    console.error("Error al obtener los detalles del administrador:", error.response?.data || error);
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
  fetchAdminDetails();
});
</script>

<style scoped>
/* Animación de entrada para los componentes */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.grid > * {
  animation: fadeIn 0.5s ease-out forwards;
}

.grid > *:nth-child(1) { animation-delay: 0.1s; }
.grid > *:nth-child(2) { animation-delay: 0.2s; }
.grid > *:nth-child(3) { animation-delay: 0.3s; }
.grid > *:nth-child(4) { animation-delay: 0.4s; }
</style>

