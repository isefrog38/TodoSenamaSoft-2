import {RequestStatusType} from "./App-reducer";
import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodolistType} from "../Types/TodolistType";
import {Time} from "../UtilsFunction/Error-Utils";

export type FilterValuesType = 'All' | 'Active' | 'Completed';
export type InitialStateTodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
};

const initialState: Array<InitialStateTodolistDomainType> = [];

const TodolistSlice = createSlice({
    name: "TodolistSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setTodolistsAC, (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
            return state = action.payload.todolists.map(tl => ({...tl, entityStatus: 'idle', filter: 'All'}));
        });
        builder.addCase(removeTodolistAC, (state, action: PayloadAction<{ todolistId: string }>) => {
            return state.filter(tl => tl._id !== action.payload.todolistId);
        });
        builder.addCase(addTodolistAC, (state, action: PayloadAction<{ title: string, todolistId: string }>) => {
            return state = [
                {
                    _id: action.payload.todolistId,
                    title: action.payload.title,
                    entityStatus: 'idle',
                    filter: 'All',
                    addedDate: Time(),
                    order: 0
                },
                ...state
            ];
        });
        builder.addCase(changeTodolistTitleAC, (state, action: PayloadAction<{ todolistId: string, title: string }>) => {
            return state.map(tl => tl._id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl);
        });
    },
});

export const todolistsReducer = TodolistSlice.reducer;

export const setTodolistsAC = createAction<{ todolists: Array<TodolistType> }>('SET_TODOLISTS');
export const removeTodolistAC = createAction<{ todolistId: string }>('REMOVE_TODOLIST');
export const addTodolistAC = createAction<{ title: string, todolistId: string }>('ADD_TODOLIST');
export const changeTodolistTitleAC = createAction<{ todolistId: string, title: string }>('CHANGE_TODOLIST_TITLE');