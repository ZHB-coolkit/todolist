import { defineStore } from 'pinia'
import { TODO_LIST } from '@/constant/storage-key'
import storage from '@/utils/storage'

export interface IToDoItem {
  id: number,
  content: string,
  status: number
}

export const todoListStore = defineStore('todoListStore', {
  state: () => {
    return {
      todoList: storage.get(TODO_LIST) || [] as IToDoItem[]
    }
  },
  actions: {
    addTodo(todo: IToDoItem) {
      this.todoList.unshift(todo)
      storage.set(TODO_LIST, this.todoList)
    }
  }
})
