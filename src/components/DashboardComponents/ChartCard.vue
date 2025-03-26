<template>
  <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
    <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-50"></div>
    
    <h3 class="text-xl font-semibold text-gray-800 mb-4 relative z-10 flex items-center">
      <span class="mr-2">{{ title }}</span>
      <span class="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
    </h3>
    
    <!-- Chart container with subtle loading animation -->
    <div class="relative">
      <VChart class="h-64 w-full transition-opacity duration-500" :option="chartOptions" autoresize />
      
      <!-- Overlay for empty charts -->
      <div v-if="!isValidChart" class="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-70 rounded-lg">
        <div class="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p class="text-gray-500">Cargando datos...</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { defineProps, computed } from 'vue';
import VChart from 'vue-echarts';

const props = defineProps({
  title: String,
  chartOptions: Object,
});

// Verificar si las opciones del gráfico son válidas
const isValidChart = computed(() => {
  return props.chartOptions && 
         props.chartOptions !== NaN && 
         typeof props.chartOptions === 'object' &&
         Object.keys(props.chartOptions).length > 0;
});
</script>

<style scoped>
/* Animación sutil para los gráficos */
.h-64 {
  position: relative;
}

.h-64::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent);
  animation: shimmer 2s infinite;
  transform: translateX(-100%);
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

/* Animación de pulso */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
