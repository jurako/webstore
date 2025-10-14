<template>
  <ProductCard v-for="product in products" :key="product.id" :product="product" />
</template>

<script>
import axios from '@/config/axios'
import ProductCard from '../components/ProductCard.vue'

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      products: [],
      category: {}
    }
  },
  created() {
    this.$watch(
      () => this.$route.params.category_name,
      (new_category_name) => this.fetchProducts(new_category_name)
    )
    this.fetchProducts(this.$route.params.category_name)
  },
  methods: {
    fetchProducts(category_name = '') {
      let url = 'products?limit=10';

      if(category_name) {
        url = `/categories/${category_name}/${url}`;
      }

      axios.get(url)
        .then((response) => {
          this.products = response.data
        });
    }
  }
}
</script>
