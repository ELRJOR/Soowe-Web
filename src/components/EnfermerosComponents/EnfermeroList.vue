<template>
  <div class="mt-8">
    <h2 class="text-xl font-bold mb-6">Lista de Enfermeros</h2>

    <!-- 📌 Tabla para pantallas grandes -->
    <div class="hidden md:block overflow-x-auto">
      <table class="min-w-full border-collapse bg-white shadow-md rounded-lg">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase">Nombre</th>
            <th class="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase">Apellido</th>
            <th class="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase">Especialidad</th>
            <th class="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase">Teléfono</th>
            <th class="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase">Correo</th>
            <th class="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="enfermero in paginatedEnfermeros" :key="enfermero.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-4 py-3 text-sm text-gray-900 max-w-xs">{{ enfermero.nombre }}</td>
            <td class="px-4 py-3 text-sm text-gray-900 max-w-xs">{{ enfermero.apellido }}</td>
            <td class="px-4 py-3 text-sm text-gray-900 max-w-xs">{{ enfermero.especialidad }}</td>
            <td class="px-4 py-3 text-sm text-gray-900 max-w-xs">{{ enfermero.telefono }}</td>
            <td class="px-4 py-3 text-sm text-gray-900 max-w-xs">{{ enfermero.correo }}</td>
            <td class="px-4 py-3 text-right">
              <button @click="$emit('edit', enfermero)" class="text-blue-600 hover:text-blue-800 font-medium mr-4 flex items-center">
                <PencilSquareIcon class="w-4 h-4 mr-1" /> Editar
              </button>
              <button @click="$emit('delete', enfermero.id)" class="text-red-600 hover:text-red-800 font-medium flex items-center">
                <TrashIcon class="w-4 h-4 mr-1" /> Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 📌 Lista de tarjetas para pantallas pequeñas -->
    <div class="md:hidden space-y-4">
      <div v-for="enfermero in paginatedEnfermeros" :key="enfermero.id" class="bg-white shadow-md rounded-lg p-4">
        <div class="space-y-2">
          <p class="text-sm text-gray-900"><span class="font-medium">Nombre:</span> {{ enfermero.nombre }}</p>
          <p class="text-sm text-gray-900"><span class="font-medium">Apellido:</span> {{ enfermero.apellido }}</p>
          <p class="text-sm text-gray-900"><span class="font-medium">Especialidad:</span> {{ enfermero.especialidad }}</p>
          <p class="text-sm text-gray-900"><span class="font-medium">Teléfono:</span> {{ enfermero.telefono }}</p>
          <p class="text-sm text-gray-900"><span class="font-medium">Correo:</span> {{ enfermero.correo }}</p>
        </div>
        <div class="flex justify-end space-x-4 mt-4">
          <button @click="$emit('edit', enfermero)" class="text-blue-600 hover:text-blue-800 font-medium flex items-center">
            <PencilSquareIcon class="w-4 h-4 mr-1" /> Editar
          </button>
          <button @click="$emit('delete', enfermero.id)" class="text-red-600 hover:text-red-800 font-medium flex items-center">
            <TrashIcon class="w-4 h-4 mr-1" /> Eliminar
          </button>
        </div>
      </div>
    </div>

    <!-- 📌 Paginación -->
    <div class="flex justify-center items-center space-x-6 mt-8">
      <button @click="prevPage" :disabled="currentPage === 1" class="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition-colors flex items-center">
        <ArrowLeftIcon class="w-4 h-4 mr-1" /> Anterior
      </button>
      <span class="text-gray-700 font-semibold text-sm">Página {{ currentPage }} de {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition-colors flex items-center">
        Siguiente <ArrowRightIcon class="w-4 h-4 ml-1" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue';
import { PencilSquareIcon, TrashIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'; // Importa los iconos de Heroicons v2

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