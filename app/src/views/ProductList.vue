<template>
  <ProductCard v-for="product in products" :key="product.id" :product="product" />
</template>

<script>
import { axiosFakeStore } from '@/config/axios'
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
    this.fetchProducts()
  },
  methods: {
    fetchProducts(category_name = '') {
      let url = {
        path: '/products',
        slug: '',
        query: '?limit=10'
      }

      if (this.$route.params.category_name) {
        url.slug += '/category/' + this.$route.params.category_name
      }

      axiosFakeStore.get(url.path + url.slug + url.query).then((response) => {
        response.data.forEach((element) => {
          element.discount = Math.random() * (100 - 1) + 1
        })
        this.products = response.data
      })
    }
  }
}
</script>
