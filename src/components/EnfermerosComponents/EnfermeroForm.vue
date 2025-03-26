<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <!-- Grid Responsivo -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <!-- Nombre -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </div>
          <input 
            type="text" 
            v-model="form.nombre" 
            required 
            class="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors" 
            placeholder="Ingrese nombre"
          />
        </div>
      </div>

      <!-- Apellido -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </div>
          <input 
            type="text" 
            v-model="form.apellido" 
            required 
            class="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors" 
            placeholder="Ingrese apellido"
          />
        </div>
      </div>

      <!-- Especialidad -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Especialidad</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
            </svg>
          </div>
          <select 
            v-model="form.especialidad" 
            required 
            class="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
          >
            <option value="" disabled>Seleccione especialidad</option>
            <option value="Enfermería General">Enfermería General</option>
            <option value="Pediatría">Pediatría</option>
            <option value="Geriatría">Geriatría</option>
            <option value="Cuidados Intensivos">Cuidados Intensivos</option>
            <option value="Obstetricia">Obstetricia</option>
            <option value="Oncología">Oncología</option>
          </select>
        </div>
      </div>

      <!-- Teléfono -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
          <input 
            type="tel" 
            v-model="form.telefono" 
            @input="validatePhone" 
            required 
            class="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors" 
            placeholder="Ingrese teléfono (10 dígitos)"
            :class="{'border-red-300 focus:ring-red-500 focus:border-red-500': phoneError}"
          />
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg 
              v-if="phoneError" 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-5 w-5 text-red-500" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
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
          </div>
        </div>
        <p v-if="phoneError" class="mt-1 text-sm text-red-600">{{ phoneError }}</p>
      </div>

      <!-- Correo -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Correo</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <input 
            type="email" 
            v-model="form.correo" 
            @input="validateEmail" 
            required 
            class="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors" 
            placeholder="correo@ejemplo.com"
            :class="{'border-red-300 focus:ring-red-500 focus:border-red-500': emailError}"
          />
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg 
              v-if="emailError" 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-5 w-5 text-red-500" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
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
          </div>
        </div>
        <p v-if="emailError" class="mt-1 text-sm text-red-600">{{ emailError }}</p>
      </div>

      <!-- Contraseña -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <input 
            :type="showPassword ? 'text' : 'password'" 
            v-model="form.contrasena" 
            @input="validatePassword" 
            required 
            class="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors" 
            placeholder="Ingrese contraseña"
            :class="{'border-red-300 focus:ring-red-500 focus:border-red-500': passwordError}"
          />
          <button 
            type="button"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
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
          </button>
        </div>
        <p v-if="passwordError" class="mt-1 text-sm text-red-600">{{ passwordError }}</p>
        
        <!-- Indicador de fortaleza de contraseña -->
        <div v-if="form.contrasena" class="mt-2">
          <div class="flex items-center">
            <div class="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                class="h-1.5 rounded-full transition-all duration-300"
                :class="{
                  'w-1/4 bg-red-500': passwordStrength === 'weak',
                  'w-2/4 bg-yellow-500': passwordStrength === 'medium',
                  'w-3/4 bg-blue-500': passwordStrength === 'strong',
                  'w-full bg-green-500': passwordStrength === 'very-strong'
                }"
              ></div>
            </div>
            <span class="ml-2 text-xs text-gray-500">{{ passwordStrengthText }}</span>
          </div>
        </div>
      </div>

      <!-- Confirmar Contraseña -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <input 
            :type="showConfirmPassword ? 'text' : 'password'" 
            v-model="confirmPassword" 
            @input="validateConfirmPassword" 
            required 
            class="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors" 
            placeholder="Confirme contraseña"
            :class="{'border-red-300 focus:ring-red-500 focus:border-red-500': confirmPasswordError}"
          />
          <button 
            type="button"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
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
          </button>
        </div>
        <p v-if="confirmPasswordError" class="mt-1 text-sm text-red-600">{{ confirmPasswordError }}</p>
      </div>
    </div>

    <!-- Campo de Foto de Perfil -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Foto de Perfil</label>
      <div class="flex items-center">
        <div class="flex-shrink-0 mr-4">
          <img 
            :src="previewImage || 'https://via.placeholder.com/100?text=Foto'" 
            alt="Vista previa" 
            class="h-20 w-20 rounded-full object-cover border border-gray-200"
          />
        </div>
        <div class="flex-1">
          <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
            <span>Subir una foto</span>
            <input 
              id="file-upload" 
              name="file-upload" 
              type="file" 
              class="sr-only" 
              @change="handleFileUpload" 
              accept=".jpg, .jpeg, .png"
            />
          </label>
          <p class="text-xs text-gray-500 mt-1">PNG, JPG o JPEG hasta 5MB</p>
          <p v-if="fileError" class="mt-1 text-sm text-red-600">{{ fileError }}</p>
        </div>
      </div>
    </div>

    <!-- Botón de Registro -->
    <div class="flex justify-end">
      <button 
        type="submit" 
        :disabled="isSubmitting || !isFormValid" 
        class="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
      >
        <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ isSubmitting ? 'Registrando...' : 'Registrar Enfermero' }}
      </button>
    </div>
    
    <!-- Modal de éxito -->
    <SuccessModal 
      :is-open="showSuccessModal" 
      :enfermero-nombre="successEnfermeroNombre" 
      @close="closeSuccessModal" 
      @add-another="addAnotherEnfermero"
    />
  </form>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import SuccessModal from './SuccessModal.vue';

