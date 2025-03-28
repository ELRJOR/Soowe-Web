<template>
    <div class="min-h-screen bg-gray-50">
      <NavBar />
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Configuración</h1>
          <p class="text-gray-600">Administra las preferencias y ajustes de tu cuenta</p>
        </div>
  
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <!-- Menú lateral -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-xl shadow-md overflow-hidden">
              <nav class="space-y-1 p-2">
                <button
                  v-for="(item, index) in menuItems"
                  :key="index"
                  @click="activeSection = item.id"
                  class="w-full flex items-center px-4 py-3 rounded-lg transition-colors"
                  :class="activeSection === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'"
                >
                  <span class="mr-3">
                    <component :is="item.icon" class="h-5 w-5" />
                  </span>
                  <span class="font-medium">{{ item.name }}</span>
                </button>
              </nav>
            </div>
          </div>
  
          <!-- Contenido principal -->
          <div class="lg:col-span-3">
            <div class="bg-white rounded-xl shadow-md overflow-hidden">
              <!-- Sección de Perfil -->
              <div v-if="activeSection === 'perfil'" class="p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-6">Información de Perfil</h2>
                
                <div class="space-y-6">
                  <!-- Foto de perfil -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Foto de Perfil</label>
                    <div class="flex items-center">
                      <div class="flex-shrink-0 mr-4">
                        <img 
                          :src="profileImage || 'https://via.placeholder.com/100?text=Perfil'" 
                          alt="Foto de perfil" 
                          class="h-24 w-24 rounded-full object-cover border border-gray-200"
                        />
                      </div>
                      <div class="flex-1">
                        <div class="flex space-x-3">
                          <label for="profile-upload" class="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                            <span>Cambiar foto</span>
                            <input id="profile-upload" name="profile-upload" type="file" class="sr-only" @change="handleProfileImageChange" accept=".jpg, .jpeg, .png" />
                          </label>
                          <button 
                            type="button" 
                            class="py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                            @click="removeProfileImage"
                          >
                            Eliminar
                          </button>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">PNG, JPG o JPEG hasta 5MB</p>
                      </div>
                    </div>
                  </div>
  
                  <!-- Formulario de información personal -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label for="nombre" class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                      <input 
                        type="text" 
                        id="nombre" 
                        v-model="userProfile.nombre" 
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                      />
                    </div>
                    <div>
                      <label for="apellido" class="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                      <input 
                        type="text" 
                        id="apellido" 
                        v-model="userProfile.apellido" 
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                      />
                    </div>
                    <div>
                      <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                      <input 
                        type="email" 
                        id="email" 
                        v-model="userProfile.email" 
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                      />
                    </div>
                    <div>
                      <label for="telefono" class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                      <input 
                        type="tel" 
                        id="telefono" 
                        v-model="userProfile.telefono" 
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                      />
                    </div>
                  </div>
  
                  <div class="flex justify-end">
                    <button 
                      type="button" 
                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      @click="saveProfileChanges"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </div>
              </div>
  
              <!-- Sección de Seguridad -->
              <div v-if="activeSection === 'seguridad'" class="p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-6">Seguridad de la Cuenta</h2>
                
                <div class="space-y-6">
                  <!-- Cambiar contraseña -->
                  <div>
                    <h3 class="text-lg font-medium text-gray-800 mb-4">Cambiar Contraseña</h3>
                    <div class="space-y-4">
                      <div>
                        <label for="current-password" class="block text-sm font-medium text-gray-700 mb-1">Contraseña Actual</label>
                        <div class="relative">
                          <input 
                            :type="showCurrentPassword ? 'text' : 'password'" 
                            id="current-password" 
                            v-model="passwordForm.currentPassword" 
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                          />
                          <button 
                            type="button"
                            class="absolute inset-y-0 right-0 pr-3 flex items-center"
                            @click="showCurrentPassword = !showCurrentPassword"
                          >
                            <svg 
                              v-if="showCurrentPassword" 
                              xmlns="http://www.w3.org/2000/svg" 
                              class="h-5 w-5 text-gray-500" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                            </svg>
                            <svg 
                              v-else 
                              xmlns="http://www.w3.org/2000/svg" 
                              class="h-5 w-5 text-gray-500" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div>
                        <label for="new-password" class="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
                        <div class="relative">
                          <input 
                            :type="showNewPassword ? 'text' : 'password'" 
                            id="new-password" 
                            v-model="passwordForm.newPassword" 
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                          />
                          <button 
                            type="button"
                            class="absolute inset-y-0 right-0 pr-3 flex items-center"
                            @click="showNewPassword = !showNewPassword"
                          >
                            <svg 
                              v-if="showNewPassword" 
                              xmlns="http://www.w3.org/2000/svg" 
                              class="h-5 w-5 text-gray-500" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                            </svg>
                            <svg 
                              v-else 
                              xmlns="http://www.w3.org/2000/svg" 
                              class="h-5 w-5 text-gray-500" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                            </svg>
                          </button>
                        </div>
                        <!-- Indicador de fortaleza de contraseña -->
                        <div v-if="passwordForm.newPassword" class="mt-2">
                          <div class="flex items-center">
                            <div class="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                class="h-1.5 rounded-full transition-all duration-300"
                                :class="{
                                  'w-1/4 bg-red-500': passwordStrength === 'weak',
                                  'w-2/4 bg-yellow-500': passwordStrength === 'medium',
                                  'w-3/4 bg-blue-500': passwordStrength === 'strong',
                                  'w-full bg-green-500': passwordStrength === 'very-strong'
                                }"
                              ></div>
                            </div>
                            <span class="ml-2 text-xs text-gray-500">{{ passwordStrengthText }}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label for="confirm-password" class="block text-sm font-medium text-gray-700 mb-1">Confirmar Nueva Contraseña</label>
                        <div class="relative">
                          <input 
                            :type="showConfirmPassword ? 'text' : 'password'" 
                            id="confirm-password" 
                            v-model="passwordForm.confirmPassword" 
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                            :class="{'border-red-300 focus:ring-red-500 focus:border-red-500': passwordsDoNotMatch}"
                          />
                          <button 
                            type="button"
                            class="absolute inset-y-0 right-0 pr-3 flex items-center"
                            @click="showConfirmPassword = !showConfirmPassword"
                          >
                            <svg 
                              v-if="showConfirmPassword" 
                              xmlns="http://www.w3.org/2000/svg" 
                              class="h-5 w-5 text-gray-500" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                            </svg>
                            <svg 
                              v-else 
                              xmlns="http://www.w3.org/2000/svg" 
                              class="h-5 w-5 text-gray-500" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                            </svg>
                          </button>
                        </div>
                        <p v-if="passwordsDoNotMatch" class="mt-1 text-sm text-red-600">Las contraseñas no coinciden</p>
                      </div>
                    </div>
                    <div class="mt-4 flex justify-end">
                      <button 
                        type="button" 
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        @click="changePassword"
                        :disabled="!canChangePassword"
                      >
                        Cambiar Contraseña
                      </button>
                    </div>
                  </div>
  
                  <!-- Sesiones activas -->
                  <div class="pt-6 border-t border-gray-200">
                    <h3 class="text-lg font-medium text-gray-800 mb-4">Sesiones Activas</h3>
                    <div class="space-y-4">
                      <div v-for="(session, index) in activeSessions" :key="index" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div class="flex items-center">
                          <div class="mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <p class="text-sm font-medium text-gray-900">{{ session.device }}</p>
                            <p class="text-xs text-gray-500">{{ session.location }} • {{ session.lastActive }}</p>
                          </div>
                        </div>
                        <button 
                          v-if="!session.current" 
                          type="button" 
                          class="text-sm text-red-600 hover:text-red-800"
                          @click="closeSession(index)"
                        >
                          Cerrar sesión
                        </button>
                        <span v-else class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Sesión actual</span>
                      </div>
                    </div>
                    <div class="mt-4 flex justify-end">
                      <button 
                        type="button" 
                        class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        @click="closeAllSessions"
                      >
                        Cerrar todas las sesiones
                      </button>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Sección de Notificaciones -->
              <div v-if="activeSection === 'notificaciones'" class="p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-6">Preferencias de Notificaciones</h2>
                
                <div class="space-y-6">
                  <div v-for="(category, index) in notificationCategories" :key="index" class="pb-6 border-b border-gray-200 last:border-b-0 last:pb-0">
                    <h3 class="text-lg font-medium text-gray-800 mb-4">{{ category.name }}</h3>
                    <div class="space-y-4">
                      <div v-for="(setting, settingIndex) in category.settings" :key="settingIndex" class="flex items-center justify-between">
                        <div>
                          <p class="text-sm font-medium text-gray-900">{{ setting.name }}</p>
                          <p class="text-xs text-gray-500">{{ setting.description }}</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            v-model="setting.enabled" 
                            class="sr-only peer"
                          />
                          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
  
                  <div class="flex justify-end">
                    <button 
                      type="button" 
                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      @click="saveNotificationSettings"
                    >
                      Guardar Preferencias
                    </button>
                  </div>
                </div>
              </div>
  
              <!-- Sección de Organización -->
              <div v-if="activeSection === 'organizacion'" class="p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-6">Configuración de la Organización</h2>
                
                <div class="space-y-6">
                  <!-- Información de la organización -->
                  <div>
                    <h3 class="text-lg font-medium text-gray-800 mb-4">Información General</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label for="org-name" class="block text-sm font-medium text-gray-700 mb-1">Nombre de la Organización</label>
                        <input 
                          type="text" 
                          id="org-name" 
                          v-model="organizationInfo.name" 
                          class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                        />
                      </div>
                      <div>
                        <label for="org-email" class="block text-sm font-medium text-gray-700 mb-1">Correo de Contacto</label>
                        <input 
                          type="email" 
                          id="org-email" 
                          v-model="organizationInfo.email" 
                          class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                        />
                      </div>
                      <div>
                        <label for="org-phone" class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                        <input 
                          type="tel" 
                          id="org-phone" 
                          v-model="organizationInfo.phone" 
                          class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                        />
                      </div>
                      <div>
                        <label for="org-address" class="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                        <input 
                          type="text" 
                          id="org-address" 
                          v-model="organizationInfo.address" 
                          class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                        />
                      </div>
                    </div>
                  </div>
  
                  <!-- Logo de la organización -->
                  <div class="pt-6 border-t border-gray-200">
                    <h3 class="text-lg font-medium text-gray-800 mb-4">Logo de la Organización</h3>
                    <div class="flex items-center">
                      <div class="flex-shrink-0 mr-4">
                        <img 
                          :src="organizationInfo.logo || 'https://via.placeholder.com/100?text=Logo'" 
                          alt="Logo de la organización" 
                          class="h-24 w-24 object-contain border border-gray-200 rounded-md"
                        />
                      </div>
                      <div class="flex-1">
                        <div class="flex space-x-3">
                          <label for="logo-upload" class="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                            <span>Cambiar logo</span>
                            <input id="logo-upload" name="logo-upload" type="file" class="sr-only" @change="handleLogoChange" accept=".jpg, .jpeg, .png, .svg" />
                          </label>
                          <button 
                            type="button" 
                            class="py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                            @click="removeLogo"
                          >
                            Eliminar
                          </button>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">PNG, JPG, JPEG o SVG hasta 5MB</p>
                      </div>
                    </div>
                  </div>
  
                  <div class="flex justify-end">
                    <button 
                      type="button" 
                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      @click="saveOrganizationSettings"
                    >
                      Guardar Cambios
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
  import { ref, computed,onMounted } from 'vue';
  import { getToken, getOrganizationId } from "@/api/auth.js";
  import api from '@/api/conexionapi';
  import NavBar from '@/components/DashboardComponents/NavBar.vue';
  
  // Sección activa
  const activeSection = ref('perfil');
  
  // Menú de configuración
  const menuItems = [
    { id: 'perfil', name: 'Perfil', icon: 'UserIcon' },
    { id: 'seguridad', name: 'Seguridad', icon: 'ShieldCheckIcon' },
    { id: 'notificaciones', name: 'Notificaciones', icon: 'BellIcon' },
    { id: 'organizacion', name: 'Organización', icon: 'OfficeBuildingIcon' },
  ];
  
  // Componentes de iconos
  import { h } from "vue";

  onMounted(() => {
  fetchProfileData();
  fetchOrganizationData();
  // ...otras funciones de carga
});

