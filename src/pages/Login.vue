<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex">
      
      <!-- Imagen a la izquierda -->
      <div class="hidden md:block md:w-1/2">
        <img src="@/assets/Logo.png" alt="Login" class="w-full h-full object-cover" />
      </div>

      <!-- Formulario a la derecha -->
      <div class="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <h2 class="text-3xl font-bold text-center mb-6 text-gray-700">Iniciar sesión</h2>

        <form @submit.prevent="handleLogin">
          <!-- Email -->
          <div class="mb-4">
            <label for="email" class="block text-sm font-semibold text-gray-600">Correo electrónico</label>
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
          <div class="mb-6">
            <label for="password" class="block text-sm font-semibold text-gray-600">Contraseña</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Ingresa tu contraseña"
              required
              class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {{ loading ? "Ingresando..." : "Ingresar" }}
          </button>

          <!-- Error Message -->
          <div v-if="loginError" class="mt-4 text-red-500 text-sm text-center">
            <p>{{ errorMessage }}</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/api/auth";

// Reactive data
const email = ref("");
const password = ref("");
const loginError = ref(false);
const errorMessage = ref("");
const loading = ref(false);
const router = useRouter();

// Function to handle login
const handleLogin = async () => {
  loading.value = true;
  loginError.value = false;
  errorMessage.value = "";

  try {
    const data = await login(email.value, password.value);
    console.log("Respuesta del servidor:", data);

    if (data.token) {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } else {
      throw new Error("Credenciales incorrectas");
    }
  } catch (error) {
    console.error("Error en el login:", error);
    loginError.value = true;
    errorMessage.value = error.message || "Error en la autenticación";
  } finally {
    loading.value = false;
  }
};
</script>
