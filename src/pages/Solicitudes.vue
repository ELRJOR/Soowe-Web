<template>
    <div>
        <NavBar />
    </div>
</template>

<script setup>
    import { defineAsyncComponent, ref } from 'vue';

    const NavBar = defineAsyncComponent(() => import('@/components/DashboardComponents/NavBar.vue'));
</script>