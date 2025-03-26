<template>
  <div class="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 relative overflow-hidden group">
    <!-- Decorative background element -->
    <div class="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full opacity-0 group-hover:opacity-70 transition-all duration-500 transform group-hover:scale-150"></div>
    
    <div class="relative z-10">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-sm font-medium text-gray-500">{{ title }}</h3>
        <div class="icon-container p-1.5 rounded-full bg-blue-50 text-blue-500">
          <svg v-if="title.includes('Enfermeros')" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <svg v-else-if="title.includes('Solicitudes Entrantes')" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 5v14"></path>
            <path d="M5 12h14"></path>
          </svg>
          <svg v-else-if="title.includes('Solicitudes Completadas')" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <svg v-else-if="title.includes('Dinero')" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        </div>
      </div>
      
      <p class="text-2xl font-bold text-gray-800 transition-all duration-300 group-hover:text-blue-600">
        {{ formatValue(value) }}
      </p>
      
      <div class="mt-2 text-xs text-gray-500 flex items-center">
        <span class="flex items-center text-green-500 mr-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
          12%
        </span>
        desde el mes pasado
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { defineProps } from 'vue';

defineProps({
  title: String,
  value: [String, Number],
});

// Función para formatear valores según el tipo
const formatValue = (val) => {
  if (typeof val === 'number') {
    // Si es dinero, formatear como moneda
    if (val > 1000) {
      return new Intl.NumberFormat('es-MX', { 
        style: 'currency', 
        currency: 'MXN',
        maximumFractionDigits: 0
      }).format(val);
    }
    // Si es un número grande, formatear con separadores de miles
    return new Intl.NumberFormat('es-MX').format(val);
  }
  return val;
};
</script>

<style scoped>
.icon-container {
  transition: all 0.3s ease;
}

.group:hover .icon-container {
  transform: scale(1.1);
  background-color: rgba(59, 130, 246, 0.2);
}
</style>
