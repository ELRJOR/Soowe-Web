<template>
    <div class="bg-gray-50 min-h-screen pb-10">
      <!-- Encabezado del perfil con imagen de portada -->
      <div class="relative">
        <div class="h-48 bg-gradient-to-r from-primary to-blue-600 w-full"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        
        <!-- Contenedor principal del perfil -->
        <div class="container mx-auto px-4 sm:px-6">
          <div class="relative -mt-16">
            <!-- Tarjeta de información principal -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <div class="flex flex-col md:flex-row">
                <!-- Avatar y botones de acción -->
                <div class="flex flex-col items-center md:items-start md:mr-8">
                  <div class="relative">
                    <img 
                      :src="user.profileImage || '/placeholder-avatar.jpg'" 
                      alt="Foto de perfil" 
                      class="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                    />
                    <button 
                      class="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors"
                      @click="openImageUpload"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <input 
                      type="file" 
                      id="fileInput"
                      class="hidden" 
                      accept="image/*"
                      @change="handleImageUpload"
                    />
                  </div>
                  
                  <div class="mt-4 flex flex-col items-center md:items-start space-y-2 w-full">
                    <button class="w-full md:w-auto bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center" @click="updateProfile">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Editar perfil
                    </button>
                    <button v-if="user.role === 'enfermero'" class="w-full md:w-auto bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                      </svg>
                      Disponibilidad
                    </button>
                  </div>
                </div>
                
                <!-- Información del perfil -->
                <div class="mt-6 md:mt-0 flex-1">
                  <div class="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h1 class="text-2xl font-bold text-gray-800">{{ user.name }}</h1>
                      <p class="text-gray-600">{{ user.role === 'enfermero' ? 'Enfermero/a Profesional' : 'Cliente' }}</p>
                    </div>
                    <div class="mt-2 md:mt-0">
                      <span 
                        :class="[
                          'px-3 py-1 rounded-full text-sm font-medium',
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 
                          user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'
                        ]"
                      >
                        {{ 
                          user.status === 'active' ? 'Activo' : 
                          user.status === 'pending' ? 'Pendiente de verificación' : 
                          'Inactivo' 
                        }}
                      </span>
                    </div>
                  </div>
                  
                  <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h2 class="text-lg font-semibold text-gray-800 mb-3">Información personal</h2>
                      <div class="space-y-3">
                        <div class="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span class="text-gray-600">{{ user.email }}</span>
                        </div>
                        <div class="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span class="text-gray-600">{{ user.phone }}</span>
                        </div>
                        <div class="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span class="text-gray-600">{{ user.location }}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div v-if="user.role === 'enfermero'">
                      <h2 class="text-lg font-semibold text-gray-800 mb-3">Información profesional</h2>
                      <div class="space-y-3">
                        <div class="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span class="text-gray-600">Licencia: {{ user.license }}</span>
                        </div>
                        <div class="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span class="text-gray-600">{{ user.experience }} años de experiencia</span>
                        </div>
                        <div class="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                          <span class="text-gray-600">Especialidad: {{ user.specialty }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Pestañas de navegación -->
            <div class="mt-6 bg-white rounded-lg shadow-md">
              <div class="border-b border-gray-200">
                <nav class="flex -mb-px">
                  <button 
                    v-for="tab in tabs" 
                    :key="tab.id"
                    @click="activeTab = tab.id"
                    :class="[
                      'py-4 px-6 text-center border-b-2 font-medium text-sm flex-1',
                      activeTab === tab.id 
                        ? 'border-primary text-primary' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    ]"
                  >
                    {{ tab.name }}
                  </button>
                </nav>
              </div>
              
              <!-- Contenido de las pestañas -->
              <div class="p-6">
                <!-- Pestaña de Resumen -->
                <div v-if="activeTab === 'summary'" class="space-y-6">
                  <div v-if="user.role === 'enfermero'">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Estadísticas</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div class="flex items-center">
                          <div class="p-3 rounded-full bg-blue-100 text-primary mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div>
                            <p class="text-sm text-gray-500">Servicios completados</p>
                            <p class="text-xl font-semibold text-gray-800">{{ stats.completedServices }}</p>
                          </div>
                        </div>
                      </div>
                      <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div class="flex items-center">
                          <div class="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          </div>
                          <div>
                            <p class="text-sm text-gray-500">Valoración media</p>
                            <p class="text-xl font-semibold text-gray-800">{{ stats.averageRating }}/5</p>
                          </div>
                        </div>
                      </div>
                      <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div class="flex items-center">
                          <div class="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <p class="text-sm text-gray-500">Horas trabajadas</p>
                            <p class="text-xl font-semibold text-gray-800">{{ stats.hoursWorked }}</p>
                          </div>
                        </div>
                      </div>
                      <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div class="flex items-center">
                          <div class="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p class="text-sm text-gray-500">Ingresos totales</p>
                            <p class="text-xl font-semibold text-gray-800">{{ stats.totalEarnings }}€</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Actividad reciente</h3>
                    <div class="space-y-4">
                      <div v-for="(activity, index) in recentActivity" :key="index" class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div class="flex items-start">
                          <div class="p-2 rounded-full bg-blue-100 text-primary mr-3">
                            <svg v-if="activity.type === 'service'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <svg v-else-if="activity.type === 'payment'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                          </div>
                          <div class="flex-1">
                            <div class="flex justify-between items-start">
                              <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                              <p class="text-xs text-gray-500">{{ activity.date }}</p>
                            </div>
                            <p class="text-sm text-gray-600 mt-1">{{ activity.description }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Pestaña de Servicios -->
                <div v-else-if="activeTab === 'services'" class="space-y-6">
                  <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold text-gray-800">Historial de servicios</h3>
                    <div class="flex space-x-2">
                      <div class="relative">
                        <input 
                          type="text" 
                          placeholder="Buscar servicios..." 
                          class="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <select class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                        <option value="all">Todos</option>
                        <option value="completed">Completados</option>
                        <option value="pending">Pendientes</option>
                        <option value="cancelled">Cancelados</option>
                      </select>
                    </div>
                  </div>
                  
                  <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {{ user.role === 'enfermero' ? 'Cliente' : 'Enfermero' }}
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Importe</th>
                          <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="service in services" :key="service.id" class="hover:bg-gray-50">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{{ service.id }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ service.date }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ service.type }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ service.person }}</td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span 
                              :class="[
                                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                                service.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                service.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                service.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                                'bg-gray-100 text-gray-800'
                              ]"
                            >
                              {{ 
                                service.status === 'completed' ? 'Completado' : 
                                service.status === 'pending' ? 'Pendiente' : 
                                service.status === 'cancelled' ? 'Cancelado' : 
                                service.status 
                              }}
                            </span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ service.amount }}€</td>
                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button class="text-primary hover:text-blue-800 mr-3">Ver detalles</button>
                            <button 
                              v-if="service.status === 'pending'" 
                              class="text-red-600 hover:text-red-900"
                            >
                              Cancelar
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div class="flex justify-between items-center mt-4">
                    <div class="text-sm text-gray-500">
                      Mostrando <span class="font-medium">1</span> a <span class="font-medium">5</span> de <span class="font-medium">{{ services.length }}</span>  a <span class="font-medium">5</span> de <span class="font-medium">{{ services.length }}</span> resultados
                    </div>
                    <div class="flex space-x-2">
                      <button class="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50">Anterior</button>
                      <button class="px-3 py-1 bg-primary text-white rounded-md text-sm hover:bg-blue-600">1</button>
                      <button class="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50">2</button>
                      <button class="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50">Siguiente</button>
                    </div>
                  </div>
                </div>
                
                <!-- Pestaña de Configuración -->
                <div v-else-if="activeTab === 'settings'" class="space-y-8">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Información personal</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                        <input 
                          type="text" 
                          id="name" 
                          v-model="user.name" 
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                        <input 
                          type="email" 
                          id="email" 
                          v-model="user.email" 
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          v-model="user.phone" 
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label for="location" class="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                        <input 
                          type="text" 
                          id="location" 
                          v-model="user.location" 
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                    <div class="mt-4">
                      <button 
                        @click="updateProfile" 
                        class="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                      >
                        Guardar cambios
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Cambiar contraseña</h3>
                    <div class="space-y-4 max-w-md">
                      <div>
                        <label for="current-password" class="block text-sm font-medium text-gray-700 mb-1">Contraseña actual</label>
                        <input 
                          type="password" 
                          id="current-password"
                          v-model="currentPassword"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label for="new-password" class="block text-sm font-medium text-gray-700 mb-1">Nueva contraseña</label>
                        <input 
                          type="password" 
                          id="new-password"
                          v-model="newPassword"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label for="confirm-password" class="block text-sm font-medium text-gray-700 mb-1">Confirmar nueva contraseña</label>
                        <input 
                          type="password" 
                          id="confirm-password"
                          v-model="confirmPassword"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <button 
                          @click="updatePassword" 
                          class="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                          Actualizar contraseña
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Notificaciones</h3>
                    <div class="space-y-4">
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="text-sm font-medium text-gray-700">Notificaciones por correo electrónico</p>
                          <p class="text-sm text-gray-500">Recibir notificaciones por correo electrónico</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" v-model="notifications.email" class="sr-only peer">
                          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="text-sm font-medium text-gray-700">Notificaciones push</p>
                          <p class="text-sm text-gray-500">Recibir notificaciones push en el dispositivo</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" v-model="notifications.push" class="sr-only peer">
                          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="text-sm font-medium text-gray-700">Notificaciones de marketing</p>
                          <p class="text-sm text-gray-500">Recibir ofertas y novedades</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" v-model="notifications.marketing" class="sr-only peer">
                          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                    <div class="mt-4">
                      <button 
                        @click="updateNotificationSettings" 
                        class="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                      >
                        Guardar notificaciones
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 class="text-lg font-semibold text-red-600 mb-4">Zona de peligro</h3>
                    <div class="bg-red-50 p-4 rounded-md border border-red-200">
                      <p class="text-sm text-red-600 mb-4">Las siguientes acciones son irreversibles. Por favor, proceda con precaución.</p>
                      <div class="space-y-4">
                        <button class="bg-white text-red-600 border border-red-300 px-4 py-2 rounded-md hover:bg-red-50 transition-colors">
                          Desactivar cuenta
                        </button>
                        <button class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                          Eliminar cuenta permanentemente
                        </button>
                      </div>
                    </div>
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
  import { ref, onMounted } from 'vue';
  import { getUserEmail } from "@/api/auth.js";
  import axios from 'axios'; // Asegúrate de tener axios instalado o usa tu cliente HTTP preferido
  
  // Estado inicial
  const user = ref({
    name: 'Ana Martínez',
    role: 'enfermero', // 'enfermero' o 'cliente'
    email: '',
    phone: '+34 612 345 678',
    location: 'Madrid, España',
    status: 'active',
    profileImage: null, // URL de la imagen de perfil
    license: 'ENF-12345',
    experience: 5,
    specialty: 'Cuidados intensivos'
  });
  
  const stats = ref({
    completedServices: 48,
    averageRating: 4.8,
    hoursWorked: 256,
    totalEarnings: 3840
  });
  
  const recentActivity = ref([
    {
      type: 'service',
      title: 'Servicio completado',
      description: 'Has completado un servicio de cuidados a domicilio para Juan Pérez.',
      date: 'Hace 2 días'
    },
    {
      type: 'payment',
      title: 'Pago recibido',
      description: 'Has recibido un pago de 80€ por el servicio #1234.',
      date: 'Hace 3 días'
    },
    {
      type: 'notification',
      title: 'Nueva solicitud',
      description: 'Has recibido una nueva solicitud de servicio de María García.',
      date: 'Hace 5 días'
    }
  ]);
  
  const services = ref([
    {
      id: '1234',
      date: '15/03/2023',
      type: 'Cuidados a domicilio',
      person: 'Juan Pérez',
      status: 'completed',
      amount: 80
    },
    {
      id: '1235',
      date: '10/03/2023',
      type: 'Administración de medicamentos',
      person: 'María García',
      status: 'completed',
      amount: 60
    },
    {
      id: '1236',
      date: '05/03/2023',
      type: 'Control de constantes',
      person: 'Carlos Rodríguez',
      status: 'completed',
      amount: 50
    },
    {
      id: '1237',
      date: '01/04/2023',
      type: 'Cuidados a domicilio',
      person: 'Laura Sánchez',
      status: 'pending',
      amount: 80
    },
    {
      id: '1238',
      date: '28/02/2023',
      type: 'Curas',
      person: 'Antonio López',
      status: 'cancelled',
      amount: 70
    }
  ]);
  
  // Pestañas
  const tabs = ref([
    { id: 'summary', name: 'Resumen' },
    { id: 'services', name: 'Servicios' },
    { id: 'settings', name: 'Configuración' }
  ]);
  
  const activeTab = ref('summary');
  
  // Configuración de notificaciones
  const notifications = ref({
    email: true,
    push: true,
    marketing: false
  });
  
  // Variables para cambio de contraseña
  const currentPassword = ref('');
  const newPassword = ref('');
  const confirmPassword = ref('');
  
  // Cargar datos del usuario
  const fetchUserData = async () => {
    try {
      // Obtener el email del usuario actual
      user.value.email = getUserEmail();
      
      // Aquí puedes añadir llamadas a tu API para obtener el resto de datos
      // Por ahora usamos datos de ejemplo
      
      // Ejemplo de cómo sería con una API real:
      // const response = await axios.get('/api/user/profile');
      // user.value = response.data.user;
    } catch (error) {
      console.error('Error al cargar datos del perfil:', error);
    }
  };
  
  // Actualizar información del perfil
  const updateProfile = async () => {
    try {
      // Aquí implementarías la llamada a tu API
      // await axios.put('/api/user/profile', {
      //   name: user.value.name,
      //   email: user.value.email,
      //   phone: user.value.phone,
      //   location: user.value.location
      // });
      
      // Por ahora solo mostramos un mensaje
      alert('Perfil actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      alert('Error al actualizar el perfil');
    }
  };
  
  // Actualizar contraseña
  const updatePassword = async () => {
    if (newPassword.value !== confirmPassword.value) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    try {
      // Aquí implementarías la llamada a tu API
      // await axios.put('/api/user/password', {
      //   currentPassword: currentPassword.value,
      //   newPassword: newPassword.value
      // });
      
      // Limpiar campos y mostrar mensaje
      currentPassword.value = '';
      newPassword.value = '';
      confirmPassword.value = '';
      alert('Contraseña actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar contraseña:', error);
      alert('Error al actualizar la contraseña');
    }
  };
  
  // Actualizar configuración de notificaciones
  const updateNotificationSettings = async () => {
    try {
      // Aquí implementarías la llamada a tu API
      // await axios.put('/api/user/notifications', notifications.value);
      
      alert('Configuración de notificaciones actualizada');
    } catch (error) {
      console.error('Error al actualizar notificaciones:', error);
      alert('Error al actualizar las notificaciones');
    }
  };
  
  // Subir imagen de perfil
  const openImageUpload = () => {
    document.getElementById('fileInput').click();
  };
  
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // Mostrar vista previa
    const reader = new FileReader();
    reader.onload = (e) => {
      user.value.profileImage = e.target.result;
    };
    reader.readAsDataURL(file);
    
    // Aquí implementarías la subida a tu servidor
    // const formData = new FormData();
    // formData.append('profileImage', file);
    // await axios.post('/api/user/profile-image', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // });
    
    alert('Imagen de perfil actualizada');
  };
  
  // Cargar datos al montar el componente
  onMounted(() => {
    fetchUserData();
  });
  </script>
  
  <style scoped>
  /* Animaciones y transiciones */
  .transition-colors {
    transition: background-color 0.3s, border-color 0.3s, color 0.3s;
  }
  
  /* Estilos para las tablas */
  table {
    border-collapse: separate;
    border-spacing: 0;
  }
  
  th, td {
    border-bottom-width: 1px;
  }
  
  tr:last-child td {
    border-bottom-width: 0;
  }
  
  /* Estilos para los inputs */
  input:focus, select:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
  
  /* Estilos para los botones */
  button {
    transition: all 0.2s ease;
  }
  
  button:active {
    transform: scale(0.97);
  }
  </style>  