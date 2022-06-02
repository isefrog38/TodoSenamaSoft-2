export type TodolistType = {
    _id: string
    title: string
    addedDate: string
    files?: 1 | 0
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