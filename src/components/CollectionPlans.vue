<template>
    <section class="text-white mt-18" id="pricing">
        <div class="absolute right-0 top-[110rem] h-full w-full justify-end">
            <span class="flex opacity-20">
                <span class="w-16 h-32 rounded-l-full flex bg-primary blur-2xl"></span>
                <span class="w-16 h-32 rounded-r-full flex bg-[#f88fc2] blur-2xl mt-14"></span>
            </span>
        </div>
        <div class="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 xl:px-16">
            <div class="mt-4 md:mt-0 text-left flex flex-col z-10 h-full w-[80%]">
                <h2 class="text-4xl font-bold text-white text-left mb-4">
                    Nuestros planes con <span class="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Soowe</span>
                </h2>
                <p class="text-lg text-gray-300 mt-4">
                    Ofrecemos diferentes modelos de pago para adaptarnos a las necesidades de cada organización.  
                </p>
                <ul class="mt-6 space-y-4">
                    <!-- Se ha modificado 'relative top-8' por 'relative -top-4' para subir la tarjeta -->
                    <li v-for="plan in Pricing" :key="plan.id" class="bg-[#111a3e] p-4 rounded-xl border border-[#1f1641] relative -top-4">
                        <h3 class="text-xl font-bold text-white">{{ plan.name }}</h3>
                        <p class="text-gray-300">{{ plan.description }}</p>
                        <h4 class="text-lg font-semibold text-primary mt-2">{{ plan.price }}</h4>
                    </li>
                </ul>
            </div>
            <div data-aos="flip-left">
                <h2 class="text-4xl font-bold text-white text-left mb-8 md:text-center md:mt-0 mt-8">
                    Beneficios de Nuestros Planes
                </h2>
                <ul class="space-y-6 py-8" data-aos="fade-left">
                    <li v-for="benefit in Benefits" :key="benefit.id"
                        class="flex items-center rounded-xl p-4 bg-[#111a3e] shadow-lg border border-[#1f1641]">
                        <div class="w-1/4">
                            <img :src="benefit.icon" :alt="benefit.name">
                        </div>
                        <div class="w-3/4 pl-4">
                            <h3 class="text-xl font-semibold text-white">{{ benefit.name }}</h3>
                            <p class="text-gray-300">{{ benefit.description }}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';

const Pricing = ref([
    {
        id: 1,
        name: "Suscripción Mensual",
        description: "Accede a todas las funciones con un pago fijo al mes.",
        price: "$399.0/mes",
    },
]);

const Benefits = ref([
    {
        id: 1,
        name: "Soporte 24/7",
        description: "Asistencia en cualquier momento para resolver tus dudas.",
        icon: "https://img.icons8.com/ios-filled/100/ffffff/customer-support.png",
    },
    {
        id: 2,
        name: "Acceso Ilimitado",
        description: "Todas las herramientas disponibles sin restricciones.",
        icon: "https://img.icons8.com/ios-filled/100/ffffff/infinity.png",
    },
    {
        id: 3,
        name: "Seguridad Garantizada",
        description: "Tus datos y transacciones protegidas con la mejor tecnología.",
        icon: "https://img.icons8.com/ios-filled/100/ffffff/privacy.png",
    },
]);
</script>
/