<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/store'
import { ToDoItemState } from '@/constant'
const inputValue = ref<string>('')

const store = useStore()

/**
 * 处理添加事件
 */
const handleAdd = () => {
  if (inputValue.value) {
    store.todoList.unshift({
      id: Math.random(),
      content: inputValue.value,
      status: ToDoItemState.unfinished
    })
    inputValue.value = ''
  }
}

</script>

<template>
  <a-input-group compact size="large" class="input-group">
    <a-input v-model:value="inputValue" placeholder="请输入内容" style="width: calc(100% - 68px)" @pressEnter="handleAdd" />
    <a-button type="primary" class="add-btn" size="large" @click="handleAdd">添加</a-button>
  </a-input-group>
</template>

<style scoped lang='scss'>
@import '../../styles/variables.scss';
.input-group {
  width: #{$containerWidth};
}
</style>
