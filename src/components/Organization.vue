<template>
    <section class="text-white mt-20" id="projects">
        <div class="px-4 xl:pl-16">
            <div class="mb-4 md:flex md:justify-between xl:pr-16">
                <h2 class="text-4xl font-bold text-black">Organizaciones</h2>
            </div>

            <!-- Grid de Proyectos -->
            <ul class="px-4 sm:py-16 xl:pr-16 grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 md:gap-10 md:pt-12 lg:grid-cols-3"
                data-aos="fade-right">
                <div v-for="project in Projects" :key="project.id" class="flex flex-col h-full">
                    <div class="h-52 md:h-64 rounded-t-xl relative group bg-cover bg-center"
                        :style="{ backgroundImage: 'url(' + project.image + ')' }">
                        <div class="overlay flex items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500">
                            <a class="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
                                :href="project.webURL" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" aria-hidden="true" class="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5">
                                    </path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div class="text-black font-semibold rounded-b-xl bg-[white] shadow-lg border border-[#1f1641] p-6 flex flex-col flex-grow">
                        <h3 class="text-lg font-semibold uppercase lg:text-xl">{{ project.title }}</h3>
                        <p class="text-primary font-semibold flex-grow">{{ project.description }}</p>
                        <div class="flex flex-wrap p-2.5">
                            <div v-for="technology in project.technologies" :key="technology"
                                class="text-center ml-1 mt-1 rounded-3xl bg-white px-3 py-1 text-sm border border-black">
                                {{ technology }}
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';

const Projects = ref([
    {
        id: 1,
        category: 'Salud',
        image: 'src/assets/AltaEspecialidadMerida.jpg',
        title: 'Hospital Regional de Alta Especialidad de la Península de Yucatán',
        description: 'Brinda atención médica especializada con asistentes médicos y tecnología de vanguardia.',
        technologies: ['Cardiología', 'Neurología', 'Medicina Interna'],
        webURL: 'https://www.gob.mx/salud/hraepy/'
    },
    {
        id: 2,
        category: 'Salud',
        image: 'src/assets/ClinicaMerida.jpeg',
        title: 'Clínica de Mérida',
        description: 'Atención médica integral con un equipo de especialistas y asistentes médicos certificados.',
        technologies: ['Urgencias', 'Pediatría', 'Cirugía'],
        webURL: 'https://www.clinicademerida.com.mx'
    },
    {
        id: 3,
        category: 'Salud',
        image: 'src/assets/Starmedica.webp',
        title: 'Star Médica Mérida',
        description: 'Hospital privado con asistencia médica en diversas especialidades y atención personalizada.',
        technologies: ['Ginecología', 'Oncología', 'Ortopedia'],
        webURL: 'https://www.starmedica.com/s/'
    },
    {
        id: 4,
        category: 'Salud',
        image: 'src/assets/pensiones.jpg',
        title: 'Centro Médico Pensiones',
        description: 'Clínica con amplia gama de servicios médicos y asistentes disponibles 24/7.',
        technologies: ['Medicina General', 'Oftalmología', 'Traumatología'],
        webURL: 'https://centromedicopensiones.net/'
    },
]);
</script>
