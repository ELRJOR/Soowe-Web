<template>
  <div class="h-screen w-screen flex flex-col sm:flex-row">
    <!-- Imagen (ocupa toda la pantalla en móviles, mitad en pantallas más grandes) -->
    <div class="w-full h-1/3 sm:w-1/2 sm:h-full">
      <img src="@/assets/Terminal.jpg" alt="Login Image" class="w-full h-full object-cover" />
    </div>

    <!-- Formulario (ocupa toda la pantalla en móviles, mitad en pantallas más grandes) -->
    <div class="w-full h-2/3 sm:w-1/2 sm:h-full flex flex-col justify-center p-4 sm:p-8 bg-white shadow-lg">
      <h2 class="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-black">Iniciar sesión</h2>

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
            list="savedEmails"
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <!-- Lista de correos guardados -->
          <datalist id="savedEmails">
            <option v-for="account in savedAccounts" :key="account.email" :value="account.email" />
          </datalist>
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
              class="w-full px-4 py-2 pr-14 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span 
              @click="togglePasswordVisibility"
              class="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
            >
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

        <!-- Botón de login --->
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