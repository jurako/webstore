<template>
  <label>
    <input
      type="radio"
      class="-mt-px"
      :label="label"
      :name="name"
      :value="value"
      :checked="value == modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    />
    {{ label }}
  </label>
</template>

<script setup>
defineProps({
  name: String,
  value: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  }
})
</script>
