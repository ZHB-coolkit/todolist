<script setup lang="ts">
import { toRefs, ref } from 'vue';

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  textDecorationColor: {
    type: String,
    default: '#000000'
  }
})

const { value, label, type } = toRefs(props)

const valueRef = ref('')
valueRef.value = value.value

const emit = defineEmits(['valueChange'])

const handleInput = () => {
  emit('valueChange', valueRef.value)
}

</script>

<template>
  <input v-model="valueRef" class="outline-none" placeholder=" " :type="type" @input="handleInput" />
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
  transition: .5s;
}
input {
  width: 100%;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid v-bind(textDecorationColor);
  background: transparent;
  margin-bottom: 6px;
  padding: 10px 0;
  &:focus + label,&:not(:placeholder-shown) + label {
    transform: translateY(-26px);
    color: #000;
    font-size: 14px;
  }
}
</style>