<template>
  <header class="flex justify-between items-center p-3 md:p-5 bg-white/95 backdrop-blur-sm shadow-sm relative z-20 border-b border-gray-100">
    <!-- Logo y nombre -->
    <div class="flex items-center space-x-2 group">
      <img src="@/assets/Logo.png" alt="Logo" class="w-7 h-7 md:w-9 md:h-9 transition-transform duration-300 group-hover:rotate-12">
      <span class="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Soowe</span>
    </div>

    <!-- Menú de navegación (escritorio) -->
    <nav class="hidden md:flex space-x-4">
      <ul class="flex space-x-4">
        <li
          v-for="item in Menu"
          :key="item.name"
          class="rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
          :class="{ 'bg-blue-50 shadow-sm': isActive(item.route) }"
        >
          <router-link
            :to="item.route"
            class="block text-primary font-bold py-2 px-4 text-lg whitespace-nowrap text-center transition-all duration-300 ease-in-out hover:bg-blue-50"
            :class="{ 'text-blue-600': isActive(item.route) }"
          >
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Íconos y menú de perfil -->
    <div class="flex items-center space-x-3 md:space-x-5 relative" ref="profileMenu">
      <!-- Settings Icon (SVG) -->
      <button class="group relative" @click="goToSettings">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-6 md:h-6 cursor-pointer transition-transform duration-300 ease-in-out group-hover:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
        <span class="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs bg-blue-100 text-blue-800 rounded-full px-1.5">Config</span>
      </button>
      
      <!-- Notification Icon (SVG) -->
      <button class="group relative" @click="toggleNotificationsPanel">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-6 md:h-6 cursor-pointer transition-all duration-300 ease-in-out group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <span v-if="unreadNotificationsCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">{{ unreadNotificationsCount }}</span>
      </button>
      
      <!-- Profile Menu -->
      <div 
        class="flex items-center p-1.5 rounded-lg border-2 border-gray-300 hover:border-blue-400 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
        @click="toggleDropdown"
      >
        <div class="flex items-center space-x-2 md:space-x-3">
          <img src="@/assets/square-pattern.png" alt="Organization" class="w-10 h-6 md:w-14 md:h-9 rounded-md object-cover">
          <img src="@/assets/profile-picture-placeholder.png" alt="Profile" class="w-6 h-6 md:w-9 md:h-9 rounded-full object-cover border-2 border-white shadow-sm">
        </div>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 transition-transform duration-300" 
          :class="{ 'rotate-180': isDropdownOpen }"
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      
      <!-- Menú desplegable con transición usando Vue y Tailwind -->
      <transition
        enter-active-class="transition transform duration-300 ease-out"
        enter-from-class="scale-95 opacity-0"
        enter-to-class="scale-100 opacity-100"
        leave-active-class="transition transform duration-200 ease-in"
        leave-from-class="scale-100 opacity-100"
        leave-to-class="scale-95 opacity-0"
      >
        <div
          v-if="isDropdownOpen"
          ref="dropdownMenu"
          class="absolute right-0 top-full mt-2 bg-white shadow-xl rounded-lg w-56 border border-gray-200 z-50 overflow-hidden"
        >
          <div class="py-2 px-3 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200">
            <p class="text-sm font-medium text-gray-600">Conectado como</p>
            <p class="text-blue-700 font-bold truncate">{{ userEmail }}</p>
          </div>
          <ul>
            <li @click="goToProfile" class="px-4 py-3 text-primary cursor-pointer hover:bg-blue-50 transition-colors duration-200 ease-in-out flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Mi perfil
            </li>
            <li @click="openLogoutModal" class="px-4 py-3 text-red-600 cursor-pointer hover:bg-red-50 transition-colors duration-200 ease-in-out flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Cerrar sesión
            </li>
          </ul>
        </div>
      </transition>
    </div>

    <!-- Menú de hamburguesa con animación (móvil) -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div 
        v-if="isMenuOpen"
        class="absolute top-16 left-0 w-full bg-white shadow-xl rounded-lg border border-gray-200 z-30 md:hidden"
      >
        <ul class="space-y-1 p-3">
          <li v-for="item in Menu" :key="item.name">
            <router-link 
              :to="item.route" 
              class="flex items-center p-3 hover:bg-blue-50 rounded-lg transition-colors duration-200 ease-in-out font-bold"
              :class="{ 'bg-blue-50 text-blue-600': isActive(item.route), 'text-primary': !isActive(item.route) }"
              @click="closeMenu"
            >
              <span v-if="item.name === 'Dashboard'" class="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </span>
              <span v-else-if="item.name === 'Enfermeros'" class="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </span>
              <span v-else-if="item.name === 'Solicitudes'" class="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  <line x1="12" y1="11" x2="12" y2="17"></line>
                  <line x1="9" y1="14" x2="15" y2="14"></line>
                </svg>
              </span>
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </transition>

    <!-- Botón del menú de hamburguesa -->
    <button 
      type="button" 
      class="relative block focus:outline-none md:hidden z-30 w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      @click="toggleMenu"
      aria-label="Menú de navegación"
    >
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-6 h-6 relative">
          <span 
            class="absolute h-0.5 w-6 bg-primary rounded-sm transition-all duration-300 ease-in-out"
            :class="isMenuOpen ? 'rotate-45 top-3' : 'top-1'"
          ></span>
          <span 
            class="absolute h-0.5 w-6 bg-primary rounded-sm top-3 transition-all duration-300 ease-in-out"
            :class="isMenuOpen ? 'opacity-0' : 'opacity-100'"
          ></span>
          <span 
            class="absolute h-0.5 w-6 bg-primary rounded-sm transition-all duration-300 ease-in-out"
            :class="isMenuOpen ? '-rotate-45 top-3' : 'top-5'"
          ></span>
        </div>
      </div>
    </button>

    <!-- Modal de confirmación de cierre de sesión -->
    <LogoutModal
      :isOpen="isLogoutModalOpen"
      @confirm="confirmLogout"
      @cancel="closeLogoutModal"
    />

    <!-- Panel de notificaciones -->
    <NotificationsPanel
      :is-open="isNotificationsPanelOpen"
      :notifications="notifications"
      @close="toggleNotificationsPanel"
      @read="markNotificationAsRead"
      @mark-all-read="markAllNotificationsAsRead"
      @action="handleNotificationAction"
      @view-all="viewAllNotifications"
    />
  </header>
