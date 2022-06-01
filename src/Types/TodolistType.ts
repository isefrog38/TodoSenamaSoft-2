export type TodolistType = {
    _id: string
    title: string
    addedDate: string
    order: number
    files?: FileType
}

export type FileType = {
    id: string
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