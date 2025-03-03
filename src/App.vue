<template>
  <div class="bg-[#FFFFFF] min-h-screen">
    <!-- Suspense para manejar la carga de páginas -->
    <Suspense>
      <template #default>
        <transition
          mode="out-in"
          enter-active-class="transition-opacity duration-300 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-300 ease-out"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <router-view />
        </transition>
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

// Componente de carga opcional
const loadingSpinner = defineAsyncComponent(() => import('@/components/loadingSpinner.vue'));
</script>

<style>
* {
  scrollbar-width: thin;
  scrollbar-color: #111827 #f1f1f1;
}
</style>
