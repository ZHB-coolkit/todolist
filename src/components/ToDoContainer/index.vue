<script setup lang="ts">
import ToDoInput from '../ToDoInput/index.vue'
import ToDoList from '../ToDoList/index.vue'
import ToDoSearch from '../ToDoSearch/index.vue'
import { EToDoStatus } from '@/ts/enum/ETodo'
import { ToTopOutlined } from '@ant-design/icons-vue'

</script>

<template>
  <div class="w-full flex justify-center app-container">

    <!-- 回到顶部 -->
    <a-back-top>
      <div class="fixed flex justify-center items-center back-top-icon">
        <to-top-outlined />
      </div>
    </a-back-top>

    <!-- todo list 容器 -->
    <div class="todo-list-container">
      <header class="text-center">
        <h1 class="text-3xl">Todo List</h1>
      </header>
      <to-do-input></to-do-input>
      <to-do-list class="todo-list"></to-do-list>
      <a-divider>已完成</a-divider>
      <to-do-list class="todo-list" :status="EToDoStatus.DONE"></to-do-list>
    </div>

    <!-- 悬浮搜索按钮 -->
    <to-do-search></to-do-search>

  </div>
</template>

<style scoped lang="scss">
@import '../../styles/variables.scss';

.app-container {
  .todo-list-container {
    padding-bottom: 100px;
    header {
      margin-top: 100px;
    }
    .todo-list {
      margin-top: 16px;
    }
  }
  
  .back-top-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #{$floatIconBgColor};
  }
}
</style>
