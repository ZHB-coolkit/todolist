<script setup lang="ts">
import { DeleteOutlined } from '@ant-design/icons-vue'
import { storeToRefs } from 'pinia'
import { useStore } from '../../store'
import { computed } from 'vue'
import { ToDoItemState } from '../../constant'

const store = useStore()

const { todoList } = storeToRefs(store)

const props = defineProps({
  status: {
    type: Number,
    default: ToDoItemState.unfinished
  },
  searchValue: {
    type: String
  }
})

const dataSource = computed(() => {
  const { status, searchValue } = props
  if (searchValue) {
    return todoList.value.filter(item => item.status === status && item.content.indexOf(searchValue) > -1)
  } else {
    return todoList.value.filter(item => item.status === status)
  }
})

/**
 * 处理完成状态变更
 * @param event 
 * @param id 
 */
const handleChecked = (event: Event, id: number) => {
  const todoListTemp = todoList.value
  todoListTemp.forEach((item, index) => {
    if (item.id === id) {
      const status = item.status
      switch (status) {
        case ToDoItemState.done:
          item.status = ToDoItemState.unfinished
          break
        case ToDoItemState.unfinished:
          item.status = ToDoItemState.done
          todoListTemp.splice(index, 1)
          todoListTemp.unshift(item)
          break
        default:
          break
      }
    }
  })
}

/**
 * 处理删除事件
 * @param id 
 */
const handleDelete = (id: number) => {
  const todoListTemp = todoList.value
  todoListTemp.forEach((item, index) => {
    if (item.id === id) {
      const status = item.status
      if ([ToDoItemState.done, ToDoItemState.unfinished].includes(status)) {
        item.status = ToDoItemState.deleted
      }
      todoListTemp.splice(index, 1)
      todoListTemp.unshift(item)
    }
  })
}

</script>

<template>
  <a-list :data-source="dataSource" size="large" class="todo-list">
    <template #renderItem="{ item }">
      <a-list-item class="flex todo-item">
        <div class="flex todo-item-container">
          <a-checkbox :checked="item.status === ToDoItemState.done" @change="handleChecked($event, item.id)"></a-checkbox>
          <a-typography-paragraph
            v-model:content="item.content"
            editable
            class="content"
            :class="item.status === ToDoItemState.done ? 'color-gray' : ''"
          />
        </div>
        <a-button type="primary" danger ghost size="small" @click="handleDelete(item.id)">
          <template #icon>
            <delete-outlined />
          </template>
        </a-button>
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped lang='scss'>
@import '../../styles/variables.scss';
.todo-list {
  max-width: #{$containerWidth};
  .todo-item {
    &:hover {
      background-color: #f2f2f2;
    }
    .todo-item-container {
      width: calc(#{$containerWidth} - 72px);
      .content {
        margin: 0 20px;
        width: calc(100% - 50px);
        overflow-wrap: break-word;
      }
      .color-gray {
        color: #8a8a8a;
      }
    }
  }
}
</style>
