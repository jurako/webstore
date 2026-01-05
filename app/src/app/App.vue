<template>
  <HeaderView />
  <main class="mt-16 flex flex-wrap items-center justify-center gap-8 p-5 sm:mt-0">
    <RouterView />
  </main>
</template>

<script>
import HeaderView from './views/HeaderView.vue'

export default {
  components: {
    HeaderView
  },
  provide: {
    AppCurrency: '€'
  }
}
</script>
