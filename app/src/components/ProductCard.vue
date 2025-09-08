<template>
  <article class="w-72 rounded-xl bg-white shadow duration-300">
    <img
      class="mx-auto mt-4 h-80 w-4/5 rounded-t-xl object-contain object-center"
      :src="imageSrc"
      alt="Product image"
    />
    <div class="space-y-4 p-4 pt-6">
      <h1 class="truncate text-lg font-bold leading-6">{{ product.title }}</h1>
      <p class="truncate text-base">{{ product.description }}</p>
      <div class="flex items-center">
        <p class="text-lg font-medium" v-if="!product.discount">{{ currency + price }}</p>
        <template v-else>
          <p class="mr-2 text-lg font-medium">{{ currency + priceWithDiscount }}</p>
          <p class="mr-auto text-base text-gray-500 line-through">{{ currency + price }}</p>
          <p class="text-base font-semibold text-green-500">{{ discountLabel }}</p>
        </template>
      </div>
      <div class="relative">
        <div class="flex items-center justify-between">
          <AmountField v-model="quantity" class="ml-auto mr-7" />
          <BaseButton @click="handleAddToCart(product, quantity)">
            Add
            <BaseIcon
              class="ml-1 inline-block text-white transition-none"
              icon="fa-cart-shopping"
              color="white"
              :scale="false"
            />
          </BaseButton>
        </div>
        <Transition name="fade-out">
          <p
            v-show="isAddedToCart"
            class="absolute bottom-0 left-0 right-0 flex items-center justify-center rounded-md bg-green-500 p-3 font-bold text-white"
          >
            Product added to cart
          </p>
        </Transition>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, inject, computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import AmountField from '@/components/AmountField.vue'
import BaseButton from '@/components/BaseButton.vue'

const quantity = ref(parseInt(Math.random() * (15 - 1) + 1))
const props = defineProps(['product'])
const currency = inject(['AppCurrency'])
const storeCart = useCartStore()

function handleAddToCart(product, quantity) {
  const index = getProductIndexInCart(product)

  if (index >= 0) {
    storeCart.updateProduct(index, quantity)
  } else {
    //prepare product for adding to cart
    const preparedProduct = storeCart.prepare(product, quantity)

    storeCart.add(preparedProduct)
  }

  showProductAddedMsg()
}

function getProductIndexInCart(product) {
  return storeCart.products.findIndex((productInCart) => productInCart.id == product.id)
}

let isAddedToCart = ref(false)
function showProductAddedMsg() {
  isAddedToCart.value = true
  setTimeout(() => {
    isAddedToCart.value = false
  }, 3000)
}

const imageSrc = computed(() => props.product.image)
const price = computed(() => props.product.price.toFixed(2))
const priceWithDiscount = computed(() =>
  (props.product.price - (props.product.price * props.product.discount) / 100).toFixed(2)
)
const discountLabel = computed(() => props.product.discount.toFixed(2) + '% off')
</script>

<style scoped>
.fade-out-leave-from {
  opacity: 1;
}
.fade-out-leave-to {
  opacity: 0;
}
.fade-out-leave-active {
  transition: opacity 0.5s ease;
}
</style>
