<script setup>
import { defineAsyncComponent, ref, onMounted, computed } from 'vue';
import { fetchEnfermeros, addEnfermero, deleteEnfermero } from '../api/enfermeros';
import EnfermeroForm from '../components/EnfermerosComponents/EnfermeroForm.vue';
import EnfermeroList from '../components/EnfermerosComponents/EnfermeroList.vue';
import { Transition } from 'vue';

const NavBar = defineAsyncComponent(() => import('@/components/DashboardComponents/NavBar.vue'));

const enfermeros = ref([]);
const showModal = ref(false);
const isLoading = ref(true);
const searchQuery = ref('');

// Enfermeros filtrados por búsqueda
const filteredEnfermeros = computed(() => {
  if (!searchQuery.value) return enfermeros.value;
  
  // Dividir la búsqueda por espacios y eliminar entradas vacías
  const palabras = searchQuery.value.toLowerCase().split(' ').filter(p => p);
  
  return enfermeros.value.filter(enfermero => {
    const nombre = enfermero.nombre.toLowerCase();
    const apellido = enfermero.apellido.toLowerCase();
    const especialidad = enfermero.especialidad.toLowerCase();
    const correo = enfermero.correo.toLowerCase();
    
    // Se comprueba que cada palabra esté en alguno de los campos
    return palabras.every(palabra =>
      nombre.includes(palabra) ||
      apellido.includes(palabra) ||
      especialidad.includes(palabra) ||
      correo.includes(palabra)
    );
  });
});


// Obtener lista de enfermeros
const getEnfermeros = async () => {
  isLoading.value = true;
  try {
    enfermeros.value = await fetchEnfermeros();
  } catch (error) {
    console.error('Error al cargar enfermeros:', error);
  } finally {
    isLoading.value = false;
  }
};

// Manejar el formulario de registro
const handleFormSubmit = async (formData) => {
  const newEnfermero = await addEnfermero(formData);
  if (newEnfermero) {
    getEnfermeros();
    showModal.value = false; // Cerrar modal después de agregar
  }
};

// Manejar eliminación de enfermero
const handleDelete = async (id) => {
  const deleted = await deleteEnfermero(id);
  if (deleted) {
    getEnfermeros();
  }
};

// Cerrar modal al hacer clic afuera
const closeModal = (event) => {
  if (event.target.id === "modal-overlay") {
    showModal.value = false;
  }
};

// Abrir modal con animación
const openModal = () => {
  showModal.value = true;
};

// Cargar enfermeros al montar el componente
onMounted(getEnfermeros);
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar />
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Administración de Enfermeros</h1>
        <p class="text-gray-600">Gestiona el personal de enfermería de tu organización</p>
      </div>

      <div class="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div class="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div class="relative w-full sm:w-64">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Buscar enfermeros..." 
              class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          
          <button 
            @click="openModal" 
            class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Agregar Enfermero
          </button>
        </div>

        <!-- Estado de carga -->
        <div v-if="isLoading" class="flex justify-center items-center p-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>

        <!-- Estado vacío -->
        <div v-else-if="enfermeros.length === 0" class="flex flex-col items-center justify-center p-12 text-center">
          <div class="bg-blue-50 rounded-full p-4 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h3 class="text-xl font-medium text-gray-900 mb-1">No hay enfermeros registrados</h3>
          <p class="text-gray-500 mb-4">Comienza agregando tu primer enfermero</p>
          <button 
            @click="openModal" 
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Agregar Enfermero
          </button>
        </div>

        <!-- Lista de enfermeros -->
        <div v-else>
          <EnfermeroList 
            :enfermeros="filteredEnfermeros" 
            @edit="handleEdit" 
            @delete="handleDelete"
          />
        </div>
      </div>
    </div>

    <!-- Modal para agregar enfermero -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="showModal" 
        id="modal-overlay"
        @click="closeModal"
        class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <Transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div 
            id="modal-content"
            class="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-2xl mx-auto"
            @click.stop
          >
            <div class="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-gray-200">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Registrar Enfermero
                </h2>
                <button 
                  @click="showModal = false" 
                  class="text-gray-500 hover:text-gray-700 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="p-6">
              <EnfermeroForm @submit="handleFormSubmit" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>
