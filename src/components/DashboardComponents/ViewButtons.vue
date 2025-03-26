<template>
  <div class="flex space-x-4">
    <button
      :class="{
        'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md': selectedView === 'organization',
        'bg-white text-primary border border-gray-200 hover:border-blue-300': selectedView !== 'organization'
      }"
      class="p-3 rounded-lg transition-all duration-300 ease-in-out flex items-center space-x-2 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
      @click="changeView('organization')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
      <span>Mi Organización</span>
      <span v-if="selectedView === 'organization'" class="ml-1 flex h-2 w-2">
        <span class="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-300 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
      </span>
    </button>
    <button
      :class="{
        'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md': selectedView === 'dashboard',
        'bg-white text-primary border border-gray-200 hover:border-blue-300': selectedView !== 'dashboard'
      }"
      class="p-3 rounded-lg transition-all duration-300 ease-in-out flex items-center space-x-2 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
      @click="changeView('dashboard')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
      </svg>
      <span>Mi Dashboard</span>
      <span v-if="selectedView === 'dashboard'" class="ml-1 flex h-2 w-2">
        <span class="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-300 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
      </span>
    </button>
  </div>
</template>
  
<script setup>
defineProps({
  selectedView: String,
  changeView: Function
});
</script>

<style scoped>
button {
  position: relative;
  overflow: hidden;
}

button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  100% {
    transform: scale(20, 20);
    opacity: 0;
  }
}

button:focus:not(:active)::after {
  animation: ripple 1s ease-out;
}
</style>
