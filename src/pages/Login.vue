<template>
  <div class="h-screen w-screen flex flex-col sm:flex-row overflow-hidden">
    <!-- Imagen (ocupa toda la pantalla en móviles, mitad en pantallas más grandes) -->
    <div class="w-full h-1/3 sm:w-1/2 sm:h-full relative overflow-hidden">
      <img 
        src="@/assets/Terminal.jpg" 
        alt="Login Image" 
        class="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-10000" 
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      <div class="absolute bottom-0 left-0 p-6 text-white">
        <h1 class="text-2xl sm:text-3xl font-bold mb-2 animate-fade-in">Bienvenido</h1>
        <p class="text-sm sm:text-base max-w-md animate-fade-in-delay">Inicia sesión para acceder a tu cuenta y gestionar tus servicios</p>
      </div>
    </div>

    <!-- Formulario (ocupa toda la pantalla en móviles, mitad en pantallas más grandes) -->
    <div class="w-full h-2/3 sm:w-1/2 sm:h-full flex flex-col justify-center p-6 sm:p-12 bg-white shadow-lg relative overflow-hidden">
      <!-- Elementos decorativos de fondo -->
      <div class="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 rounded-full"></div>
      <div class="absolute -bottom-16 -left-16 w-32 h-32 bg-blue-500/5 rounded-full"></div>
      
      <div class="relative z-10 max-w-md mx-auto w-full">
        <div class="text-center mb-8 animate-slide-down">
          <h2 class="text-2xl sm:text-3xl font-bold text-black">Iniciar sesión</h2>
          <p class="text-gray-500 mt-2">Ingresa tus credenciales para continuar</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div class="animate-slide-up" style="--delay: 100ms">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                v-model="email"
                placeholder="Ingresa tu correo"
                required
                list="savedEmails"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <!-- Lista de correos guardados -->
            <datalist id="savedEmails">
              <option v-for="account in savedAccounts" :key="account.email" :value="account.email" />
            </datalist>
          </div>

          <!-- Password -->
          <div class="animate-slide-up" style="--delay: 200ms">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                :type="passwordVisible ? 'text' : 'password'"
                id="password"
                v-model="password"
                placeholder="Ingresa tu contraseña"
                required
                class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <button 
                type="button"
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <svg
                  v-if="!passwordVisible"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.638C3.423 7.51 7.36 4.5 12 4.5c4.639 0 8.577 3.01 9.964 7.184.07.204.07.423 0 .638C20.577 16.49 16.64 19.5 12 19.5c-4.639 0-8.577-3.01-9.964-7.178z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Recordar sesión y Olvidar contraseña -->
          <div class="flex justify-between items-center animate-slide-up" style="--delay: 300ms">
            <label class="flex items-center text-sm text-gray-600 group cursor-pointer">
              <div class="relative flex items-center">
                <input 
                  type="checkbox" 
                  v-model="rememberMe" 
                  class="sr-only"
                >
                <div class="checkbox-bg w-5 h-5 border-2 border-gray-300 rounded group-hover:border-blue-500 transition-colors duration-200"></div>
                <div v-if="rememberMe" class="absolute left-0 w-5 h-5 flex items-center justify-center">
                  <svg class="w-3.5 h-3.5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <span class="ml-2">Recordar sesión</span>
            </label>
            <a href="#" class="text-blue-500 text-sm font-medium hover:text-blue-600 transition-colors duration-200 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <!-- Mensaje de error -->
          <div v-if="loginError" class="animate-shake">
            <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <p class="text-sm text-red-700">{{ errorMessage }}</p>
              </div>
            </div>
          </div>

          <!-- Botón de login -->
          <div class="animate-slide-up" style="--delay: 400ms">
            <button
              type="submit"
              :disabled="loading"
              class="w-full py-3 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 shadow-md hover:shadow-lg"
            >
              <span v-if="!loading">Ingresar</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Ingresando...
              </span>
            </button>
          </div>

          <div class="text-center text-sm text-gray-500 mt-6 animate-slide-up" style="--delay: 500ms">
            ¿No tienes una cuenta? 
            <a href="#" class="text-blue-500 font-medium hover:text-blue-600 transition-colors duration-200 hover:underline">
              Regístrate aquí
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/api/auth";

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const loginError = ref(false);
const errorMessage = ref("");
const loading = ref(false);
const router = useRouter();
const passwordVisible = ref(false);
const savedAccounts = ref([]);

// Cargar cuentas guardadas al montar el componente
onMounted(() => {
  const accounts = JSON.parse(localStorage.getItem("savedAccounts") || "[]");
  savedAccounts.value = accounts;
});

// Guardar una nueva cuenta
const saveAccount = () => {
  const account = { email: email.value, password: password.value };
  const existingAccount = savedAccounts.value.find((acc) => acc.email === account.email);

  if (!existingAccount) {
    savedAccounts.value.push(account);
    localStorage.setItem("savedAccounts", JSON.stringify(savedAccounts.value));
  }
};

// Eliminar una cuenta guardada
const removeAccount = (email) => {
  savedAccounts.value = savedAccounts.value.filter((acc) => acc.email !== email);
  localStorage.setItem("savedAccounts", JSON.stringify(savedAccounts.value));
};

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const handleLogin = async () => {
  loading.value = true;
  loginError.value = false;
  errorMessage.value = "";
  try {
    const data = await login(email.value, password.value);
    if (data.token) {
      localStorage.setItem("token", data.token);
      if (rememberMe.value) {
        saveAccount(); // Guardar la cuenta si "Recordar sesión" está marcado
      }
      router.push("/dashboard");
    } else {
      throw new Error("Credenciales incorrectas");
    }
  } catch (error) {
    loginError.value = true;
    errorMessage.value = error.message || "Error en la autenticación";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Animaciones */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-5px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(5px);
  }
}

.animate-slide-down {
  animation: slideDown 0.5s ease forwards;
}

.animate-slide-up {
  animation: slideUp 0.5s ease forwards;
  animation-delay: var(--delay, 0ms);
  opacity: 0;
  transform: translateY(20px);
  animation-fill-mode: forwards;
}

.animate-fade-in {
  animation: fadeIn 1s ease forwards;
}

.animate-fade-in-delay {
  animation: fadeIn 1s ease 0.3s forwards;
  opacity: 0;
}

.animate-shake {
  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

/* Checkbox personalizado */
.checkbox-bg {
  position: relative;
  background-color: white;
  transition: all 0.2s ease;
}

input:checked ~ .checkbox-bg {
  border-color: #3b82f6;
  background-color: white;
}

/* Efecto de zoom lento para la imagen de fondo */
@keyframes slowZoom {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
}

.transition-transform.duration-10000 {
  transition: transform 10s ease-in-out;
}
</style>