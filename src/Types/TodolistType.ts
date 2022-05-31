export type TodolistType = {
    _id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}


export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}


export type TaskType = {
    title: string
    status: TaskStatuses
    createDate: string
    id: string
    todoListId: string
}
export type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    startDate?: string
    deadline?: string
}
export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}