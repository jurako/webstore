<template>Hello from orders view!</template>

<script setup>
    import axios from '@/config/axios'
    import { onMounted, onUnmounted } from "vue";

    onMounted(() => console.log('Orders mounted'))
    onUnmounted(() => console.log('Orders unmounted'))

    const href = window.location.href;


    if(href.includes('orders')) {
        console.log('From orders view if');

        axios.get('/orders')
        .then(response => console.log('response', response))
        .catch(err => console.log('err', err));
    }
</script>