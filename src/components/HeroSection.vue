<template>
  <section class="relative w-full h-[calc(100vh-80px)] flex items-center justify-center" data-aos="zoom-in-up">
    <!-- Capa de fondo con la imagen -->
    <div class="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
     :style="{ backgroundImage: `url(${medicoImg})`, backgroundPosition: 'center 20%' }">
      <!-- Capa azul transparente encima de la imagen -->
      <div class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 z-10"></div>
    </div>

    <!-- Contenedor de contenido, flex para alinear -->
    <div class="absolute inset-0 flex justify-center items-center z-20">
      <div class="text-center px-5 sm:px-8 md:px-12 lg:px-8 max-w-screen-lg lg:max-w-screen-xl mx-auto">
        <div class="grid lg:grid-cols-1 gap-10 xl:gap-14 w-full h-full justify-center">
          <!-- Contenido de texto -->
          <div class="flex flex-col justify-center items-center h-full">
            <!-- Título moderado -->
            <h1 class="pt-4 text-white font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              ¿Qué es
              <span class="text-primary">
                Soowe? 👩‍⚕️
              </span> 
            </h1>
            <!-- Texto moderado -->
            <p class="text-white pt-6 mx-auto max-w-xl text-lg sm:text-xl md:text-2xl">
              "¿No sabes a quién acudir en una emergencia?
              Con Soowe, tienes acceso inmediato a asistentes médicos las 24 horas del día, directamente desde tu celular. Porque tu salud es lo más importante, y estar acompañado en los momentos críticos no debería ser un lujo."
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import medicoImg from '@/assets/Medico.jpg'
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  AOS.init()
})
</script>
