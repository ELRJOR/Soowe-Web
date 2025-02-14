<template>
  <div class="bg-[#FFFFFF] min-h-screen">

    <!-- Suspense para manejar la carga de páginas -->
    <Suspense>
      <template #default>
        <router-view />
      </template>
      <template #fallback>
        <div class="flex justify-center items-center min-h-screen">
          <loadingSpinner />
        </div>
      </template>
    </Suspense>

    <Footer /> <!-- Footer siempre visible -->
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import { RouterView } from 'vue-router';


// Componente de carga opcional
const loadingSpinner = defineAsyncComponent(() => import('@/components/loadingSpinner.vue'));
</script>

<style>
* {
  scrollbar-width: thin;
  scrollbar-color: #111827 #f1f1f1;
}
</style>
