<template>
  <header
    class="fixed left-0 right-0 top-0 z-10 flex min-h-16 min-w-72 items-center bg-celadon-light sm:static"
  >
    <div class="container mx-auto flex h-full items-center justify-between gap-x-28 px-8">
      <BaseIcon class="sm:hidden" iconName="fa-bars" @click="toggleSideMenu" />
      <RouterLink class="hidden sm:block" :to="{ name: 'home' }">
        <LogoSvg />
      </RouterLink>
      <nav
        class="categories hidden sm:flex sm:flex-wrap sm:justify-center sm:text-sm sm:uppercase md:text-base"
      >
        <RouterLink
          class="p-2 transition-colors hover:bg-rose-quartz"
          activeClass="bg-rose-quartz"
          v-for="category in categories"
          :key="category"
          :to="{ name: 'product-list', params: { category_name: category } }"
        >
          {{ category }}
        </RouterLink>
      </nav>
      <nav class="relative flex items-center gap-x-6">
        <RouterLink v-if="!storeUser.isAuthenticated" :to="{ name: 'login' }">
          <BaseIcon icon="fa-user" />
        </RouterLink>
        <section v-else class="flex items-center gap-x-3">
          <RouterLink :to="{ name: 'orders' }">
            <span class="hover:underline">{{ storeUser.fullName }}</span>
          </RouterLink>
          <a @click="storeUser.logout()">
            <BaseIcon icon="fa-right-from-bracket" />
          </a>
        </section>
        <RouterLink :to="{ name: 'cart' }">
          <BaseIcon iconName="fa-cart-shopping" />
        </RouterLink>
        <span
          v-show="storeCart.productCount"
          class="cart-amount absolute -right-3 -top-3 box-border flex h-5 w-5 select-none items-center justify-center rounded-full bg-han-blue text-sm text-white"
          :class="{ pulse: playAnimation }"
          @animationend="playAnimation = false"
        >
          {{ storeCart.productCount }}
        </span>
      </nav>
    </div>
    <SideMenu :categories="categories" :isVisible="showSideMenu" @toggle="toggleSideMenu" />
  </header>
</template>

<script setup>
import { ref } from 'vue'

import { axiosFakeStore } from '@/config/axios'
import SideMenu from '@/components/SideMenu.vue'
import LogoSvg from '@/components/LogoSvg.vue'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'

const storeCart = useCartStore()
const storeUser = useUserStore()

let playAnimation = ref(false)
storeCart.$onAction((action) => {
  if (action.name == 'addProduct' || action.name == 'removeProduct') {
    playAnimation.value = true
  }
})

let categories = ref([])
function fetchCategories() {
  axiosFakeStore.get('/products/categories').then((response) => {
    categories.value = response.data
  })
}
fetchCategories()

let showSideMenu = ref(false)
function toggleSideMenu() {
  showSideMenu.value = !showSideMenu.value
}
</script>

<style scoped>
.pulse {
  animation: pulse;
  animation-duration: 2s;
  animation-iteration-count: 1;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1.01);
    font-weight: 400;
  }
  50% {
    transform: scale(1.3);
    font-weight: 400;
  }
}
</style>