</template>

<script setup>
// Importar los componentes necesarios
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LogoutModal from '@/components/DashboardComponents/LogoutModal.vue';
import NotificationsPanel from '@/components/DashboardComponents/NotificationsPanel.vue';
import { getUserEmail } from "@/api/auth.js";

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

const userEmail = ref("");

onMounted(() => {
  userEmail.value = getUserEmail();
  document.addEventListener('click', handleClickOutside);
});

// Añadir estado para el panel de notificaciones
const isNotificationsPanelOpen = ref(false);
const notifications = ref([
  {
    id: 1,
    type: 'solicitud',
    title: 'Nueva solicitud recibida',
    message: 'Se ha recibido una nueva solicitud de servicio de enfermería para el paciente Juan Pérez.',
    time: new Date(Date.now() - 30 * 60000), // 30 minutos atrás
    read: false,
    actions: [
      { label: 'Ver detalles', primary: true },
      { label: 'Asignar enfermero', primary: false }
    ]
  },
  {
    id: 2,
    type: 'enfermero',
    title: 'Nuevo enfermero registrado',
    message: 'María Rodríguez se ha registrado como nueva enfermera en el sistema.',
    time: new Date(Date.now() - 2 * 60 * 60000), // 2 horas atrás
    read: false,
    actions: [
      { label: 'Ver perfil', primary: true }
    ]
  },
  {
    id: 3,
    type: 'sistema',
    title: 'Actualización del sistema',
    message: 'Se ha realizado una actualización del sistema con nuevas funcionalidades.',
    time: new Date(Date.now() - 5 * 60 * 60000), // 5 horas atrás
    read: true
  }
]);

// Calcular el número de notificaciones no leídas
const unreadNotificationsCount = computed(() => {
  return notifications.value.filter(notification => !notification.read).length;
});

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

// Función para alternar el panel de notificaciones
const toggleNotificationsPanel = () => {
  isNotificationsPanelOpen.value = !isNotificationsPanelOpen.value;
  if (isDropdownOpen.value) {
    isDropdownOpen.value = false;
  }
};

// Función para marcar una notificación como leída
const markNotificationAsRead = (id) => {
  const notification = notifications.value.find(n => n.id === id);
  if (notification) {
    notification.read = true;
  }
};

// Función para marcar todas las notificaciones como leídas
const markAllNotificationsAsRead = () => {
  notifications.value.forEach(notification => {
    notification.read = true;
  });
};

// Función para manejar acciones de notificaciones
const handleNotificationAction = ({ action, notificationId }) => {
  console.log(`Acción: ${action.label}, ID de notificación: ${notificationId}`);
  // Aquí puedes implementar la lógica específica para cada acción
};

// Función para ver todas las notificaciones
const viewAllNotifications = () => {
  isNotificationsPanelOpen.value = false;
  router.push('/notificaciones');
};

const isActive = (routeName) => {
  return route.path === routeName;
};

const handleClickOutside = (event) => {
  if (profileMenu.value && !profileMenu.value.contains(event.target) && 
      (!dropdownMenu.value || !dropdownMenu.value.contains(event.target))) {
    isDropdownOpen.value = false;
  }
};

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Actualizar la función goToProfile
const goToProfile = () => {
  router.push('/perfil');
  isDropdownOpen.value = false;
};

// Añadir función para ir a configuración
const goToSettings = () => {
  router.push('/configuracion');
};

const openLogoutModal = () => {
  isLogoutModalOpen.value = true;
  isDropdownOpen.value = false;
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
/* Animación para el logo */
@keyframes pulse-subtle {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Efecto de brillo para los botones */
.hover-glow:hover {
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
}

/* Animación para las notificaciones */
@keyframes pulse {
  0% { transform: scale(0.95); opacity: 0.7; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.7; }
}

.animate-pulse {
  animation: pulse 2s infinite;
}
</style>