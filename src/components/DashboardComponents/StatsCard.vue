<template>
    <div class="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between transition-all hover:shadow-2xl">
      <div>
        <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
        <p class="text-xl font-bold text-primary">{{ value }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
    defineProps({
      title: String,
      value: [String, Number],
    });
  </script>
  