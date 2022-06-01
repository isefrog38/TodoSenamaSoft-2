import axios, {AxiosResponse} from "axios";
import {FileType, TodolistType} from "../Types/TodolistType";
import {FilterType} from "../Redux-Store/App-reducer";

const instance = axios.create({baseURL: 'http://localhost:7574/'});

export const todolistsAPI = {
    getTodolists(params: {pageSize: number, page: number, filter: FilterType, search?: string}) {
        return instance.get<{todolists: TodolistType[], totalCount: number}>(`todolists`, {params});
    },

    createTodolist(title: string, date: Date,  file?: FileType) {
        return instance.post<{ title: string }, AxiosResponse<{id: string}>>('todolists', {title, date, file});
    },

    removeTodolist(id: string) {
        return instance.delete<ResponseType>(`todolists/${id}`);
    },

    updateTodolist(id: string, title: string, file?: string) {
        return instance.put<{ title: string }, AxiosResponse<TodolistType>>(`todolists/${id}`, {title, file});
    },

    downloadFile(name: string) {
        return instance.get<{file: string}>(`todolists/file/${name}`);
    },
}