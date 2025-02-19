<template>
  <header class="flex justify-between items-center p-5 bg-opacity-50 relative z-20">
    <div class="flex items-center space-x-2">
      <img src="@/assets/Logo.png" alt="Logo" class="w-9 h-9">
      <span class="text-2xl font-bold text-primary">Soowe</span>
    </div>

    <nav class="hidden md:flex space-x-4">
      <ul class="flex space-x-4">
        <li
          v-for="item in Menu"
          :key="item.name"
          :class="{
            'bg-gray-200': isActive(item.route), // Cambia el fondo cuando está activo
            'rounded-lg': true, // Opcional para bordes redondeados
          }"
        >
          <router-link
            :to="item.route"
            class="block text-primary font-bold transition hover:text-titles ease-linear text-lg py-2 px-4"
            :class="{
              'text-blue-500': isActive(item.route), // Cambia el color del texto cuando está activo
            }"
          >
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="flex items-center space-x-4 relative" ref="profileMenu">
      <img src="https://img.icons8.com/?size=100&id=14099&format=png&color=000000" alt="Settings" class="w-7 h-7 cursor-pointer">
      <img src="https://img.icons8.com/?size=100&id=16008&format=png&color=000000" alt="Notifications" class="w-7 h-7 cursor-pointer">
      <div class="flex items-center p-1 rounded-lg border-2 border-black">
        <div class="flex items-center space-x-3">
          <img src="@/assets/square-pattern.png" alt="Organization" class="w-14 h-9 rounded-md">
          <img src="@/assets/profile-picture-placeholder.png" alt="Profile" class="w-9 h-9 rounded-full">
        </div>
        <img
          src="https://img.icons8.com/?size=200&id=2760&format=png&color=000000"
          alt="Arrow Down"
          class="w-4 h-4 cursor-pointer"
          @click="toggleDropdown"
        />
      </div>
    </div>

    <!-- Dropdown Menu -->
    <div v-if="isDropdownOpen" class="absolute right-4 top-16 mt-2 w-40 bg-white shadow-lg rounded-lg border-2 border-black z-30" ref="dropdownMenu">
      <ul class="space-y-2 p-2 text-sm">
        <li @click="goToProfile" class="cursor-pointer hover:bg-gray-200 p-2">Mi perfil</li>
        <li @click="logout" class="cursor-pointer hover:bg-gray-200 p-2">Cerrar sesión</li>
      </ul>
    </div>

    <button type="button" class="block focus:outline-none md:hidden z-30" @click="toggleMenu">
      <img v-if="isMenuOpen" src="https://img.icons8.com/ios-filled/100/0/0/0/delete-sign.png" alt="close" width="35" height="35">
      <img v-else src="https://img.icons8.com/ios-filled/100/0/0/0/menu--v6.png" alt="menu" width="35" height="35">
    </button>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router'; // Importa useRoute para obtener la ruta activa

const Menu = ref([
  { name: 'Dashboard', route: '/dashboard' },
  { name: 'Enfermeros', route: '/enfermeros' },
  { name: 'Solicitudes', route: '/solicitudes' },
]);

const isMenuOpen = ref(false);
const isDropdownOpen = ref(false);

const profileMenu = ref(null);
const dropdownMenu = ref(null);
const route = useRoute(); // Usamos useRoute para obtener la ruta activa

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = 'auto';
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : 'auto';
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Determina si un item está activo
const isActive = (routeName) => {
  return route.path === routeName; // Compara el path actual con el del item
};

// Cierra el dropdown si se hace click fuera de él
const handleClickOutside = (event) => {
  if (profileMenu.value && !profileMenu.value.contains(event.target) && dropdownMenu.value && !dropdownMenu.value.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const goToProfile = () => {
  // Implementa la navegación al perfil
  console.log('Go to profile page');
};

const logout = () => {
  // Implementa la funcionalidad de cierre de sesión
  console.log('Logout');
};
</script>
