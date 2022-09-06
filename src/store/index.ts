import { defineStore } from 'pinia'

export interface ToDoItemInterface {
  id: number,
  content: string,
  status: number
}

export const useStore = defineStore('main', {
  state: () => {
    return {
      todoList: [] as ToDoItemInterface[]
    }
  },
  getters: {},
  actions: {}
})