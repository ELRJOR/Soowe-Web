<template>
    <header class="flex justify-between align-middle items-center p-6 bg-opacity-50 relative z-20">
      <div class="flex items-center space-x-3">
        <img src="@/assets/Logo.png" alt="Logo" class="w-10 h-10">
        <span class="text-3xl font-bold text-primary">Soowe</span>
      </div>

      <nav class="hidden md:flex space-x-5">
        <ul class="flex space-x-5">
          <li v-for="item in Menu" :key="item.name">
            <router-link
                :to="item.route"
                class="block text-primary font-bold transition hover:text-titles ease-linear text-xl">
                {{ item.name }}
            </router-link>
          </li>
        </ul>
      </nav>

      <div class="flex items-center space-x-5">
        <img src="https://img.icons8.com/?size=100&id=14099&format=png&color=000000" alt="Settings" class="w-8 h-8 cursor-pointer">
        <img src="https://img.icons8.com/?size=100&id=16008&format=png&color=000000" alt="Notifications" class="w-8 h-8 cursor-pointer">
        <div class="flex items-center space-x-4 p-1 rounded-lg border-2 border-black">
            <img src="@/assets/square-pattern.png" alt="Organization" class="w-14 h-10 rounded-md">
            <img src="@/assets/profile-picture-placeholder.png" alt="Profile" class="w-10 h-10 rounded-full border-2 border-black">
        </div>
      </div>

      <button type="button" class="block focus:outline-none md:hidden z-30" @click="toggleMenu">
        <img v-if="isMenuOpen" src="https://img.icons8.com/ios-filled/100/0/0/0/delete-sign.png" alt="close" width="40" height="40">
        <img v-else src="https://img.icons8.com/ios-filled/100/0/0/0/menu--v6.png" alt="menu" width="40" height="40">
      </button>
    </header>

  </template>

  <script setup>
  import { ref } from 'vue';

  const Menu = ref([
    { name: 'Dashboard', route: '/dashboard' },
    { name: 'Usuarios', route: '/usuarios' },
    { name: 'Enfermeros', route: '/enfermeros' },
    { name: 'Solicitudes', route: '/solicitudes' },
  ]);

  const isMenuOpen = ref(false);

  const closeMenu = () => {
    isMenuOpen.value = false;
    document.body.style.overflow = 'auto';
  };

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
    document.body.style.overflow = isMenuOpen.value ? 'hidden' : 'auto';
  };
  </script>
