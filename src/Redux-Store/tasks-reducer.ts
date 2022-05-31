import {RequestStatusType} from "./App-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TaskTypeWithStatusEntity} from "../Types/TaskType";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {UpdateTaskModelType} from "../Types/TodolistType";

export type TasksStateType = {
    [key: string]: Array<TaskTypeWithStatusEntity>
}

const initialState: TasksStateType = {
    // "todolistId1": [
    //     { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1",
    //         createDate: '', entityTaskStatus: "idle" },
    // ]
};

const TaskSlice = createSlice({
    name: "TaskSlice",
    initialState: initialState,
    reducers: {
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskTypeWithStatusEntity>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks;
        },
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
             state[action.payload.todolistId] = state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId);
        },
        addTaskAC(state, action: PayloadAction<{ todolistId: string, task: TaskTypeWithStatusEntity }>) {
            state[action.payload.todolistId] = [action.payload.task, ...state[action.payload.todolistId]];
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string, model: UpdateTaskModelType }>) {
            state[action.payload.todolistId] = state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, ...action.payload.model} : t);
        },
        changeTaskEntityStatusAC(state, action: PayloadAction<{ todolistId: string, taskId: string, entityStatus: RequestStatusType }>) {
            state[action.payload.todolistId] = state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                ...t,
                entityTaskStatus: action.payload.entityStatus
            } : t);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setTodolistsAC, (state, action) => {
            return action.payload.todolists.forEach((tl) => state[tl._id] = []);
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            let copyState = state;
            delete copyState[action.payload.todolistId];
            return copyState;
        });
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolistId] = [];
        });
    },
});


export const tasksReducer = TaskSlice.reducer;

export const {removeTaskAC, addTaskAC, changeTaskEntityStatusAC, updateTaskAC, setTasksAC} = TaskSlice.actions;