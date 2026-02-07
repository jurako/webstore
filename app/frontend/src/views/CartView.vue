<template>
  <div class="cart flex gap-x-20 w-96 rounded-xl border bg-white p-8 shadow sm:w-full sm:max-w-7xl">
    <section class="cart-items">
      <div class="mb-4 flex flex-wrap items-center justify-between gap-y-4">
        <h1 class="text-3xl font-bold text-neutral-600">Shopping cart</h1>
        <span class="font-semibold text-gray-500">{{ storeCart.productCount }} items</span>
        <div class="w-full">
          Sort by:
          <select class="border-0">
            <option value="price">price</option>
            <option value="amount">amount</option>
          </select>
        </div>
      </div>

      <CartItem v-for="(product, index) in storeCart.products" :key="product.id" :index="index" />

      <hr class="border-t-2 border-gray-200" />

      <RouterLink class="mt-4 inline-block hover:underline" :to="{ name: 'home' }"
        ><BaseIcon class="mr-1 inline-block" icon="fa-arrow-left" size="sm" /> Back to
        shop</RouterLink
      >
    </section>
    <section class="summary">
      <h2 class="pt-1 pb-16 text-2xl font-bold text-neutral-600 border-b-2 border-b-gray-200 ">Summary</h2>
      <div class="flex space-between mt-6 text-nowrap gap-x-6 lg:gap-x-12">
        <span class="uppercase text-xl font-semibold">Items {{ storeCart.productCount }}</span>
        <span class="uppercase text-xl font-semibold">{{ AppCurrency + ' ' + storeCart.total }}</span>
      </div>
    </section>
  </div>
</template>

<script setup>
import CartItem from '@/components/CartItem.vue'
import { inject } from 'vue'

import { useCartStore } from '@/stores/cart'
const storeCart = useCartStore()

const AppCurrency = inject('AppCurrency')
</script>
