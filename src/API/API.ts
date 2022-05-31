import axios, {AxiosResponse} from "axios";
import {GetTasksResponse, TodolistType} from "../Types/TodolistType";

const instance = axios.create({baseURL: 'http://localhost:7574/'});

export const todolistsAPI = {
    getTodolists(params: {searchTitle?: string, pageSize: number, page: number}) {
        return instance.get<{todolists: TodolistType[], totalCount: number}>(`todolists`, {params});
    },

    createTodolist(title: string) {
        return instance.post<{ title: string }, AxiosResponse<{id: string}>>('todolists', {title});
    },

    removeTodolist(id: string) {
        return instance.delete<ResponseType>(`todolists/${id}`);
    },

    updateTodolist(id: string, title: string) {
        return instance.put<{ title: string }, AxiosResponse<TodolistType>>(`todolists/${id}`, {title});
    },

    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todolists/${todolistId}/tasks`);
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todolists/${todolistId}/tasks/${taskId}`);
    },

    // createTask(todolistId: string, title: string) {
    //     return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, {title});
    // },

    // updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    //     return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    // },
}