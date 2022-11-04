<script setup lang="ts">
import { DeleteOutlined } from '@ant-design/icons-vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { EToDoStatus } from '@/ts/enum/ETodo'
import { getTodoList, updateTodoStatus, deleteTodo } from '@/api/v1/todo'
import { todoListEmitter } from '@/utils/emitter'
import { TODO_LIST_EMITTER, TODO_LIST_REFRESH_REASON } from '@/ts/enum/EEmitter'
import { CheckboxChangeEvent } from 'ant-design-vue/lib/_util/EventInterface'
import EditableText from '@/components/EditableText/index.vue'

const props = defineProps({
  status: {
    type: Number,
    enum: [EToDoStatus.UNFINISHED, EToDoStatus.DONE],
    default: EToDoStatus.UNFINISHED
  },
  searchValue: {
    type: String
  }
})

const dataSource = ref([])

const initDataSource = async () => {
  const { data } = await getTodoList({ 
    status: props.status.toString()
  })
  dataSource.value = data
}

const handleRefreshTodoList = (
  reason: 
    TODO_LIST_REFRESH_REASON.ADD | 
    TODO_LIST_REFRESH_REASON.EDIT | 
    TODO_LIST_REFRESH_REASON.UPDATE_STATUS
) => {
  if ((reason === TODO_LIST_REFRESH_REASON.UPDATE_STATUS) || (reason === TODO_LIST_REFRESH_REASON.ADD && props.status === EToDoStatus.UNFINISHED)) {
    initDataSource()
  }
}

const handleSearchTodoList = async (value: string) => {
  const { data } = await getTodoList({ 
    status: props.status.toString(),
    keyword: value
  })
  dataSource.value = data
}

onMounted(() => {
  todoListEmitter.on(TODO_LIST_EMITTER.REFRESH, handleRefreshTodoList)
  todoListEmitter.on(TODO_LIST_EMITTER.SEARCH, handleSearchTodoList)
  initDataSource()
})

onUnmounted(() => {
  todoListEmitter.off(TODO_LIST_EMITTER.REFRESH, handleRefreshTodoList)
  todoListEmitter.off(TODO_LIST_EMITTER.SEARCH, handleSearchTodoList)
})

/**
 * 处理完成状态变更
 * @param event 
 * @param id 
 */
const handleChecked = async (event: CheckboxChangeEvent, id: string) => {
  const status = event.target.checked ? EToDoStatus.DONE : EToDoStatus.UNFINISHED
  await updateTodoStatus(id, { status: status.toString() })
  todoListEmitter.emit(TODO_LIST_EMITTER.REFRESH, TODO_LIST_REFRESH_REASON.UPDATE_STATUS)
}

/**
 * 处理删除事件
 * @param id 
 */
const handleDelete = async (id: string) => {
  await deleteTodo(id)
  initDataSource()
}

</script>

<template>
  <a-list v-model:data-source="dataSource" size="large" class="todo-list">
    <template #renderItem="{ item }">
      <a-list-item class="flex todo-item">
        <div class="flex items-center todo-item-container">
          <a-checkbox :checked="item.status === EToDoStatus.DONE" @change="handleChecked($event, item._id)"></a-checkbox>
          <editable-text class="content" :id="item._id" :content="item.content" />
        </div>
        <a-popconfirm
          title="Are you sure delete this task?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="handleDelete(item._id)"
        >
          <a-button type="primary" danger ghost size="small">
            <template #icon>
              <delete-outlined />
            </template>
          </a-button>
        </a-popconfirm>
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
