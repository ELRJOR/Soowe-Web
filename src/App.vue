<template>
  <div class="bg-[#FFFFFF] min-h-screen">
    <!-- Wrap components in Suspense to handle loading -->
     <Suspense>
      <template #default>
        <!-- Wrap all Components inside a single root element -->
         <div>
            <NavBar />
            <HeroSection />
            <ServicesSection />
            <Playstoresection />
            <AboutSection />
            <CollectionPlans />
            <Organization />
            <ContactSection />
            <TestimonialsSection />
            <Footer />
            <BackToTop />
      </div>
    </template>
    <template #fallback>
      <div class="flex justify-center items-center min-h-screen">
          <loadingSpinner />
      </div>
    </template>
  </Suspense>
  </div>
</template>

<script setup>
 import { defineAsyncComponent } from 'vue';
//Import Components Asynchronously
const NavBar = defineAsyncComponent(()=>import('@/components/NavBar.vue'));
const HeroSection = defineAsyncComponent(()=>import('@/components/HeroSection.vue'));
const ServicesSection = defineAsyncComponent(()=>import('@/components/ServicesSection.vue'));
const AboutSection = defineAsyncComponent(()=>import('@/components/AboutSection.vue'));
const TestimonialsSection = defineAsyncComponent(()=>import('@/components/TestimonialsSection.vue'));
const Organization = defineAsyncComponent(()=>import('@/components/Organization.vue'));
const CollectionPlans = defineAsyncComponent(()=>import('@/components/CollectionPlans.vue'));
const ContactSection = defineAsyncComponent(()=>import('@/components/ContactSection.vue'));
const Playstoresection = defineAsyncComponent(()=>import('@/components/Playstoresection.vue'));
const Footer = defineAsyncComponent(()=>import('@/components/Footer.vue'));
const BackToTop = defineAsyncComponent(()=>import('@/components/BackToTop.vue'));
</script>
<style>

*{
  scrollbar-width: thin;
  scrollbar-color: #111827 #f1f1f1;
}
</style>

