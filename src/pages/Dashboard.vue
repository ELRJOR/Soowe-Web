<template>
    <div>
      <NavBar />
    </div>
    <div class="bg-gray-100 min-h-screen">
      <div class="p-6 mx-20">
        <header class="flex justify-between items-center mb-6">
          <div class="flex space-x-4">
              <button
              :class="{
                'bg-primary text-white': selectedView === 'organization',
                'bg-white text-primary border border-primary': selectedView !== 'organization'
              }"
              class="p-3 rounded-lg shadow-md transition-colors hover:bg-primary hover:text-white"
              @click="changeView('organization')"
              >
              Mi Organización
            </button>
            <button
              :class="{
                'bg-primary text-white': selectedView === 'dashboard',
                'bg-white text-primary border border-primary': selectedView !== 'dashboard'
              }"
              class="p-3 rounded-lg shadow-md transition-colors hover:bg-primary hover:text-white"
              @click="changeView('dashboard')"
            >
              Mi Dashboard
            </button>
          </div>
        </header>
  
        <!-- Resumen de estadísticas -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div class="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between transition-all hover:shadow-2xl">
            <div>
              <h3 class="text-lg font-semibold text-gray-800">Solicitudes</h3>
              <p class="text-xl font-bold text-primary">{{ requestCount }}</p>
            </div>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between transition-all hover:shadow-2xl">
            <div>
              <h3 class="text-lg font-semibold text-gray-800">Enfermeros</h3>
              <p class="text-xl font-bold text-primary">{{ nurseCount }}</p>
            </div>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between transition-all hover:shadow-2xl">
            <div>
              <h3 class="text-lg font-semibold text-gray-800">Atendidas</h3>
              <p class="text-xl font-bold text-primary">{{ attendedRequests }}</p>
            </div>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between transition-all hover:shadow-2xl">
            <div>
              <h3 class="text-lg font-semibold text-gray-800">No Atendidas</h3>
              <p class="text-xl font-bold text-primary">3</p>
            </div>
          </div>
        </div>
  
        <!-- Gráficos -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div class="bg-white p-6 rounded-lg shadow-lg transition-all hover:shadow-2xl">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Pacientes</h3>
            <VChart class="h-64" :option="patientsChartOptions" autoresize />
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg transition-all hover:shadow-2xl">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Enfermeros</h3>
            <VChart class="h-64" :option="nursesChartOptions" autoresize />
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg transition-all hover:shadow-2xl">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Solicitudes Asignadas</h3>
            <VChart class="h-64" :option="assignedRequestsChartOptions" autoresize />
          </div>
        </div>
  
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="bg-white p-6 rounded-lg shadow-lg transition-all hover:shadow-2xl">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Estatus de Solicitudes</h3>
            <VChart class="h-64" :option="statusChartOptions" autoresize />
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg transition-all hover:shadow-2xl">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Demográfico</h3>
            <VChart class="h-64" :option="demographicsChartOptions" autoresize />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineAsyncComponent, ref } from 'vue';
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { BarChart, PieChart } from 'echarts/charts';
  import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
  import VChart from 'vue-echarts';
  
  use([CanvasRenderer, BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent]);
  
  const NavBar = defineAsyncComponent(() => import('@/components/DashboardComponents/NavBar.vue'));
  
  const selectedView = ref('organization');
  const requestCount = ref(50);
  const nurseCount = ref(24);
  const attendedRequests = ref(40);
  
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
  
  const changeView = (view) => {
    selectedView.value = view;
  };
  </script>
  
  <style>
  * {
    scrollbar-width: thin;
    scrollbar-color: #111827 #f1f1f1;
  }
  </style>
  