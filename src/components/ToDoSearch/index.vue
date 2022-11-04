<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { debounce } from 'lodash'
import { SearchOutlined } from '@ant-design/icons-vue'
import { todoListEmitter } from '@/utils/emitter'
import { TODO_LIST_EMITTER } from '@/ts/enum/EEmitter'

const searchValue = ref('')

const handleSearch = debounce(() => {
  todoListEmitter.emit(TODO_LIST_EMITTER.SEARCH, searchValue.value)
}, 500, {
  leading: false,
  trailing: true
})

onUnmounted(() => {
  handleSearch.cancel
})

</script>

<template>
  <div class="fixed text-right search-container">
      <div class="w-full h-full absolute">
        <form>
          <a-input
            v-model:value="searchValue"
            type="text"
            id="search-input"
            :bordered="false"
            placeholder="请输入内容"
            class="border-none outline-none cursor-pointer focus:cursor-text search-input"
            @change="handleSearch"
          />
          <label for="search-input">
            <search-outlined class="relative cursor-pointer search-icon" />
          </label>
        </form>
      </div>
    </div>
</template>

<style lang="scss" scoped>

@import '../../styles/variables.scss';

  // 搜索 icon 跟随 BackTop 组件响应式
@media screen and (max-width: 480px) {
  .search-container {
    right: 6px;
  }
}

@media screen and (min-width: 481px) and (max-width: 768px) {
  .search-container {
    right: 46px;
  }
}

@media screen and (min-width: 769px) {
  .search-container {
    right: 86px;
  }
}

.search-container {
  width: 340px;
  height: 40px;
  bottom: 100px;
  .search-input {
    width: 40px;
    height: 40px;
    padding: 0 20px;
    border-radius: 20px;
    background-color: #{$floatIconBgColor};
    transition: width .6s;
    &:focus {
      width: 300px;
      padding-right: 35px;
    }
    &:not(:focus) {
      text-indent: -5000px;
    }
  }
  .search-icon {
    left: -26px;
    top: -3px;
  }
}

</style>