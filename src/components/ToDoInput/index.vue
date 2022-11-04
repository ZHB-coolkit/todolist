<script setup lang="ts">
import { ref } from 'vue'
import { addTodo } from '@/api/v1/todo'
import { todoListEmitter } from '@/utils/emitter'
import { TODO_LIST_EMITTER, TODO_LIST_REFRESH_REASON } from '@/ts/enum/EEmitter'

const inputValue = ref<string>('')

/**
 * 处理添加事件
 */
const handleAdd = async () => {
  if (inputValue.value) {
    await addTodo({
      content: inputValue.value
    })
    todoListEmitter.emit(TODO_LIST_EMITTER.REFRESH, TODO_LIST_REFRESH_REASON.ADD)
    inputValue.value = ''
  }
}
</script>

<template>
  <a-input-group compact size="large" class="input-group">
    <a-input
      v-model:value="inputValue"
      placeholder="请输入内容"
      style="width: calc(100% - 68px)"
      @pressEnter="handleAdd"
    />
    <a-button type="primary" class="add-btn" size="large" @click="handleAdd">添加</a-button>
  </a-input-group>
</template>

<style scoped lang="scss">
@import '../../styles/variables.scss';
.input-group {
  width: #{$containerWidth};
}
</style>
