import axios, {AxiosResponse} from "axios";
import {FileResponseType, FileType, TodolistType} from "../types/todolistType";
import {FilterType, LanguageType} from "../types/reducersType";

const instance = axios.create({baseURL: 'http://localhost:7574/'});

export const todolistsAPI = {
    getTodolists(params: {pageSize: number, page: number, filter: FilterType, search?: string}) {
        return instance.get<{todolists: TodolistType[], totalCount: number}>(`todolists`, {params});
    },

    createTodolist(title: string, date: Date,  file?: FileType, id?: string) {
        if (id) return instance.post<AxiosResponse<{id: string}>>(`todolists/${id}`, {title, date, file});
        else return instance.post<AxiosResponse<{id: string}>>(`todolists`, {title, date, file});
    },

    removeTodolist(id: string) {
        return instance.delete(`todolists/${id}`);
    },

    getFile(id: string) {
        return instance.get<{file: FileResponseType}>(`todolists/file/${id}`);
    },

    getLanguage(lang: LanguageType) {
        return instance.get(`todolists/language/${lang}`);
    },
}