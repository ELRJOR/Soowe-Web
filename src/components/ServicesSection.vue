<template >
    <section class="text-white mt-20" id="services">
        <div class="px-4 xl:pl-16">
            <h2 class="text-4xl font-semibold text-black mb-4">Algunos de nuestros servicios disponibles</h2>
        </div>
        <div class="py-8 xl:px-16 px-4 sm:py-16 grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 md:gap-10 md:pt-12 lg:grid-cols-3">
            <div v-for="service in services" :key="service.id" data-aos="fade-up"
            class="px-8 py-12 rounded-xl bg-secondary bg-opacity-20 shadow-lg border border-[#1f1641] "
            >
                <div class="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28">
                    <div>
                        <img :src="service.icon" alt="service icon">
                    </div>
                </div>
                <div class="text-center">
                    <h3 class="pt-8 text-lg uppercase text-black font-semibold lg:text-xl">
                        {{ service.name }}
                    </h3>
                    <p class="text-primary font-bold pt-4 text-sm group-hover:text-white md:text-base">
                        {{ service.description }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import {ref} from 'vue';
import inyeccionImg from '@/assets/inyeccion.png';
import monitoreoImg from '@/assets/monitoreo.png';
import lesionesImg from '@/assets/esguince.png';
import signosvitalesImg from '@/assets/signosvitales.png';
import recetamedicaImg from '@/assets/recetamedica.png';
import silladeruedasImg from '@/assets/silladeruedas.png'
const services =ref([
    {
        
        id:1,
        icon:inyeccionImg,
        name:'Inyecciones',
        description:'Administración segura de inyecciones según indicación médica.'
    },
    {
        id:2,
        icon:monitoreoImg,
        name:'Monitoreo post operación',
        description:'Asistentes médicos acuden a tu domicilio para atención periódica.'
    },
    {
        id:3,
        icon:lesionesImg,
        name:'Curación de heridas',
        description:'Limpieza, desinfección y vendaje de heridas que requieren atención periódica.'
    },
    {
        id:4,
        icon:signosvitalesImg,
        name:'Toma de signos vitales',
        description:'Chequeo de presión arterial, frecuencia cardíaca, temperatura y saturación de oxígeno.',
    },
    {
        id:5,
        icon:recetamedicaImg,
        name:'Monitoreo de enfermededes crónicas',
        description:'Control y monitoreo de enfermedades como diabetes, hipertensión, EPOC.'
    },
    {
        id:6,
        icon:silladeruedasImg,
        name:'Rehabilitación y movilidad',
        description:'Ejercicios guiados para mejorar la movilidad y fortalecer músculos en pacientes con limitaciones físicas.'
    },
    ])
</script>

