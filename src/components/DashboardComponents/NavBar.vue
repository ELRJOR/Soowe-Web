<template>
    <header class="flex justify-between items-center p-5 bg-opacity-50 relative z-20">
      <div class="flex items-center space-x-2">
        <img src="@/assets/Logo.png" alt="Logo" class="w-9 h-9">
        <span class="text-2xl font-bold text-primary">Soowe</span>
      </div>
  
      <nav class="hidden md:flex space-x-4">
        <ul class="flex space-x-4">
          <li v-for="item in Menu" :key="item.name">
            <router-link
              :to="item.route"
              class="block text-primary font-bold transition hover:text-titles ease-linear text-lg">
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
            <img src="@/assets/square-pattern.png" alt="Organization" class="w-13 h-9 rounded-md">
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
  
  const Menu = ref([
    { name: 'Dashboard', route: '/dashboard' },
    { name: 'Usuarios', route: '/usuarios' },
    { name: 'Enfermeros', route: '/enfermeros' },
    { name: 'Solicitudes', route: '/solicitudes' },
  ]);
  
  const isMenuOpen = ref(false);
  const isDropdownOpen = ref(false);
  
  const profileMenu = ref(null);
  const dropdownMenu = ref(null);
  
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
  
  // Close dropdown if clicked outside
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
    // Implement navigation to profile page
    console.log('Go to profile page');
  };
  
  const logout = () => {
    // Implement logout functionality
    console.log('Logout');
  };
  </script>
  