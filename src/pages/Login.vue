<template>
  <div class="h-screen w-screen flex">
    <!-- Imagen a la izquierda (ocupa la mitad) -->
    <div class="w-1/2 h-full">
      <img src="@/assets/Terminal.jpg" alt="Login Image" class="w-full h-full object-cover" />
    </div>

    <!-- Formulario a la derecha (ocupa la mitad) -->
    <div class="w-1/2 h-full flex flex-col justify-center p-8 bg-white shadow-lg">
      <h2 class="text-3xl font-bold text-center mb-6 text-black">Iniciar sesión</h2>

      <form @submit.prevent="handleLogin">
        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-semibold text-black">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Ingresa tu correo"
            required
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Password -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-semibold text-black">
            Contraseña
          </label>
          <div class="relative mt-2">
            <input
              :type="passwordVisible ? 'text' : 'password'"
              id="password"
              v-model="password"
              placeholder="Ingresa tu contraseña"
              required
              class="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <!-- Icono para mostrar/ocultar la contraseña -->
            <span 
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            >
              <!-- Ícono de ojo cerrado (contraseña oculta) -->
              <svg
                v-if="!passwordVisible"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-6 h-6 text-gray-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.875 18.825A10.05 10.05 0 0112 19.5c-4.639 0-8.577-3.01-9.964-7.184a1.003 1.003 0 010-.638C3.423 7.51 7.36 4.5 12 4.5c1.12 0 2.19.165 3.203.474"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 3l18 18"
                />
              </svg>
              <!-- Ícono de ojo abierto (contraseña visible) -->
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-gray-600"
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
            </span>
          </div>
        </div>

        <!-- Recordar sesión y Olvidar contraseña -->
        <div class="flex justify-between items-center mb-6">
          <label class="flex items-center text-sm text-black">
            <input type="checkbox" v-model="rememberMe" class="mr-2">
            Recordar sesión
          </label>
          <a href="#" class="text-blue-500 text-sm font-semibold hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <!-- Botón de login -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {{ loading ? "Ingresando..." : "Ingresar" }}
        </button>

        <!-- Mensaje de error -->
        <div v-if="loginError" class="mt-4 text-red-500 text-sm text-center">
          <p>{{ errorMessage }}</p>
        </div>
      </form>
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

onMounted(() => {
  if (localStorage.getItem("rememberMe") === "true") {
    email.value = localStorage.getItem("email") || "";
    password.value = localStorage.getItem("password") || "";
    rememberMe.value = true;
  }
});

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
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("email", email.value);
        localStorage.setItem("password", password.value);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("email");
        localStorage.removeItem("password");
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
