<template>
    <!--Dashboard components-->
    <div>
        <NavBar />
        <DashboardOverview />
        <UserManagement />
        <NurseManagement />
        <AppointmentsSection />
        <SettingsSection />
    </div>
</template>

<script setup>
    import { defineAsyncComponent } from 'vue';

    const NavBar = defineAsyncComponent(() => import('@/components/DashboardComponents/NavBar.vue'));
    const DashboardOverview = defineAsyncComponent(() => import('@/components/DashboardComponents/DashboardOverview.vue'));
    const UserManagement = defineAsyncComponent(() => import('@/components/DashboardComponents/UserManagement.vue'));
    const NurseManagement = defineAsyncComponent(() => import('@/components/DashboardComponents/NurseManagement.vue'));
    const AppointmentsSection = defineAsyncComponent(() => import('@/components/DashboardComponents/AppointmentsSection.vue'));
    const SettingsSection = defineAsyncComponent(() => import('@/components/DashboardComponents/SettingsSection.vue'));
</script>

<style>
* {
  scrollbar-width: thin;
  scrollbar-color: #111827 #f1f1f1;
}
</style>