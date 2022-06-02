import axios, {AxiosResponse} from "axios";
import {FileType, TodolistType} from "../types/TodolistType";
import {FilterType} from "../reduxStore/App-reducer";

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

    updateTodolist(id: string, title: string, date: Date, file?: FileType) {
        return instance.put<{ title: string }, AxiosResponse<TodolistType>>(`todolists/${id}`, {title, date, file});
    },
}