<template>
    <footer class="mt-8 border-t border-[#33353F] text-white bg-[#111827]">
        <div class="container mx-auto px-6 py-12">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <!-- Logo -->
                <div class="flex items-center space-x-4">
                    <img src="@/assets/Logo.png" alt="Logo" class="w-16 h-16">
                    <h2 class="text-2xl font-bold">Soowe</h2>
                </div>

                <!-- Enlaces rápidos -->
                <nav class="mt-6 md:mt-0">
                    <ul class="flex space-x-6 text-sm">
                        <li><a href="#home" class="hover:text-gray-400">Inicio</a></li>
                        <li><a href="#services" class="hover:text-gray-400">Servicios</a></li>
                        <li><a href="#about" class="hover:text-gray-400">Nosotros</a></li>
                        <li><a href="#contact" class="hover:text-gray-400">Contacto</a></li>
                    </ul>
                </nav>

                <!-- Redes Sociales -->
                <div class="flex space-x-4 mt-6 md:mt-0">
                    <a href="#" class="hover:text-gray-400"><i class="fab fa-facebook text-xl"></i></a>
                    <a href="#" class="hover:text-gray-400"><i class="fab fa-twitter text-xl"></i></a>
                    <a href="#" class="hover:text-gray-400"><i class="fab fa-instagram text-xl"></i></a>
                    <a href="#" class="hover:text-gray-400"><i class="fab fa-linkedin text-xl"></i></a>
                </div>
            </div>

            <!-- Línea divisoria -->
            <div class="border-t border-gray-700 my-6"></div>

            <!-- Derechos reservados -->
            <p class="text-center text-sm text-gray-500">
                © {{ new Date().getFullYear() }} Soowe®. Todos los derechos reservados.
            </p>
        </div>
    </footer>
</template>

<script setup>
</script>
