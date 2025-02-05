<template>
    <header class="flex justify-between items-center p-6 bg-opacity-50 relative z-20">
        <div class="flex items-center space-x-3">
            <img src="@/assets/Logo.png" alt="Logo" class="w-10 h-10">
            <span class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary" >Soowe</span>
        </div>
        <button type="button" class="block focus:outline-none md:hidden"
        @click="isMenuOpen = !isMenuOpen">
            <span v-if="isMenuOpen" class="text-5xl">
                <img src="https://img.icons8.com/ios-filled/100/ffffff/delete-sign.png" alt="close" width="50" height="50">
            </span>
            <span v-else class="text-5xl">
                <img src="https://img.icons8.com/ios-filled/100/ffffff/menu--v6.png" alt="menu" width="50" height="50">
            </span> 
        </button>
        <nav
        :class="['fixed inset-0 z-20 flex flex-col items-center justify-center bg-[#111827] md:relative md:bg-transparent md:flex md:justify-between md:flex-row', isMenuOpen ? 'block' : 'hidden']">
            <ul class="flex flex-col items-center space-y-5 md:flex-row md:space-x-5 md:space-y-0">
                <li v-for="item in Menu" :key="item.name">
                    <a :href="item.href" 
                    class="block text-white transition hover:text-primary ease-linear text-2xl md:text-lg"
                    @click="scrollToSection(item.href)">
                        {{ item.name }}
                    </a>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
import { ref } from 'vue';

const Menu = ref([
    { name: 'Registrarse', href: '#registrarse' },
    { name: 'Iniciar Sesión', href: '#iniciarsesion' },
]);

const isMenuOpen = ref(false);

const scrollToSection = (href) => {
    isMenuOpen.value = false;
    const section = document.querySelector(href.startsWith("#") ? href : `#${href}`);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
};
</script>
