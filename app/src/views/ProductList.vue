<template>
  <ProductCard v-for="product in products" :key="product.id" :product="product" />
</template>

<script setup>
import axios from '@/config/axios'
import ProductCard from '../components/ProductCard.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute();
const products = ref([]);

watch(
  () => route.params.category_name,
  (new_category_name) => fetchProducts(new_category_name)
);

fetchProducts(route.params.category_name);

function fetchProducts(category_name = '') {
  let url = 'products?limit=10';

  if(category_name) {
    url = `/categories/${category_name}/${url}`;
  }

  axios.get(url)
    .then((response) => {
      products.value = response.data
    });
}

</script>