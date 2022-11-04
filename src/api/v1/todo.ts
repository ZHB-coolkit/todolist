import request from '@/utils/request'
import { version, prefix } from './common'
import EHttpMethod from '@/ts/enum/EHttpMethod'

const TODO_API = {
  SAVE_TODO: `${prefix}/${version}/todo`,
  GET_TODO_LIST: `${prefix}/${version}/todo/list`
}

interface ISaveTodoParameter {
  content: string
}

interface IUpdateTodoStatusParameter {
  status: '0' | '1'
}

interface IGetTodoListParameter {
  keyword?: string,
  status?: '0' | '1'
}

/**
 * 新增 todo
 * @param parameter 
 * @returns 
 */
const addTodo = (parameter: ISaveTodoParameter) => {
  return request({
    url: TODO_API.SAVE_TODO,
    method: EHttpMethod.POST,
    data: parameter
  })
}

/**
 * 编辑 todo
 * @param parameter 
 * @returns 
 */
const editTodo = (id: string, parameter: ISaveTodoParameter) => {
  return request({
    url: `${TODO_API.SAVE_TODO}/${id}`,
    method: EHttpMethod.PUT,
    data: parameter
  })
}

/**
 * 更新 todo 状态
 * @param parameter 
 * @returns 
 */
const updateTodoStatus = (id: string, parameter: IUpdateTodoStatusParameter) => {
  return request({
    url: `${TODO_API.SAVE_TODO}/${id}`,
    method: EHttpMethod.PATCH,
    data: parameter
  })
}

/**
 * 删除 todo
 * @returns 
 */
const deleteTodo = (id: string) => {
  return request({
    url: `${TODO_API.SAVE_TODO}/${id}`,
    method: EHttpMethod.DELETE
  })
}

/**
 * 获取 todolist
 * @param parameter 
 * @returns 
 */
const getTodoList = (parameter?: IGetTodoListParameter) => {
  return request({
    url: TODO_API.GET_TODO_LIST,
    method: EHttpMethod.GET,
    params: parameter
  })
}

export {
  addTodo,
  editTodo,
  updateTodoStatus,
  deleteTodo,
  getTodoList
}
