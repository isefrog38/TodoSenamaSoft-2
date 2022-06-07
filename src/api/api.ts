import axios, {AxiosResponse} from "axios";
import {FileResponseType, FileType, TodolistType} from "../types/todolistType";
import {FilterType, LanguageType} from "../types/reducersType";
import {ResponseRegisterType} from "../types/authType";

const instance = axios.create({baseURL: 'http://localhost:7574/'});

export const todolistsAPI = {
    getTodolists(params: { pageSize: number, page: number, filter: FilterType, search?: string }) {
        return instance.get<{ todolists: TodolistType[], totalCount: number }>(`todolists`, {params});
    },

    createTodolist(title: string, date: Date, file?: FileType, id?: string) {
        if (id) return instance.post<AxiosResponse<{ id: string }>>(`todolists/${id}`, {title, date, file});
        else return instance.post<AxiosResponse<{ id: string }>>(`todolists`, {title, date, file});
    },

    removeTodolist(id: string) {
        return instance.delete(`todolists/${id}`);
    },

    getFile(id: string) {
        return instance.get<{ file: FileResponseType }>(`todolists/file/${id}`);
    },

    getLanguage(lang: LanguageType) {
        return instance.get(`todolists/language/${lang}`);
    },
}


export const authAPI = {
    authMe() {
        return instance.post(`auth/me`)
    },
    authLogin(email: string, password: string, rememberMe: boolean,) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logOut() {
        return instance.post(`auth/logOut`)
    },
    register(email: string, password: string) {
        return instance.post<{email: string, password: string}, ResponseRegisterType>(`auth/register`, {email, password})
    },
}

