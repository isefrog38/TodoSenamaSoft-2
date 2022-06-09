export type TodolistType = {
    _id: string
    title: string
    addedDate: string
    file?: 1 | 0
}


export type LanguageResponseType = {
    "todolist_senamaSoft": string,
    "name_table": string,
    "date_table": string,
    "actions_table": string,
    "show": string,
    "task_per_page": string,
    "todolist_table": string,
    "add_button": string,
}

export type FileResponseType = {
    id: string
    taskId: string
    name: string | undefined,
    type: string | undefined,
    size: number | undefined,
    lastModified: number | undefined,
    path: string,
}

export type FileType = {
    name: string | undefined,
    type: string | undefined,
    size: number | undefined,
    lastModified: number | undefined,
    path: string,
}


export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}