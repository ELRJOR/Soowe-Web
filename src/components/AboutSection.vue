<template>
    <section class="text-white mt-18 flex justify-center items-center flex-col" id="about">
        <div class="absolute z-0 top-[93rem] inset-x-0 h-64 flex items-start">
            <div class="h-24 w-64 bg-gradient-to-br from-primary via-secondary blur-2xl to-[#570cac] opacity-20"></div>
        </div>

        <div data-aos="flip-left" class="flex flex-col lg:flex-row items-center text-center py-4 px-4 xl:gap-8 sm:py-8 xl:px-16 z-10">
            <!-- Imagen a la izquierda en pantallas grandes -->
            <img src="@/assets/NocturnaImg.jpg" alt="Asistencia Médica" class="lg:max-w-[45%] sm:max-w-[80%] max-w-full h-auto rounded-lg shadow-lg object-cover">

            <!-- Texto a la derecha en pantallas grandes -->
            <div class="lg:ml-8 flex flex-col items-center lg:items-start text-center lg:text-left">
                <h2 class="text-4xl font-bold text-black mb-2">
                    Asistencia Médica desde tu bolsillo
                    <span class="text-black">24/7</span>
                </h2>
                <p class="text-base lg:text-lg mt-4 mb-4 max-w-2xl text-primary font-semibold">
                    ¿Una consulta médica a media noche? ¿Dudas sobre un síntoma inesperado? Con Soowe, conecta con asistentes médicos en cualquier momento, desde cualquier lugar.
                </p>

                <!-- Cuadros debajo del párrafo, ajustados a la pantalla y centrados -->
                <div class="flex justify-center w-full mt-8">
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 max-w-screen-lg justify-items-center">
                        <div class="text-center rounded-xl bg-[white] shadow-lg border border-[#1f1641] p-3 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full w-full">
                            <h3 class="text-white font-bold text-xl sm:text-2xl lg:text-3xl">⌚</h3>
                            <p class="text-sm sm:text-base text-black font-bold">Atención inmediata</p>
                        </div>
                        <div class="text-center rounded-xl  shadow-lg border border-[#1f1641] p-3 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full w-full">
                            <h3 class="text-white font-bold text-xl sm:text-2xl lg:text-3xl">🤳</h3>
                            <p class="text-sm sm:text-base text-black font-bold">Fácil y accesible</p>
                        </div>
                        <div class="text-center rounded-xl shadow-lg border border-[#1f1641] p-3 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full w-full">
                            <h3 class="text-white font-bold text-xl sm:text-2xl lg:text-3xl">🔒</h3>
                            <p class="text-sm sm:text-base text-black font-bold">Seguridad y confianza</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
