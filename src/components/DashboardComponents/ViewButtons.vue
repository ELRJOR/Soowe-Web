<template>
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
  </template>
  
  <script setup>
  defineProps({
    selectedView: String,  // Definimos selectedView como prop
    changeView: Function   // Definimos changeView como prop
  });
  </script>
  