<template>
    <div class="min-h-screen bg-gray-50">
      <NavBar />
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Notificaciones</h1>
          <p class="text-gray-600">Gestiona todas tus notificaciones</p>
        </div>
  
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="p-6 border-b border-gray-200 flex justify-between items-center">
            <div class="flex space-x-4">
              <button 
                @click="activeTab = 'all'" 
                class="py-2 px-4 text-sm font-medium rounded-md transition-colors"
                :class="activeTab === 'all' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'"
              >
                Todas
              </button>
              <button 
                @click="activeTab = 'unread'" 
                class="py-2 px-4 text-sm font-medium rounded-md transition-colors relative"
                :class="activeTab === 'unread' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'"
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
            <button 
              v-if="unreadCount > 0"
              @click="markAllAsRead" 
              class="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Marcar todo como leído
            </button>
          </div>
  
          <div v-if="filteredNotifications.length === 0" class="p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p class="text-gray-500 text-lg">No hay notificaciones {{ activeTab === 'unread' ? 'no leídas' : '' }}</p>
          </div>
  
          <div v-else>
            <div 
              v-for="notification in filteredNotifications" 
              :key="notification.id"
              :class="[
                'p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer',
                notification.read ? 'bg-white' : 'bg-blue-50'
              ]"
              @click="readNotification(notification.id)"
            >
              <div class="flex">
                <div class="flex-shrink-0 mr-4">
                  <div 
                    class="h-12 w-12 rounded-full flex items-center justify-center"
                    :class="getNotificationTypeClass(notification.type)"
                  >
                    <svg v-if="notification.type === 'solicitud'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                    </svg>
                    <svg v-else-if="notification.type === 'enfermero'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <svg v-else-if="notification.type === 'sistema'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div class="flex-1">
                  <div class="flex items-start justify-between">
                    <div>
                      <p class="text-base font-medium text-gray-900">{{ notification.title }}</p>
                      <p class="text-sm text-gray-500 mt-1">{{ formatTime(notification.time) }}</p>
                    </div>
                    <div v-if="!notification.read" class="ml-2 flex-shrink-0">
                      <div class="h-3 w-3 rounded-full bg-blue-600"></div>
                    </div>
                  </div>
                  <p class="text-sm text-gray-600 mt-2">{{ notification.message }}</p>
                  <div v-if="notification.actions" class="mt-3 flex space-x-3">
                    <button 
                      v-for="action in notification.actions" 
                      :key="action.label"
                      class="px-3 py-1.5 text-sm font-medium rounded-md transition-colors"
                      :class="action.primary ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                      @click.stop="handleAction(action, notification.id)"
                    >
                      {{ action.label }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import NavBar from '@/components/DashboardComponents/NavBar.vue';
  
  // Estado
  const activeTab = ref('all');
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
      message: 'Se ha realizado una actualización del sistema con nuevas funcionalidades y mejoras de rendimiento.',
      time: new Date(Date.now() - 5 * 60 * 60000), // 5 horas atrás
      read: true
    },
    {
      id: 4,
      type: 'solicitud',
      title: 'Solicitud completada',
      message: 'El servicio de enfermería para el paciente Carlos Gómez ha sido completado exitosamente.',
      time: new Date(Date.now() - 1 * 24 * 60 * 60000), // 1 día atrás
      read: true,
      actions: [
        { label: 'Ver detalles', primary: true }
      ]
    },
    {
      id: 5,
      type: 'enfermero',
      title: 'Enfermero asignado',
      message: 'El enfermero Luis Hernández ha sido asignado a la solicitud #12345.',
      time: new Date(Date.now() - 2 * 24 * 60 * 60000), // 2 días atrás
      read: true
    }
  ]);
  
  // Filtrar notificaciones según la pestaña activa
  const filteredNotifications = computed(() => {
    if (activeTab.value === 'unread') {
      return notifications.value.filter(notification => !notification.read);
    }
    return notifications.value;
  });
  
  // Contar notificaciones no leídas
  const unreadCount = computed(() => {
    return notifications.value.filter(notification => !notification.read).length;
  });
  
  // Marcar una notificación como leída
  const readNotification = (id) => {
    const notification = notifications.value.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
  };
  
  // Marcar todas las notificaciones como leídas
  const markAllAsRead = () => {
    notifications.value.forEach(notification => {
      notification.read = true;
    });
  };
  
  // Manejar acciones de notificación
  const handleAction = (action, notificationId) => {
    console.log(`Acción: ${action.label}, ID de notificación: ${notificationId}`);
    // Aquí puedes implementar la lógica específica para cada acción
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