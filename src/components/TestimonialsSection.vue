<template>
    <section class="text-white mt-20" id="testimonials" data-aos="zoom-in">
        <h2 class="text-4xl font-bold text-white text-left mb-4 px-4 xl:pl-16">Testimonios</h2>
        <div class="px-4 xl:px-16">
            <Carousel v-bind="settings" :breakpoints="breakpoints">
                <Slide v-for="element in testimonials" :key="element.id">
                    <div class="carousel__item p-4">
                        <div class="testimonial-card w-full mx-auto bg-[white] shadow-lg border border-[black] p-5 text-primary font-semibold">
                            <div class="w-full flex mb-4 items-center">
                                <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                                    <img :src="element.image" alt="testimonial image" loading="lazy" class="testimonial-image">
                                </div>
                                <h6 class="ml-4 font-bold text-sm uppercase text-black">{{ element.fullName }}</h6>
                            </div>
                            <div class="w-full flex-grow">
                                <p class="text-sm leading-tight">
                                    <span class="text-lg leading-none italic font-bold text-black mr-1">"</span>
                                    {{ element.comment }}
                                    <span class="text-lg leading-none italic font-bold text-black mr-1">"</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </Slide>
                <template #addons>
                    <Navigation />
                </template>
            </Carousel>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

// Carousel settings
const settings = ref({
    itemsToShow: 1,
    snapAlign: "center",
});

// Breakpoints para diferentes tamaños de pantalla
const breakpoints = ref({
    700: {
        itemsToShow: 2,
        snapAlign: 'center',
    },
    1024: {
        itemsToShow: 3,
        snapAlign: 'start'
    }
});

// Datos de testimonios
const testimonials = ref([
    {
        id: 1,
        fullName: 'Ana Rodríguez – Cliente satisfecho',
        image: 'src/assets/Persona3.jpg',
        comment: 'Soowe ha sido una bendición para mi familia. Necesitábamos asistencia médica para mi madre y en pocos minutos pudimos encontrar un enfermero calificado y confiable. La plataforma es fácil de usar y la atención ha sido excelente. ¡100% recomendado!, descarguenlo'
    },
    {
        id: 2,
        fullName: 'Juan Pérez – Usuario recurrente',
        image: 'src/assets/Persona2.jpg',
        comment: 'Nunca imaginé que encontrar atención médica en casa sería tan fácil. La aplicación me permitió solicitar un asistente médico en cuestión de minutos. Me encanta la seguridad y profesionalismo del servicio. Soowe realmente facilita la vida.'
    },
    {
        id: 3,
        fullName: 'Mariana López – Atención rápida y eficaz',
        image: 'src/assets/Persona4.webp',
        comment: 'Tuve una emergencia con mi hijo y necesitaba asistencia urgente. Gracias a Soowe, en menos de 30 minutos ya teníamos un profesional en casa. La rapidez y la calidad del servicio son inmejorables. ¡Gracias por ayudarnos en momentos clave!'
    },
    {
        id: 4,
        fullName: 'Ricardo Méndez – Atención de calidad',
        image: 'src/assets/Persona1.jpg',
        comment: 'Soowe me ha dado tranquilidad al saber que puedo solicitar asistencia médica confiable para mis padres mayores. Todos los enfermeros han sido amables, puntuales y altamente capacitados. Es una gran solución para quienes buscamos atención personalizada en casa.'
    },
    {
        id: 5,
        fullName: 'Laura Fernández – Confianza y profesionalismo',
        image: 'src/assets/Persona5.jpg',
        comment: 'Desde que descubrí Soowe, mi experiencia buscando asistencia médica ha cambiado por completo. El proceso es rápido, seguro y con profesionales altamente capacitados. Me da mucha tranquilidad saber que siempre contaré con un servicio confiable cuando lo necesite.'
    },
]);
</script>

<style>
/* Estilos de las flechas de navegación */
.carousel__prev,
.carousel__next {
    color: black !important;
}

/* Asegurar que las tarjetas tengan el mismo tamaño */
.carousel__item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

/* Asegurar que todas las tarjetas sean del mismo tamaño */
.testimonial-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    min-height: 250px;
}

/* Ajusta el tamaño de la imagen dentro del círculo */
.testimonial-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