const emit = defineEmits(['submit']);

const form = reactive({
  nombre: '',
  apellido: '',
  especialidad: '',
  telefono: '',
  correo: '',
  contrasena: '',
  fotoPerfil: null
});

const confirmPassword = ref('');
const phoneError = ref('');
const emailError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');
const fileError = ref('');
const isSubmitting = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const previewImage = ref(null);

// Variables para el modal de éxito
const showSuccessModal = ref(false);
const successEnfermeroNombre = ref('');

// Validación de teléfono
function validatePhone() {
  form.telefono = form.telefono.replace(/\D/g, '');
  if (form.telefono && form.telefono.length !== 10) {
    phoneError.value = 'El teléfono debe tener 10 dígitos.';
  } else {
    phoneError.value = '';
  }
}

// Validación de correo
function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (form.correo && !emailRegex.test(form.correo)) {
    emailError.value = 'Ingrese un correo electrónico válido.';
  } else {
    emailError.value = '';
  }
}

// Validación de contraseña
function validatePassword() {
  const hasDigit = /\d/.test(form.contrasena);
  const hasUppercase = /[A-Z]/.test(form.contrasena);
  const hasSpecial = /[!@#$%^&*]/.test(form.contrasena);
  const isLongEnough = form.contrasena.length >= 8;
  
  if (form.contrasena && !isLongEnough) {
    passwordError.value = 'La contraseña debe tener al menos 8 caracteres.';
  } else if (form.contrasena && !(hasDigit && hasUppercase && hasSpecial)) {
    passwordError.value = 'La contraseña debe incluir al menos un número, una mayúscula y un carácter especial.';
  } else {
    passwordError.value = '';
  }
  
  // Si ya se ingresó confirmación, validarla nuevamente
  if (confirmPassword.value) {
    validateConfirmPassword();
  }
}

// Validación de confirmación de contraseña
function validateConfirmPassword() {
  if (confirmPassword.value && form.contrasena !== confirmPassword.value) {
    confirmPasswordError.value = 'Las contraseñas no coinciden.';
  } else {
    confirmPasswordError.value = '';
  }
}

// Fortaleza de la contraseña
const passwordStrength = computed(() => {
  if (!form.contrasena) return '';
  
  const hasDigit = /\d/.test(form.contrasena);
  const hasUppercase = /[A-Z]/.test(form.contrasena);
  const hasLowercase = /[a-z]/.test(form.contrasena);
  const hasSpecial = /[!@#$%^&*]/.test(form.contrasena);
  const length = form.contrasena.length;
  
  let score = 0;
  if (length >= 8) score += 1;
  if (length >= 12) score += 1;
  if (hasDigit) score += 1;
  if (hasUppercase) score += 1;
  if (hasLowercase) score += 1;
  if (hasSpecial) score += 1;
  
  if (score <= 2) return 'weak';
  if (score <= 3) return 'medium';
  if (score <= 4) return 'strong';
  return 'very-strong';
});

const passwordStrengthText = computed(() => {
  switch (passwordStrength.value) {
    case 'weak': return 'Débil';
    case 'medium': return 'Media';
    case 'strong': return 'Fuerte';
    case 'very-strong': return 'Muy fuerte';
    default: return '';
  }
});

// Propiedad computada para validar el formulario
const isFormValid = computed(() => {
  return (
    form.nombre &&
    form.apellido &&
    form.especialidad &&
    form.telefono &&
    form.correo &&
    form.contrasena &&
    confirmPassword.value &&
    !phoneError.value &&
    !emailError.value &&
    !passwordError.value &&
    !confirmPasswordError.value &&
    !fileError.value
  );
});

// Alternar visibilidad de contraseña
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

// Alternar visibilidad de confirmación de contraseña
function toggleConfirmPasswordVisibility() {
  showConfirmPassword.value = !showConfirmPassword.value;
}

// Manejar carga de archivo
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) {
    form.fotoPerfil = null;
    previewImage.value = null;
    fileError.value = '';
    return;
  }
  
  // Validar tipo de archivo
  if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
    fileError.value = 'Por favor, sube una imagen válida (jpg, jpeg, png).';
    form.fotoPerfil = null;
    previewImage.value = null;
    return;
  }
  
  // Validar tamaño de archivo (5MB)
  if (file.size > 5 * 1024 * 1024) {
    fileError.value = 'La imagen no debe exceder los 5MB.';
    form.fotoPerfil = null;
    previewImage.value = null;
    
    return;
  }
  
  fileError.value = '';
  form.fotoPerfil = file;
  
  // Crear vista previa
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.value = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Enviar formulario
async function onSubmit() {
  // Ejecutar validaciones finales
  validatePhone();
  validateEmail();
  validatePassword();
  validateConfirmPassword();
  
  if (!isFormValid.value) return;
  
  isSubmitting.value = true;
  
  try {
    const formData = {
      nombre: form.nombre,
      apellido: form.apellido,
      especialidad: form.especialidad,
      telefono: form.telefono,
      correo: form.correo,
      contrasena: form.contrasena,
      fotoPerfil: form.fotoPerfil,
    };
    
    // Emitir evento al componente padre
    emit('submit', formData);
    
    // Mostrar modal de éxito
    successEnfermeroNombre.value = `${form.nombre} ${form.apellido}`;
    showSuccessModal.value = true;
    
  } catch (error) {
    console.error('Error al enviar formulario:', error);
  } finally {
    isSubmitting.value = false;
  }
}

// Cerrar modal de éxito
function closeSuccessModal() {
  showSuccessModal.value = false;
  resetForm();
}

// Agregar otro enfermero
function addAnotherEnfermero() {
  showSuccessModal.value = false;
  resetForm();
}

// Resetear formulario
function resetForm() {
  form.nombre = '';
  form.apellido = '';
  form.especialidad = '';
  form.telefono = '';
  form.correo = '';
  form.contrasena = '';
  form.fotoPerfil = null;
  confirmPassword.value = '';
  previewImage.value = null;
  phoneError.value = '';
  emailError.value = '';
  passwordError.value = '';
  confirmPasswordError.value = '';
  fileError.value = '';
}
</script>

<style scoped>
/* Animación para los campos de formulario al enfocar */
input:focus, select:focus {
  transform: translateY(-1px);
  transition: all 0.2s ease;
}

/* Animación para el botón de envío */
button[type="submit"]:not(:disabled):hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Animación para la vista previa de la imagen */
img {
  transition: all 0.3s ease;
}

img:hover {
  transform: scale(1.05);
}
</style>

