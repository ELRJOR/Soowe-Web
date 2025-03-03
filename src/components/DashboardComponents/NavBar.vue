<template>
  <header class="flex justify-between items-center p-3 md:p-5 bg-opacity-50 relative z-20">
    <!-- Logo y nombre -->
    <div class="flex items-center space-x-2">
      <img src="@/assets/Logo.png" alt="Logo" class="w-7 h-7 md:w-9 md:h-9">
      <span class="text-xl md:text-2xl font-bold text-primary">Soowe</span>
    </div>

    <!-- Menú de navegación (escritorio) -->
    <nav class="hidden md:flex space-x-4">
      <ul class="flex space-x-4">
        <li
          v-for="item in Menu"
          :key="item.name"
          :class="{
            'bg-gray-200': isActive(item.route),
            'rounded-lg': true,
          }"
        >
          <router-link
            :to="item.route"
            class="block text-primary font-bold transition hover:text-titles ease-linear text-lg py-2 px-4"
            :class="{
              'text-blue-500': isActive(item.route),
            'text-sm md:text-lg': true,
            'py-1 px-2 md:py-2 md:px-4': true,
            'hover:bg-gray-100': true,
            'rounded-lg': true,
            'transition duration-200 ease-in-out': true,
            'text-center': true,
            'whitespace-nowrap': true,
            'text-sm': true,
            'md:text-base': true,
          }"
          >
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Íconos y menú de perfil -->
    <div class="flex items-center space-x-2 md:space-x-4 relative" ref="profileMenu">
      <img src="https://img.icons8.com/?size=100&id=14099&format=png&color=000000" alt="Settings" class="w-5 h-5 md:w-7 md:h-7 cursor-pointer">
      <img src="https://img.icons8.com/?size=100&id=16008&format=png&color=000000" alt="Notifications" class="w-5 h-5 md:w-7 md:h-7 cursor-pointer">
      <div class="flex items-center p-1 rounded-lg border-2 border-black">
        <div class="flex items-center space-x-2 md:space-x-3">
          <img src="@/assets/square-pattern.png" alt="Organization" class="w-10 h-6 md:w-14 md:h-9 rounded-md">
          <img src="@/assets/profile-picture-placeholder.png" alt="Profile" class="w-6 h-6 md:w-9 md:h-9 rounded-full">
        </div>
        <img
          src="https://img.icons8.com/?size=200&id=2760&format=png&color=000000"
          alt="Arrow Down"
          class="w-3 h-3 md:w-4 md:h-4 cursor-pointer"
          @click="toggleDropdown"
        />
      </div>
      <!-- Menú desplegable con transición usando Vue y Tailwind -->
      <transition
        enter-active-class="transition transform duration-300 ease-in-out"
        enter-from-class="scale-y-0 opacity-0"
        enter-to-class="scale-y-100 opacity-100"
        leave-active-class="transition transform duration-300 ease-in-out"
        leave-from-class="scale-y-100 opacity-100"
        leave-to-class="scale-y-0 opacity-0"
      >
        <div
          v-if="isDropdownOpen"
          ref="dropdownMenu"
          class="absolute right-0 mt-32 md:mt-32 bg-white shadow-lg rounded-lg w-48 border border-gray-300 z-50 transform origin-top"
        >
          <ul>
            <li @click="goToProfile" class="px-4 py-2 text-primary cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out">
              Mi perfil
            </li>
            <li @click="openLogoutModal" class="px-4 py-2 text-primary cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out">
              Cerrar sesión
            </li>
          </ul>
        </div>
      </transition>
    </div>

    <!-- Menú de hamburguesa con animación (móvil) -->
    <div 
      class="absolute top-16 left-0 w-full bg-white shadow-xl rounded-lg border border-gray-300 z-30 md:hidden 
             transform transition-all duration-300 ease-in-out origin-top"
      :class="isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 invisible'"
    >
      <ul class="space-y-2 p-3 text-base font-bold text-primary">
        <li v-for="item in Menu" :key="item.name">
          <router-link 
            :to="item.route" 
            class="block p-2 hover:bg-gray-200 rounded-lg transition duration-300 ease-in-out"
            :class="{ 'text-blue-500': isActive(item.route) }"
            @click="closeMenu"
          >
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Botón del menú de hamburguesa -->
    <button type="button" class="block focus:outline-none md:hidden z-30" @click="toggleMenu">
      <img v-if="isMenuOpen" src="https://img.icons8.com/ios-filled/100/0/0/0/delete-sign.png" alt="close" width="30" height="30">
      <img v-else src="https://img.icons8.com/ios-filled/100/0/0/0/menu--v6.png" alt="menu" width="30" height="30">
    </button>

    <!-- Modal de confirmación de cierre de sesión -->
    <LogoutModal
      :isOpen="isLogoutModalOpen"
      @confirm="confirmLogout"
      @cancel="closeLogoutModal"
    />
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LogoutModal from '@/components/DashboardComponents/LogoutModal.vue'; // Asegúrate de importar el modal

const Menu = ref([
  { name: 'Dashboard', route: '/dashboard' },
  { name: 'Enfermeros', route: '/enfermeros' },
  { name: 'Solicitudes', route: '/solicitudes' },
]);

const isMenuOpen = ref(false);
const isDropdownOpen = ref(false);
const isLogoutModalOpen = ref(false);

const profileMenu = ref(null);
const dropdownMenu = ref(null);
const route = useRoute();
const router = useRouter();

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

const isActive = (routeName) => {
  return route.path === routeName;
};

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
  console.log('Go to profile page');
};

const openLogoutModal = () => {
  isLogoutModalOpen.value = true;
};

const closeLogoutModal = () => {
  isLogoutModalOpen.value = false;
};

const confirmLogout = () => {
  localStorage.removeItem("token");
  router.push("/login");
  closeLogoutModal();
};
</script>

<style scoped>
/* Estilos adicionales si los necesitas */
</style>