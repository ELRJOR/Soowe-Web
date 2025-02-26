<template>
  <form 
    @submit.prevent="onSubmit" 
    class="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto"
  >
    <!-- 📌 Grid Responsivo Corregido -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Nombre</label>
        <input type="text" v-model="form.nombre" required class="mt-1 block w-full rounded border-gray-300 p-2" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Apellido</label>
        <input type="text" v-model="form.apellido" required class="mt-1 block w-full rounded border-gray-300 p-2" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Especialidad</label>
        <input type="text" v-model="form.especialidad" required class="mt-1 block w-full rounded border-gray-300 p-2" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Teléfono</label>
        <input type="tel" v-model="form.telefono" required class="mt-1 block w-full rounded border-gray-300 p-2" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Correo</label>
        <input type="email" v-model="form.correo" required class="mt-1 block w-full rounded border-gray-300 p-2" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Contraseña</label>
        <input type="password" v-model="form.contrasena" required class="mt-1 block w-full rounded border-gray-300 p-2" />
      </div>
      <div class="sm:col-span-2">
        <label class="block text-sm font-medium text-gray-700">URL Foto de Perfil</label>
        <input type="text" v-model="form.fotoPerfilUrl" class="mt-1 block w-full rounded border-gray-300 p-2" placeholder="Opcional" />
      </div>
    </div>

    <!-- 📌 Botón de Registro -->
    <div class="flex justify-end mt-6">
      <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition">
        Registrar Enfermero
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['submit'])

const form = reactive({
  nombre: '',
  apellido: '',
  especialidad: '',
  telefono: '',
  correo: '',
  contrasena: '',
  fotoPerfilUrl: ''
})

function onSubmit() {
  emit('submit', { ...form })
  form.nombre = ''
  form.apellido = ''
  form.especialidad = ''
  form.telefono = ''
  form.correo = ''
  form.contrasena = ''
  form.fotoPerfilUrl = ''
}
</script>
