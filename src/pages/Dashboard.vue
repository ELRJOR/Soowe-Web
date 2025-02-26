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
          <StatsCard title="Atendidas" :value="attendedRequests" />
          <StatsCard title="No Atendidas" :value="3" />
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
import { ref } from 'vue';
import NavBar from '@/components/DashboardComponents/NavBar.vue';
import ViewButtons from '@/components/DashboardComponents/ViewButtons.vue';
import StatsCard from '@/components/DashboardComponents/StatsCard.vue';
import ChartCard from '@/components/DashboardComponents/ChartCard.vue';
import * as echarts from 'echarts'; // Asegúrate de importar echarts correctamente

// Variables para las estadísticas
const selectedView = ref('organization');
const requestCount = ref(50);
const nurseCount = ref(24);
const attendedRequests = ref(40);

// Opciones para los gráficos
const patientsChartOptions = ref({
  xAxis: { type: 'category', data: ['Enero', 'Febrero', 'Marzo', 'Abril'] },
  yAxis: { type: 'value' },
  series: [{ name: 'Pacientes', type: 'bar', data: [10, 20, 30, 40], color: '#3182CE' }]
});

const nursesChartOptions = ref({
  xAxis: { type: 'category', data: ['Turno 1', 'Turno 2', 'Turno 3'] },
  yAxis: { type: 'value' },
  series: [{ name: 'Enfermeros', type: 'bar', data: [8, 10, 6], color: '#2C5282' }]
});

const assignedRequestsChartOptions = ref({
  xAxis: { type: 'category', data: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'] },
  yAxis: { type: 'value' },
  series: [{ name: 'Solicitudes', type: 'bar', data: [12, 15, 10, 18, 20], color: '#D69E2E' }]
});

const statusChartOptions = ref({
  tooltip: { trigger: 'item' },
  legend: { top: '5%', left: 'center' },
  series: [
    {
      name: 'Estatus',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 30, name: 'Completadas' },
        { value: 5, name: 'Canceladas' },
        { value: 15, name: 'Pendientes' }
      ],
      color: ['#38A169', '#E53E3E', '#DD6B20']
    }
  ]
});

const demographicsChartOptions = ref({
  xAxis: { type: 'category', data: ['Hombres', 'Mujeres', 'Otros'] },
  yAxis: { type: 'value' },
  series: [{ name: 'Demográfico', type: 'bar', data: [20, 25, 5], color: '#805AD5' }]
});

// Función para cambiar la vista
const changeView = (view) => {
  selectedView.value = view;
};
</script>
