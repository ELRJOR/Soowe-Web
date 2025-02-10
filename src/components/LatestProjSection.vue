<template>
    <section class="text-white mt-20" id="projects">
        <div class="px-4 xl:pl-16">
            <div class="mb-4 md:flex md:justify-between xl:pr-16">
                <h2 class="text-4xl font-bold text-white">Organizaciones</h2>
                <div class="flex space-x-4 mb-4 mt-5 md:mt-0">
                    <button 
                        class="hover:text-primary px-4 py-2 border border-gray-600 rounded-md transition-all duration-300"
                        v-for="category in ['all', 'Salud']" 
                        :key="category" 
                        @click="selectedCategory = category"
                        :class="{ 'bg-primary text-black': selectedCategory === category }">
                        {{ category }}
                    </button>
                </div>
            </div>

            <!-- Grid de Proyectos -->
            <ul class="px-4 sm:py-16 xl:pr-16 grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 md:gap-10 md:pt-12 lg:grid-cols-3"
                data-aos="fade-right">
                <div v-for="project in filteredProjects" :key="project.id" class="flex flex-col h-full">
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
                    <div class="text-white rounded-b-xl bg-[#111a3e] shadow-lg border border-[#1f1641] p-6 flex flex-col flex-grow">
                        <h3 class="text-lg font-semibold uppercase lg:text-xl">{{ project.title }}</h3>
                        <p class="text-[#ADB7BE] flex-grow">{{ project.description }}</p>
                        <div class="flex flex-wrap p-2.5">
                            <div v-for="technology in project.technologies" :key="technology"
                                class="text-center ml-1 mt-1 rounded-3xl bg-[#111827] px-3 py-1 text-sm">
                                {{ technology }}
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </div>

        <!-- Sección de Organizaciones -->
        <div class="mt-20 px-4 xl:pl-16">
            <h2 class="text-4xl font-bold text-white">Empresas que trabajan con nosotros</h2>
            <ul class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <li v-for="organization in Organizations" :key="organization.id" 
                    class="bg-[#1c1c3a] p-6 rounded-lg shadow-lg text-center h-full flex flex-col items-center">
                    <img :src="organization.logo" :alt="organization.name" class="w-24 h-24 mx-auto mb-4 object-contain">
                    <h3 class="text-xl font-semibold">{{ organization.name }}</h3>
                    <p class="text-[#ADB7BE] flex-grow">{{ organization.description }}</p>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const Projects = ref([
    {
        id: 1,
        category: 'Salud',
        image: 'src/assets/hospital1.jpg',
        title: 'Hospital Regional de Alta Especialidad de la Península de Yucatán',
        description: 'Brinda atención médica especializada con asistentes médicos y tecnología de vanguardia.',
        technologies: ['Cardiología', 'Neurología', 'Medicina Interna'],
        webURL: 'https://www.hraepy.gob.mx'
    },
    {
        id: 2,
        category: 'Salud',
        image: 'src/assets/clinica1.jpg',
        title: 'Clínica de Mérida',
        description: 'Atención médica integral con un equipo de especialistas y asistentes médicos certificados.',
        technologies: ['Urgencias', 'Pediatría', 'Cirugía'],
        webURL: 'https://www.clinicademerida.com.mx'
    },
    {
        id: 3,
        category: 'Salud',
        image: 'src/assets/hospital2.jpg',
        title: 'Star Médica Mérida',
        description: 'Hospital privado con asistencia médica en diversas especialidades y atención personalizada.',
        technologies: ['Ginecología', 'Oncología', 'Ortopedia'],
        webURL: 'https://www.starmedica.com/merida'
    },
    {
        id: 4,
        category: 'Salud',
        image: 'src/assets/clinica2.jpg',
        title: 'Centro Médico Pensiones',
        description: 'Clínica con amplia gama de servicios médicos y asistentes disponibles 24/7.',
        technologies: ['Medicina General', 'Oftalmología', 'Traumatología'],
        webURL: 'https://www.cmpmerida.com.mx'
    },
]);

const Organizations = ref([
    {
        id: 1,
        logo: 'src/assets/org1.png',
        name: 'IMSS Yucatán',
        description: 'Provee servicios de salud y asistencia médica con profesionales capacitados.'
    },
    {
        id: 2,
        logo: 'src/assets/org2.png',
        name: 'Hospital O\'Horán',
        description: 'Atención médica de calidad con especialistas y asistentes médicos.'
    },
    {
        id: 3,
        logo: 'src/assets/org3.png',
        name: 'Red Médica del Sureste',
        description: 'Grupo de hospitales y clínicas con asistencia médica integral.'
    }
]);

const selectedCategory = ref('all');
const filteredProjects = computed(() => {
    return selectedCategory.value === 'all' ? Projects.value : 
        Projects.value.filter(project => project.category.toLowerCase() === selectedCategory.value.toLowerCase());
});
</script>
