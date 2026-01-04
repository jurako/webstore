<template>
  <FontAwesomeIcon
    class="block transition-transform hover:cursor-pointer"
    :class="{ 'hover:scale-110': scale }"
    :style="{ color }"
    :icon="'fa-solid ' + iconName"
    :size="size"
  />
</template>

<script setup>
defineProps({
  iconName: String,
  size: {
    type: String,
    default: 'lg'
  },
  color: {
    type: String,
    default: '#627264'
  },
  scale: {
    type: Boolean,
    default: true
  }
})
</script>
