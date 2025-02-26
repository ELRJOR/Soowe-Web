<script setup>
import { defineAsyncComponent, ref, onMounted } from 'vue';
import { fetchEnfermeros, addEnfermero, deleteEnfermero } from '../api/enfermeros';
import EnfermeroForm from '../components/EnfermerosComponents/EnfermeroForm.vue';
import EnfermeroList from '../components/EnfermerosComponents/EnfermeroList.vue';

const NavBar = defineAsyncComponent(() => import('@/components/DashboardComponents/NavBar.vue'));

const enfermeros = ref([]);
const showModal = ref(false);

// Obtener lista de enfermeros
const getEnfermeros = async () => {
  enfermeros.value = await fetchEnfermeros();
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

// Cargar enfermeros al montar el componente
onMounted(getEnfermeros);
</script>

<template>
  <NavBar />
  <div class="max-w-5xl mx-auto p-6">
    <h1 class="text-3xl font-bold text-gray-800 text-center mb-6">
      Administración de Enfermeros
    </h1>

    <div class="bg-white shadow-md rounded-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-700">Lista de Enfermeros</h2>
        <button 
          @click="showModal = true" 
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          + Agregar Enfermero
        </button>
      </div>

      <EnfermeroList 
        :enfermeros="enfermeros" 
        @edit="handleEdit" 
        @delete="handleDelete"
      />
    </div>
  </div>

  <!-- 📌 Modal Mejorado -->
  <div 
    v-if="showModal" 
    id="modal-overlay"
    @click="closeModal"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
  >
    <div 
      class="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg sm:max-w-2xl transform transition-all scale-95 sm:scale-100"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold text-gray-800">Registrar Enfermero</h2>
        <button 
          @click="showModal = false" 
          class="text-gray-500 hover:text-gray-800 text-2xl font-bold"
        >
          ✖
        </button>
      </div>

        <EnfermeroForm @submit="handleFormSubmit" />
    </div>
  </div>
</template>
