<template>
  <HeaderView />
  <main class="mt-16 flex flex-wrap items-center justify-center gap-8 p-5 sm:mt-0">
    <RouterView />
  </main>
</template>

<script setup>
import { provide } from 'vue';
import HeaderView from './views/HeaderView.vue'

provide('AppCurrency', '€');
</script>
