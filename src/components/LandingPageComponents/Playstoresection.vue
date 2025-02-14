<template>
  <section class="relative bg-gradient-to-r from-indigo-900 to-indigo-700 text-white py-32 px-6">
    <!-- Imagen de fondo con opacidad -->
    <div class="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0" :style="{ backgroundImage: `url(${fondo})` }">
      <!-- Capa de opacidad encima de la imagen -->
      <div class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 z-10"></div>
    </div>

    <!-- Contenido centrado -->
    <div class="relative z-20 max-w-7xl mx-auto px-4 flex items-center justify-center">
      <!-- Sección de texto y link de la app -->
      <div class="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-10">
        
        <!-- Contenedor de texto -->
        <div data-aos="flip-down" class="md:w-1/2 text-center md:text-left">
          <h2 class="text-4xl font-bold mb-6">¡Descarga nuestra app ahora!</h2>
          <p class="text-lg text-gray-200 mb-8">
            Accede a todas las funcionalidades desde tu teléfono. Administra, consulta y disfruta de la mejor experiencia desde nuestra app móvil.
          </p>

          <!-- Contenedor del enlace de descarga con el ícono de Google Play -->
          <a 
            href="https://play.google.com/store/apps/details?id=tu.app.id"
            target="_blank"
            class="flex items-center justify-center text-white p-4 rounded-lg transition">
            <img src="@/assets/googleplayicon.png" alt="Google Play" class="w-16 h-16"> <!-- Ajusta el tamaño del ícono con w-16 y h-16 -->
          </a>
        </div>

        <!-- Contenedor de la imagen más pequeño -->
        <div data-aos="flip-down" class="md:w-1/2 flex justify-center max-w-sm">
          <img src="@/assets/Prototipo.png" alt="Imagen de ejemplo" class="object-contain rounded-lg transform scale-70">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import fondo from '@/assets/AppstoreFondo.jpg'
</script>

<style scoped>
</style>
