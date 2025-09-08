<template>
  <HeaderView />
  <button
    style="border: 1px solid black"
    @click="testApi"
  >Test button</button>
  <main class="mt-16 flex flex-wrap items-center justify-center gap-8 p-5 sm:mt-0">
    <RouterView />
  </main>
</template>

<script>
import { axiosBackend } from './config/axios';
import HeaderView from './views/HeaderView.vue'

export default {
  data() {
    return {
      apiData: []
    }
  },
  methods: {
    testApi() {
      axiosBackend.get('/')
        .then(data => console.log(data))
    }
  },
  components: {
    HeaderView
  },
  provide: {
    AppCurrency: '€'
  }
}
</script>
