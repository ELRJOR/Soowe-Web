<template>
    <div class="bg-white p-6 rounded-lg shadow-lg transition-all hover:shadow-2xl">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">{{ title }}</h3>
      <!-- Asegúrate de usar VChart aquí -->
      <VChart class="h-64" :option="chartOptions" autoresize />
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import VChart from 'vue-echarts'; // Importar VChart si aún no lo has hecho
  
  const props = defineProps({
    title: String,
    chartOptions: Object, // Recibir las opciones de los gráficos
  });
  </script>
  