<template>
  <div class="flex items-center justify-center gap-x-3">
    <BaseIcon
      class="text-xl font-semibold text-han-blue hover:cursor-pointer"
      iconName="fa-plus"
      @click="addQuantity"
    />
    <input
      class="w-16 rounded-md border-gray-200"
      type="text"
      :value="modelValue"
      @input="
        $emit('update:modelValue', $event.target.value === '' ? '' : Number($event.target.value))
      "
      @keydown="validateInput"
      @blur="setDefaultIfEmpty"
    />
    <BaseIcon
      class="text-xl font-semibold text-han-blue hover:cursor-pointer"
      iconName="fa-minus"
      @click="subQuantity"
    />
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps(['modelValue'])

function validateInput(event) {
  let isKeyboardShortcut = event.ctrlKey && ['a', 'z', 'x', 'c', 'v'].includes(event.key)
  let isNumber = /^\d+$/.test(event.key)
  if (event.key.length == 1 && !isNumber && !isKeyboardShortcut) {
    event.preventDefault()
  }
}

function setDefaultIfEmpty(event) {
  //if we blur and the input is empty then set the default value of 1
  if (!event.target.value) {
    emit('update:modelValue', 1)
  }
}

function addQuantity() {
  emit('update:modelValue', props.modelValue + 1)
}

function subQuantity() {
  if (props.modelValue > 1) {
    emit('update:modelValue', props.modelValue - 1)
  }
}
</script>
