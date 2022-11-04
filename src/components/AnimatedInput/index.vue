<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text',
    validator(value: string) {
      return ['text', 'password'].includes(value)
    }
  },
  textDecorationColor: {
    type: String,
    default: '#000000'
  }
})

const { modelValue, label, type } = toRefs(props)

defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :model-value="modelValue"
    class="outline-none"
    placeholder=" "
    :type="type"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
  <label class="font-bold">{{ label }}</label>
</template>

<style lang="scss" scoped>
label {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 16px;
  padding: 10px 0;
  pointer-events: none;
  transition: 0.5s;
}
input {
  width: 100%;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid v-bind(textDecorationColor);
  background: transparent;
  margin-bottom: 6px;
  padding: 10px 0;
  &:focus + label,
  &:not(:placeholder-shown) + label {
    transform: translateY(-26px);
    color: #000;
    font-size: 14px;
  }
}
</style>
