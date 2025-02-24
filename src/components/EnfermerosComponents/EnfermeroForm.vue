<template>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Nombre</label>
        <input type="text" v-model="form.nombre" required class="mt-1 block w-full rounded border-gray-300" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Apellido</label>
        <input type="text" v-model="form.apellido" required class="mt-1 block w-full rounded border-gray-300" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Especialidad</label>
        <input type="text" v-model="form.especialidad" required class="mt-1 block w-full rounded border-gray-300" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Teléfono</label>
        <input type="tel" v-model="form.telefono" required class="mt-1 block w-full rounded border-gray-300" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Correo</label>
        <input type="email" v-model="form.correo" required class="mt-1 block w-full rounded border-gray-300" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Contraseña</label>
        <input type="password" v-model="form.contrasena" required class="mt-1 block w-full rounded border-gray-300" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">URL Foto de Perfil</label>
        <input type="text" v-model="form.fotoPerfilUrl" class="mt-1 block w-full rounded border-gray-300" placeholder="Opcional" />
      </div>
      <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Registrar Enfermero
      </button>
    </form>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  
  // Se define el emisor de eventos para notificar al padre cuando se envíe el formulario
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
    // Emitir el evento con los datos del formulario
    emit('submit', { ...form })
    // Reiniciar los campos del formulario
    form.nombre = ''
    form.apellido = ''
    form.especialidad = ''
    form.telefono = ''
    form.correo = ''
    form.contrasena = ''
    form.fotoPerfilUrl = ''
  }
  </script>