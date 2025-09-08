<template>
  <aside class="sm:hidden">
    <Transition name="fade">
      <div
        class="fixed bottom-0 left-0 right-0 top-0 bg-backdrop opacity-50"
        v-show="isVisible"
        @click="$emit('toggle')"
      ></div>
    </Transition>
    <Transition name="slide">
      <div
        class="side-menu absolute left-0 top-0 h-screen w-64 bg-celadon-light p-4"
        v-show="isVisible"
        @click="emitToggleCheckTarget"
      >
        <RouterLink class="inline-block" :to="{ name: 'home' }">
          <LogoSvg />
        </RouterLink>
        <nav class="mt-2 flex flex-col gap-y-2 text-center uppercase hover:cursor-pointer">
          <RouterLink
            class="transition-colors hover:bg-rose-quartz"
            activeClass="bg-rose-quartz"
            v-for="category in categories"
            :key="category"
            :to="{ name: 'product-list', params: { category_name: category } }"
          >
            {{ category }}
          </RouterLink>
        </nav>
      </div>
    </Transition>
  </aside>
</template>

<script>
import LogoSvg from './LogoSvg.vue'

export default {
  components: { LogoSvg },
  props: ['isVisible', 'categories'],
  methods: {
    emitToggleCheckTarget(event) {
      if (!event.target.classList.contains('side-menu')) {
        this.$emit('toggle')
      }
    }
  }
}
</script>

<style scoped>
.slide-enter-from,
.slide-leave-to {
  transform: translate(-100%);
}
.slide-enter-to,
.slide-leave-from {
  transform: translate(0);
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.fade-enter-from,
.fade-leave-to {
  background-color: transparent;
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease,
    background-color 0.5s ease;
}
</style>
