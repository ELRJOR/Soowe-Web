<template>
  <!-- Contenedor principal (se oculta cuando el modal de éxito está visible) -->
  <div v-if="!showSuccessModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <!-- Formulario de Registro -->
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto max-h-[90vh] overflow-y-auto">
      <form @submit.prevent="onSubmit">
        <!-- 📌 Grid Responsivo -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Nombre -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Nombre</label>
            <input 
              type="text" 
              v-model="form.nombre" 
              required 
              class="mt-1 block w-full rounded border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" 
            />
          </div>

          <!-- Apellido -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Apellido</label>
            <input 
              type="text" 
              v-model="form.apellido" 
              required 
              class="mt-1 block w-full rounded border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" 
            />
          </div>

          <!-- Especialidad -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Especialidad</label>
            <input 
              type="text" 
              v-model="form.especialidad" 
              required 
              class="mt-1 block w-full rounded border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" 
            />
          </div>

          <!-- Teléfono -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Teléfono</label>
            <div class="relative">
              <input 
                type="tel" 
                v-model="form.telefono" 
                @input="validatePhone" 
                required 
                class="mt-1 block w-full rounded border-gray-300 p-2 pr-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" 
              />
              <span class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg 
                  v-if="phoneError" 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-5 w-5 text-red-500" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                <svg 
                  v-else-if="form.telefono && !phoneError" 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-5 w-5 text-green-500" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </span>
            </div>
            <p v-if="phoneError" class="text-red-500 text-sm">{{ phoneError }}</p>
          </div>

          <!-- Correo -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Correo</label>
            <div class="relative">
              <input 
                type="email" 
                v-model="form.correo" 
                @input="validateEmail" 
                required 
                class="mt-1 block w-full rounded border-gray-300 p-2 pr-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" 
              />
              <span class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg 
                  v-if="emailError" 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-5 w-5 text-red-500" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                <svg 
                  v-else-if="form.correo && !emailError" 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-5 w-5 text-green-500" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </span>
            </div>
            <p v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</p>
          </div>

          <!-- Contraseña -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Contraseña</label>
            <div class="relative">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                v-model="form.contrasena" 
                @input="validatePassword" 
                required 
                class="mt-1 block w-full rounded border-gray-300 p-2 pr-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" 
              />
              <span 
                class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                @click="togglePasswordVisibility"
              >
                <svg 
                  v-if="showPassword" 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-5 w-5 text-gray-500" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
                <svg 
                  v-else 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-5 w-5 text-gray-500" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              </span>
            </div>
            <p v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</p>
          </div>

          <!-- Confirmar Contraseña -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
            <div class="relative">
              <input 
                :type="showConfirmPassword ? 'text' : 'password'" 
                v-model="confirmPassword" 
                @input="validateConfirmPassword" 
                required 
                class="mt-1 block w-full rounded border-gray-300 p-2 pr-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" 
              />
              <span 
                class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                @click="toggleConfirmPasswordVisibility"
              >
                <svg 
                  v-if="showConfirmPassword" 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-5 w-5 text-gray-500" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
                <svg 
                  v-else 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-5 w-5 text-gray-500" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              </span>
            </div>
            <p v-if="confirmPasswordError" class="text-red-500 text-sm">{{ confirmPasswordError }}</p>
          </div>

          <!-- Campo de Foto de Perfil -->
          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-gray-700">Foto de Perfil</label>
            <input 
              type="file" 
              @change="handleFileUpload" 
              accept=".jpg, .jpeg, .png" 
              class="mt-1 block w-full rounded border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" 
            />
          </div>
        </div>

        <!-- 📌 Botón de Registro -->
        <div class="flex justify-end mt-6">
          <button 
            type="submit" 
            :disabled="isSubmitting" 
            class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition"
          >
            {{ isSubmitting ? 'Creando...' : 'Registrar Enfermero' }}
          </button>
        </div>

        <!-- 📌 Animación de Carga -->
        <div v-if="isSubmitting" class="mt-4">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal de Éxito (fuera del contenedor del formulario) -->
  <div v-if="showSuccessModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <div class="text-center">
        <svg class="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <h3 class="mt-2 text-lg font-medium text-gray-900">¡Éxito!</h3>
        <p class="mt-1 text-sm text-gray-500">El enfermero se ha registrado correctamente.</p>
        <div class="mt-4">
          <button 
            @click="closeModal" 
            class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { addEnfermero } from '../../api/enfermeros'

const emit = defineEmits(['submit'])

const form = reactive({
  nombre: '',
  apellido: '',
  especialidad: '',
  telefono: '',
  correo: '',
  contrasena: '',
  fotoPerfil: null
})

const confirmPassword = ref('')
const phoneError = ref('')
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const isSubmitting = ref(false)
const showSuccessModal = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

function validatePhone() {
  form.telefono = form.telefono.replace(/\D/g, '')
  if (form.telefono.length > 10) {
    phoneError.value = 'El teléfono no debe exceder los 10 dígitos.'
  } else {
    phoneError.value = ''
  }
}

function validateEmail() {
  if (!form.correo.includes('@')) {
    emailError.value = 'El correo debe contener un "@".'
  } else {
    emailError.value = ''
  }
}

function validatePassword() {
  const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{12,}$/
  if (!passwordRegex.test(form.contrasena)) {
    passwordError.value = 'La contraseña debe tener al menos 12 caracteres, incluyendo un dígito, una mayúscula y un carácter especial.'
  } else {
    passwordError.value = ''
  }
}

function validateConfirmPassword() {
  if (form.contrasena !== confirmPassword.value) {
    confirmPasswordError.value = 'Las contraseñas no coinciden.'
  } else {
    confirmPasswordError.value = ''
  }
}

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}

function toggleConfirmPasswordVisibility() {
  showConfirmPassword.value = !showConfirmPassword.value
}

async function onSubmit() {
  validatePhone()
  validateEmail()
  validatePassword()
  validateConfirmPassword()

  if (phoneError.value || emailError.value || passwordError.value || confirmPasswordError.value) {
    return
  }

  isSubmitting.value = true

  try {
    const formData = {
      nombre: form.nombre,
      apellido: form.apellido,
      especialidad: form.especialidad,
      telefono: form.telefono,
      correo: form.correo,
      contrasena: form.contrasena,
      fotoPerfil: form.fotoPerfil,
    }

    const response = await addEnfermero(formData)

    if (response) {
      console.log('✅ Enfermero creado correctamente:', response)
      showSuccessModal.value = true
    }
  } catch (error) {
    console.error('❌ Error al crear enfermero:', error)
    alert('Hubo un error al crear el enfermero. Inténtalo de nuevo.')
  } finally {
    isSubmitting.value = false
  }
}

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
    form.fotoPerfil = file
  } else {
    alert('Por favor, sube una imagen válida (jpg, jpeg, png).')
    form.fotoPerfil = null
  }
}

function closeModal() {
  showSuccessModal.value = false
  emit('close') // Emitir evento para cerrar el formulario completo
}
</script>