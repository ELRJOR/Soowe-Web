<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div 
        v-if="isOpen" 
        class="fixed right-4 top-16 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-[100] overflow-hidden"
        style="max-height: 80vh;"
      >
        <div class="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-800">Notificaciones</h3>
            <div class="flex items-center space-x-2">
              <button 
                @click="markAllAsRead" 
                class="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                v-if="unreadCount > 0"
              >
                Marcar todo como leído
              </button>
              <button 
                @click="$emit('close')" 
                class="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          <div class="flex mt-2">
            <button 
              @click="activeTab = 'all'" 
              class="flex-1 py-1 px-2 text-sm font-medium rounded-md transition-colors"
              :class="activeTab === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-white/50'"
            >
              Todas
            </button>
            <button 
              @click="activeTab = 'unread'" 
              class="flex-1 py-1 px-2 text-sm font-medium rounded-md transition-colors relative"
              :class="activeTab === 'unread' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-white/50'"
            >
              No leídas
              <span 
                v-if="unreadCount > 0" 
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
              >
                {{ unreadCount }}
              </span>
            </button>
          </div>
        </div>

        <div class="overflow-y-auto" style="max-height: calc(80vh - 130px);">
          <div v-if="filteredNotifications.length === 0" class="p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p class="text-gray-500">No hay notificaciones {{ activeTab === 'unread' ? 'no leídas' : '' }}</p>
          </div>

          <div v-else>
            <div 
              v-for="notification in filteredNotifications" 
              :key="notification.id"
              :class="[
                'p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer',
                notification.read ? 'bg-white' : 'bg-blue-50'
              ]"
              @click="readNotification(notification.id)"
            >
              <div class="flex">
                <div class="flex-shrink-0 mr-3">
                  <div 
                    class="h-10 w-10 rounded-full flex items-center justify-center"
                    :class="getNotificationTypeClass(notification.type)"
                  >
                    <svg v-if="notification.type === 'solicitud'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                    </svg>
                    <svg v-else-if="notification.type === 'enfermero'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <svg v-else-if="notification.type === 'sistema'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div class="flex-1">
                  <div class="flex items-start justify-between">
                    <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
                    <p class="text-xs text-gray-500 ml-2">{{ formatTime(notification.time) }}</p>
                  </div>
                  <p class="text-sm text-gray-600 mt-1">{{ notification.message }}</p>
                  <div v-if="notification.actions" class="mt-2 flex space-x-2">
                    <button 
                      v-for="action in notification.actions" 
                      :key="action.label"
                      class="px-2 py-1 text-xs font-medium rounded-md transition-colors"
                      :class="action.primary ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                      @click.stop="handleAction(action, notification.id)"
                    >
                      {{ action.label }}
                    </button>
                  </div>
                </div>
                <div v-if="!notification.read" class="ml-2 flex-shrink-0">
                  <div class="h-2 w-2 rounded-full bg-blue-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-3 bg-gray-50 border-t border-gray-200 text-center">
          <button 
            @click="$emit('view-all')" 
            class="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Ver todas las notificaciones
          </button>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  notifications: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['close', 'read', 'mark-all-read', 'view-all', 'action']);

const activeTab = ref('all');

// Filtrar notificaciones según la pestaña activa
const filteredNotifications = computed(() => {
  if (activeTab.value === 'unread') {
    return props.notifications.filter(notification => !notification.read);
  }
  return props.notifications;
});

// Contar notificaciones no leídas
const unreadCount = computed(() => {
  return props.notifications.filter(notification => !notification.read).length;
});

// Marcar una notificación como leída
const readNotification = (id) => {
  emit('read', id);
};

// Marcar todas las notificaciones como leídas
const markAllAsRead = () => {
  emit('mark-all-read');
};

// Manejar acciones de notificación
const handleAction = (action, notificationId) => {
  emit('action', { action, notificationId });
};

// Obtener clase de color según el tipo de notificación
const getNotificationTypeClass = (type) => {
  switch (type) {
    case 'solicitud':
      return 'bg-blue-100 text-blue-600';
    case 'enfermero':
      return 'bg-green-100 text-green-600';
    case 'sistema':
      return 'bg-purple-100 text-purple-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

// Formatear tiempo relativo
const formatTime = (timestamp) => {
  const now = new Date();
  const notificationTime = new Date(timestamp);
  const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
  
  if (diffInMinutes < 1) {
    return 'Ahora';
  } else if (diffInMinutes < 60) {
    return `Hace ${diffInMinutes} min`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    if (days < 7) {
      return `Hace ${days} ${days === 1 ? 'día' : 'días'}`;
    } else {
      return notificationTime.toLocaleDateString();
    }
  }
};
</script>

<style scoped>
/* Animación para los botones */
button {
  transition: all 0.2s ease;
}

button:active {
  transform: scale(0.97);
}

/* Estilizar la barra de desplazamiento */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>