<template>
    Hello from admin!
</template>

<script setup>

import axios from '@/config/axios'

axios.get('categories')
  .then(response => {
    console.log(response.data);
  })

</script>