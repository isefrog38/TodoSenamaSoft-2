import axios, {AxiosResponse} from "axios";
import {FileResponseType, FileType, TodolistType} from "../types/todolistType";
import {FilterType, LanguageType} from "../types/reducersType";

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
        return instance.delete(`auth/me`)
    },
    register(email: string, password: string) {
        return instance.post(`auth/register`, {email, password})
    },
    forgotPassword(email: string) {
        return instance.post(`auth/forgot`,
            {
                email,
                from: 'adminSenamaSoftTodo@yandex.by',
                message: `
<div style="background-color: #2D2E46; padding: 15px; color: lavender">
Password recovery link: 
<a style="text-decoration:none; color: deepskyblue;" href='https://localhost:3000/setNewPass/$token$'>link</a></div>`
            });
    },
    newPassword(password: string, resetPasswordToken: string) {
        return instance.post(`auth/set-new-password`, {
            password,
            resetPasswordToken
        })
    },
}

