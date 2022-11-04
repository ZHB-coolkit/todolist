<script setup lang="ts">
import { ref, nextTick, watchEffect } from 'vue'
import { EditOutlined, SaveOutlined } from '@ant-design/icons-vue'
import { editTodo } from '@/api/v1/todo'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ''
  }
})

const isEditContent = ref(false)
const editValue = ref('')
const showContent = ref('')
const editInput = ref(null)

watchEffect(() => {
  showContent.value = props.content
})

const handleToEdit = () => {
  isEditContent.value = true
  nextTick(() => {
    editInput.value.focus()
  })
  editValue.value = showContent.value
}

/**
 * 处理编辑事件
 */
const handleEdit = async () => {
  await editTodo(props.id, { content: editValue.value })
  showContent.value = editValue.value
  isEditContent.value = false
}

const isShowTooltip = ref(false)

const visibilityChange = (event: MouseEvent) => {
  const { scrollWidth, clientWidth } = event.target
  
  if (scrollWidth > clientWidth) {
    isShowTooltip.value = true
  } else {
    isShowTooltip.value = false
  }
  
}

</script>

<template>
  <div class="flex justify-between items-center editable-text-container">
    <a-input v-show="isEditContent" v-model:value="editValue" ref="editInput" />
    <a-tooltip :visible="isShowTooltip">
      <template #title>
        <p class="show-content">{{ showContent }}</p>
      </template>
      <p
        v-show="!isEditContent"
        class="show-content"
        @mouseenter="visibilityChange"
        @mouseleave="isShowTooltip = false"
      >{{ showContent }}</p>
    </a-tooltip>
    <a-button v-show="!isEditContent" type="primary" ghost size="small" class="operate-btn" @click="handleToEdit">
      <template #icon>
        <edit-outlined />
      </template>
    </a-button>
    <a-button v-show="isEditContent" type="primary" ghost size="small" class="operate-btn" @click="handleEdit">
      <template #icon>
        <save-outlined />
      </template>
    </a-button>
  </div>
</template>

<style lang="scss" scoped>
.editable-text-container {
  height: 32px;
  .show-content {
    margin-bottom: 0;
    max-width: 460px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .operate-btn {
    margin-left: 20px;
    &:deep(.anticon-save) {
      width: 22px;
    }
  }
}
</style>