export interface IColumn {
  id: string
  columnTitle: string
  order: number
}

export interface ISwap {
  id: string
  order: number
}

export interface ITask {
  id: string
  taskTitle: string
  taskDescription: string
  isDone: boolean
  order: number
}

export interface ITaskState {
  tasks: {
    [n: string]: ITask[]
  }
  isLoading: boolean
  error: string
}

export interface ITaskRes {
  col: string
  response: IColumnTasks
}

export interface ITaskUpdate {
  id: string
  taskTitle: string
  taskDescription: string
  isDone: boolean
  order: number
  columnId: string
}

export interface INewTask {
  taskTitle: string
  taskDescription: string
  isDone: boolean
}

export interface ITaskCreate {
  taskTitle: string
  taskDescription: string
  isDone: boolean
  order: number
  column_id: string
}

export interface ITaskCreateRes {
  taskTitle: string
  taskDescription: string
  isDone: boolean
  order: number
  column_id: string
  id: string
}

export interface ITaskDelete {
  id: string
  col: string
}

export interface ITaskReorderParam {
  order: number
  taskId: string
  columnId: string
}

export interface ITaskSortData {
  columnTasks: ITask[]
  columnId: string
}

export interface ITasksReorderStore {
  reqParams: ITaskReorderParam[]
  sortData: ITaskSortData[]
  undoData: ITaskSortData[]
}

export interface IColumnTasks extends IColumn {
  Tasks: ITask[]
}

export interface IColumnAPI {
  order: number
  color: string
  id: string
  cardTitle: string
  Columns: IColumnTasks[]
}

export interface IColumnsState {
  columns: IColumn[]
  error: string
  isLoading: boolean
}

export interface IColumnCreate {
  columnTitle: string
  order?: number
  card_id: string
}

export interface IColumnUpdete {
  order: number
  columnTitle: string
  id: string
}

export interface IColumnProps {
  title: string
  column: IColumn
  start: (e: React.DragEvent<HTMLDivElement>, column: IColumn) => void
  leave: (e: React.DragEvent<HTMLDivElement>) => void
  end: (e: React.DragEvent<HTMLDivElement>) => void
  over: (e: React.DragEvent<HTMLDivElement>) => void
  drop: (e: React.DragEvent<HTMLDivElement>, column: IColumn) => void
  children: React.ReactNode
}
