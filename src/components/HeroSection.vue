<template>
    <section class="relative w-full h-[calc(100vh-80px)] flex items-center" data-aos="zoom-in-up">
      <div class="absolute top-0 inset-x-0 h-64 flex items-start">
        <div class="h-24 w-2/3 bg-gradient-to-br from-[#570cac] blur-2xl invisible opacity-40"></div>
        <div class="h-20 w-3/5 bg-gradient-to-r from-[#670ccf] opacity-40 blur-2xl"></div>
      </div>
      <div class="w-full h-full px-5 sm:px-8 md:px-12 lg:px-8 max-w-screen-lg lg:max-w-screen-xl mx-auto relative flex items-center">
        <div class="grid lg:grid-cols-2 gap-10 xl:gap-14 w-full h-full">
          <!-- Contenido de texto -->
          <div class="lg:py-6 flex flex-col justify-center h-full">
            <div class="text-center lg:text-left">
              <h1 class="pt-4 text-white font-bold text-4xl md:text-5xl lg:text-6xl">
                Conecta con asistentes médicos en cualquier momento con 
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                  Soowe
                </span> 👩‍⚕️
              </h1>
            </div>
            <!-- Imagen para móviles: se muestra justo debajo del título -->
            <div class="block lg:hidden mt-4 flex justify-center">
              <div class="relative w-[45vw] max-w-[250px]">
                <img src="@/assets/Medico.jpg" alt="Hero pic" class="w-full h-auto rounded-full object-cover shadow-lg border border-secondary">
              </div>
            </div>
            <p class="text-gray-300 pt-8 text-center lg:text-left mx-auto max-w-xl">
              ¿Cansado de no saber a quién acudir cuando tienes una urgencia? ¿Las recomendaciones que obtienes no son seguras? Con Soowe te ahorras malos entendidos y encuentras la atención que necesitas en cortos periodos de tiempo.
            </p>
            <div class="flex items-center gap-3 pt-9 flex-col sm:flex-row sm:w-max sm:mx-auto lg:mx-0">
              <button class="px-6 md:px-7 py-3 rounded-full relative group w-full sm:w-max flex justify-center">
                <span class="absolute inset-0 rounded-3xl group-hover:scale-105 origin-center transition-all ease-in-out bg-primary border-2 border-transparent"></span>
                <span class="relative flex items-center justify-center text-white">
                  Empezar ahora
                </span>
              </button>
            </div>
          </div>
          <!-- Imagen para escritorio: se muestra en pantallas grandes -->
          <div class="hidden lg:flex lg:h-full md:flex justify-center items-center">
            <!-- Se limita la altura del contenedor para recortar verticalmente -->
            <div class="flex w-full h-full items-center relative max-h-[400px] mx-auto">
              <div class="absolute z-0 top-1/2 -translate-y-1/2 w-5/6 right-0 h-[calc(80%+20px)] bg-gradient-to-tr opacity-25 from-[#570cac] to-primary blur-2xl"></div>
              <div class="absolute h-full z-10 p-2 -translate-y-1/2 top-1/2 lg:right-3 md:right-40 sm:right-16 rounded-full shadow-lg border border-secondary">
                <img src="@/assets/Medico.jpg" alt="Hero pic" width="500" height="auto" loading="lazy" class="w-full h-full rounded-full object-cover">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import AOS from 'aos'
  import 'aos/dist/aos.css'
  
  onMounted(() => {
    AOS.init()
  })
  </script>
  