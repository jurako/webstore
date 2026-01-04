<template>
  <input
    :type="inputType"
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
  />
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: [String, Number],
  placeholder: String,
  inputType: {
    type: String,
    default: 'text'
  }
})
</script>
