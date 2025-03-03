<template>
    <transition
      enter-active-class="transition-opacity duration-300 ease-in-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-in-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-96 shadow-lg">
          <h2 class="text-xl font-bold text-primary mb-4">Cerrar sesión</h2>
          <p class="text-gray-700 mb-6">¿Estás seguro de que deseas cerrar sesión?</p>
          <div class="flex justify-end space-x-4">
            <button
              @click="onCancel"
              class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition duration-200 ease-in-out"
            >
              Cancelar
            </button>
            <button
              @click="onConfirm"
              class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 ease-in-out"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  defineProps({
    isOpen: Boolean,
    onConfirm: Function,
    onCancel: Function,
  });
  </script>