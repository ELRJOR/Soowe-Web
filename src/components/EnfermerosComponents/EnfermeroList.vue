<template>
  <div class="mt-8">
    <h2 class="text-xl font-bold mb-4">Lista de Enfermeros</h2>
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Apellido</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Especialidad</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Correo</th>
          <th class="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="enfermero in paginatedEnfermeros" :key="enfermero.id">
          <td class="px-6 py-4 whitespace-nowrap">{{ enfermero.nombre }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ enfermero.apellido }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ enfermero.especialidad }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ enfermero.telefono }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ enfermero.correo }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <button @click="$emit('edit', enfermero)" class="text-blue-600 hover:text-blue-900 mr-2">Editar</button>
            <button @click="$emit('delete', enfermero.id)" class="text-red-600 hover:text-red-900">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Paginación -->
    <div class="flex justify-center items-center space-x-4 mt-6">
      <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50">⬅️ Anterior</button>
      <span class="text-gray-700 font-semibold">Página {{ currentPage }} de {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50">Siguiente ➡️</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue';

const props = defineProps({
  enfermeros: Array
});

const emit = defineEmits(['edit', 'delete']);

const currentPage = ref(1);
const perPage = 6;
const totalPages = computed(() => Math.ceil(props.enfermeros.length / perPage));
const paginatedEnfermeros = computed(() => props.enfermeros.slice((currentPage.value - 1) * perPage, currentPage.value * perPage));

const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };
</script>
