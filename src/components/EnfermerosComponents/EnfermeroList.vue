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
          <tr v-for="enfermero in enfermeros" :key="enfermero._id">
            <td class="px-6 py-4 whitespace-nowrap">{{ enfermero.nombre }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ enfermero.apellido }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ enfermero.especialidad }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ enfermero.telefono }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ enfermero.correo }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button @click="$emit('edit', enfermero)" class="text-blue-600 hover:text-blue-900 mr-2">Editar</button>
              <button @click="$emit('delete', enfermero._id)" class="text-red-600 hover:text-red-900">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    enfermeros: {
      type: Array,
      default: () => []
    }
  })
  
  // Se definen los eventos que se emitirán al hacer clic en editar o eliminar
  const emit = defineEmits(['edit', 'delete'])
  </script>