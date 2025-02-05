<template >
    <section class="text-white mt-20" id="services">
        <div class="px-4 xl:pl-16">
            <h2 class="text-4xl font-bold text-white mb-4">Nuestros servicios</h2>
        </div>
        <div class="py-8 xl:px-16 px-4 sm:py-16 grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 md:gap-10 md:pt-12 lg:grid-cols-3">
            <div v-for="service in services" :key="service.id" data-aos="fade-up"
            class="px-8 py-12 rounded-xl bg-[#111a3e] shadow-lg border border-[#1f1641]"
            >
                <div class="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28">
                    <div>
                        <img :src="service.icon" alt="service icon">
                    </div>
                </div>
                <div class="text-center">
                    <h3 class="pt-8 text-lg font-semibold uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary lg:text-xl">
                        {{ service.name }}
                    </h3>
                    <p class="text-grey pt-4 text-sm group-hover:text-white md:text-base">
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
const services =ref([
    {
        
        id:1,
        icon:inyeccionImg,
        name:'Inyecciones',
        description:'¿No saber a quien recurrir para una simple inyección?'
    },
    {
        id:2,
        icon:monitoreoImg,
        name:'Monitoreo',
        description:'Asistentes médicos asisten a tu domicilio para chequeo médico'
    },
    {
        id:3,
        icon:lesionesImg,
        name:'Lesiones',
        description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, ut!'
    },
    {
        id:4,
        icon:'https://img.icons8.com/ios-filled/100/ffffff/email-open.png',
        name:'WEB DEVELOPMENT',
        description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, ut!'
    },
    {
        id:5,
        icon:'https://img.icons8.com/ios-filled/100/ffffff/windows10-personalization.png',
        name:'Graphic Design',
        description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, ut!'
    },
    {
        id:6,
        icon:'https://img.icons8.com/ios-filled/100/ffffff/web-design.png',
        name:'Web Design',
        description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, ut!'
    },
    ])
</script>