const UserIcon = (props) => 
  h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: props.class,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, [
    h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M16 7a4 4 0 11-8 0 4 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    })
  ]);

const ShieldCheckIcon = (props) =>
  h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: props.class,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, [
    h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    })
  ]);

const BellIcon = (props) =>
  h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: props.class,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, [
    h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    })
  ]);

const OfficeBuildingIcon = (props) =>
  h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: props.class,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, [
    h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    })
  ]);
  
// Datos de perfil
const profileImage = ref(null);
const userProfile = ref({
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
});

  // Datos de contraseña
  const passwordForm = ref({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const showCurrentPassword = ref(false);
  const showNewPassword = ref(false);
  const showConfirmPassword = ref(false);
  
  // Validación de contraseñas
  const passwordsDoNotMatch = computed(() => {
    return passwordForm.value.newPassword && 
           passwordForm.value.confirmPassword && 
           passwordForm.value.newPassword !== passwordForm.value.confirmPassword;
  });
  
  const canChangePassword = computed(() => {
    return passwordForm.value.currentPassword && 
           passwordForm.value.newPassword && 
           passwordForm.value.confirmPassword && 
           !passwordsDoNotMatch.value;
  });
  
  // Fortaleza de la contraseña
  const passwordStrength = computed(() => {
    if (!passwordForm.value.newPassword) return '';
    
    const hasDigit = /\d/.test(passwordForm.value.newPassword);
    const hasUppercase = /[A-Z]/.test(passwordForm.value.newPassword);
    const hasLowercase = /[a-z]/.test(passwordForm.value.newPassword);
    const hasSpecial = /[!@#$%^&*]/.test(passwordForm.value.newPassword);
    const length = passwordForm.value.newPassword.length;
    
    let score = 0;
    if (length >= 8) score += 1;
    if (length >= 12) score += 1;
    if (hasDigit) score += 1;
    if (hasUppercase) score += 1;
    if (hasLowercase) score += 1;
    if (hasSpecial) score += 1;
    
    if (score <= 2) return 'weak';
    if (score <= 3) return 'medium';
    if (score <= 4) return 'strong';
    return 'very-strong';
  });
  
  const passwordStrengthText = computed(() => {
    switch (passwordStrength.value) {
      case 'weak': return 'Débil';
      case 'medium': return 'Media';
      case 'strong': return 'Fuerte';
      case 'very-strong': return 'Muy fuerte';
      default: return '';
    }
  });
  
  // Sesiones activas
  const activeSessions = ref([
    {
      device: 'Chrome en Windows 10',
      location: 'Ciudad de México, México',
      lastActive: 'Ahora',
      current: true
    },
    {
      device: 'Safari en iPhone',
      location: 'Ciudad de México, México',
      lastActive: 'Hace 2 horas',
      current: false
    },
    {
      device: 'Firefox en MacOS',
      location: 'Guadalajara, México',
      lastActive: 'Hace 3 días',
      current: false
    }
  ]);
  
  const fetchProfileData = async () => {
  try {
    const token = getToken();
    const orgId = getOrganizationId(); // Usamos el id de la organización almacenado
    if (!token || !orgId) {
      console.error("Token o id de la organización no válidos");
      return;
    }
    
    const response = await api.get('/api/admin/administradores', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (Array.isArray(response.data)) {
      // Filtrar el perfil según la organizacion_id
      const profile = response.data.find(item => String(item.organizacion_id) === String(orgId));
      if (profile) {
        userProfile.value.nombre = profile.nombre;
        userProfile.value.apellido = profile.apellido;
        userProfile.value.email = profile.correo; // Asegúrate de que coincida con la propiedad de la API
        userProfile.value.telefono = profile.telefono;
        // Si la API incluye la foto de perfil, actualízala
        profileImage.value = profile.foto || null;
      } else {
        console.warn("No se encontró el perfil para la organizacion_id:", orgId);
      }
    } else {
      console.error("La respuesta no es un array:", response.data);
    }
  } catch (error) {
    console.error("Error al obtener los datos del perfil:", error.response?.data || error);
  }
};


const fetchOrganizationData = async () => {
  try {
    const token = getToken();
    const orgId = getOrganizationId();
    if (!token || !orgId) {
      console.error("Token o id de la organización no válidos");
      return;
    }
    
    const response = await api.get('/api/admin/administradores', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (Array.isArray(response.data)) {
      // Se busca el registro cuyo organizacion_id coincida con el almacenado
      const admin = response.data.find(item => String(item.organizacion_id) === String(orgId));
      if (admin && admin.organizacion) {
        organizationInfo.value.name = admin.organizacion.nombre;
        // Para correo, puedes usar el del administrador o, si la API tiene otro campo, usar ese
        organizationInfo.value.email = admin.correo;
        organizationInfo.value.phone = admin.organizacion.telefono;
        organizationInfo.value.address = admin.organizacion.direccion;
        // Si la API provee una propiedad para el logo, se asigna; de lo contrario, se deja vacío
        organizationInfo.value.logo = admin.organizacion.logo || '';
      } else {
        console.warn("No se encontró información de organización para la organizacion_id:", orgId);
      }
    } else {
      console.error("La respuesta no es un array:", response.data);
    }
  } catch (error) {
    console.error("Error al obtener los datos de la organización:", error.response?.data || error);
  }
};

  // Categorías de notificaciones
  const notificationCategories = ref([
    {
      name: 'Solicitudes',
      settings: [
        {
          name: 'Nuevas solicitudes',
          description: 'Recibir notificaciones cuando lleguen nuevas solicitudes',
          enabled: true
        },
        {
          name: 'Actualizaciones de solicitudes',
          description: 'Recibir notificaciones cuando se actualice el estado de una solicitud',
          enabled: true
        },
        {
          name: 'Solicitudes completadas',
          description: 'Recibir notificaciones cuando se complete una solicitud',
          enabled: true
        }
      ]
    },
    {
      name: 'Enfermeros',
      settings: [
        {
          name: 'Nuevos registros',
          description: 'Recibir notificaciones cuando un nuevo enfermero se registre',
          enabled: true
        },
        {
          name: 'Asignaciones',
          description: 'Recibir notificaciones cuando un enfermero sea asignado a una solicitud',
          enabled: true
        }
      ]
    },
    {
      name: 'Sistema',
      settings: [
        {
          name: 'Actualizaciones del sistema',
          description: 'Recibir notificaciones sobre actualizaciones y mantenimiento del sistema',
          enabled: false
        },
        {
          name: 'Seguridad',
          description: 'Recibir alertas de seguridad y accesos a la cuenta',
          enabled: true
        }
      ]
    }
  ]);
  
  // Datos de organización (valores iniciales vacíos o placeholders)
const organizationInfo = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  logo: '', // Asumir que si existe, se obtiene de la API; sino se deja vacío
});

  
  // Métodos para el perfil
  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validar tipo y tamaño de archivo
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      alert('Por favor, sube una imagen válida (jpg, jpeg, png).');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no debe exceder los 5MB.');
      return;
    }
    
    // Crear vista previa
    const reader = new FileReader();
    reader.onload = (e) => {
      profileImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  };
  
  const removeProfileImage = () => {
    profileImage.value = null;
  };
  
  const saveProfileChanges = () => {
    // Aquí iría la lógica para guardar los cambios del perfil
    alert('Cambios guardados correctamente');
  };
  
  // Métodos para seguridad
  const changePassword = () => {
    // Aquí iría la lógica para cambiar la contraseña
    alert('Contraseña cambiada correctamente');
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  };
  
  const closeSession = (index) => {
    // Aquí iría la lógica para cerrar una sesión específica
    activeSessions.value.splice(index, 1);
  };
  
  const closeAllSessions = () => {
    // Aquí iría la lógica para cerrar todas las sesiones excepto la actual
    activeSessions.value = activeSessions.value.filter(session => session.current);
    alert('Todas las demás sesiones han sido cerradas');
  };
  
  // Métodos para notificaciones
  const saveNotificationSettings = () => {
    // Aquí iría la lógica para guardar las preferencias de notificaciones
    alert('Preferencias de notificaciones guardadas correctamente');
  };
  
  // Métodos para organización
  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validar tipo y tamaño de archivo
    if (!['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml'].includes(file.type)) {
      alert('Por favor, sube una imagen válida (jpg, jpeg, png, svg).');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no debe exceder los 5MB.');
      return;
    }
    
    // Crear vista previa
    const reader = new FileReader();
    reader.onload = (e) => {
      organizationInfo.value.logo = e.target.result;
    };
    reader.readAsDataURL(file);
  };
  
  const removeLogo = () => {
    organizationInfo.value.logo = null;
  };
  
  const saveOrganizationSettings = () => {
    // Aquí iría la lógica para guardar la configuración de la organización
    alert('Configuración de la organización guardada correctamente');
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
  
  /* Animación para las tarjetas */
  .bg-white {
    transition: all 0.3s ease;
  }
  
  .bg-white:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  </style>
  
  