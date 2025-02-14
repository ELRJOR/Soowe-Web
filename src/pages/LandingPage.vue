<!-- LandingPage.vue -->
<template>
    <div>
      <!-- Componentes que componen la Landing Page -->
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
  
  <script setup>
  import { defineAsyncComponent } from 'vue';
  
  // Importación asíncrona de los componentes
  const NavBar = defineAsyncComponent(() => import('@/components/LandingPageComponents/NavBar.vue'));
  const HeroSection = defineAsyncComponent(() => import('@/components/LandingPageComponents/HeroSection.vue'));
  const ServicesSection = defineAsyncComponent(() => import('@/components/LandingPageComponents/ServicesSection.vue'));
  const Playstoresection = defineAsyncComponent(() => import('@/components/LandingPageComponents/Playstoresection.vue'));
  const AboutSection = defineAsyncComponent(() => import('@/components/LandingPageComponents/AboutSection.vue'));
  const CollectionPlans = defineAsyncComponent(() => import('@/components/LandingPageComponents/CollectionPlans.vue'));
  const Organization = defineAsyncComponent(() => import('@/components/LandingPageComponents/Organization.vue'));
  const ContactSection = defineAsyncComponent(() => import('@/components/LandingPageComponents/ContactSection.vue'));
  const TestimonialsSection = defineAsyncComponent(() => import('@/components/LandingPageComponents/TestimonialsSection.vue'));
  const Footer = defineAsyncComponent(() => import('@/components/LandingPageComponents/Footer.vue'));
  const BackToTop = defineAsyncComponent(() => import('@/components/LandingPageComponents/BackToTop.vue'));
  </script>
  
  <style>
  * {
    scrollbar-width: thin;
    scrollbar-color: #111827 #f1f1f1;
  }
  </style>
  