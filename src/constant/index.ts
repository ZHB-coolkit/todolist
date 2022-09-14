export const enum ToDoItemState {
  unfinished = 0,
  done = 1,
  deleted = 2
}

export interface response {
  error: number,
  msg: string,
  data: object
}