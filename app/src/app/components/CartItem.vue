<template>
  <div
    class="flex-column cart-item mb-5 border-t-2 border-t-gray-200 pt-3 sm:flex sm:items-center sm:gap-x-8"
  >
    <img
      class="h-96 w-full object-contain object-center sm:h-28 sm:w-16"
      :src="storeCart.products[index].image"
      :alt="storeCart.products[index].title"
    />
    <div class="sm:w-1/4">
      <p class="my-4 text-sm capitalize text-gray-500">{{ storeCart.products[index].category }}</p>
      <h1 class="mb-4 text-sm">{{ storeCart.products[index].title }}</h1>
    </div>
    <AmountField class="mb-4 sm:mb-0" v-model="storeCart.products[index].quantity" />
    <div class="flex items-center justify-between sm:flex-grow">
      <span>{{ AppCurrency + ' ' + storeCart.products[index].price.toFixed(2) }}</span>
      <BaseIcon icon="fa-xmark" @click="storeCart.removeProduct(index)" />
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { useCartStore } from '@/stores/cart'

import AmountField from '@/components/AmountField.vue'

const AppCurrency = inject('AppCurrency')
const storeCart = useCartStore()
defineProps(['index'])
</script>
