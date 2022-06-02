import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FileResponseType} from "../types/TodolistType";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type FilterType = '0' | '1';

export type AppInitialStateType = {
    params : {
        search: string
        pageSize: number
        page: number
        filter: FilterType
    }
    file: FileResponseType | null
    totalCount: number | null
    status: RequestStatusType
    error: null | string
    isFetching: boolean
};

const initialState: AppInitialStateType = {
    params: {
        page: 1,
        pageSize: 10,
        search: '',
        filter: '0',
    },
    file: null,
    status: 'succeeded',
    error: null,
    isFetching: true,
    totalCount: null,
}

const AppSlice = createSlice({
    name: "AppSlice",
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status;
        },
        setAppErrorMessageAC(state, action: PayloadAction<{ error: null | string }>) {
            state.error = action.payload.error;
        },
        setIsFetchingAC(state, action: PayloadAction<{ isFetching: boolean }>) {
            state.isFetching = action.payload.isFetching;
        },
        setPageCountAC(state, action: PayloadAction<{ pageCount: number }>) {
            state.params.pageSize = action.payload.pageCount;
        },
        setSearchTodoAC(state, action: PayloadAction<{ searchTodo: string }>) {
            state.params.search = action.payload.searchTodo;
        },
        getPageAC(state, action: PayloadAction<{ page: number }>) {
            state.params.page = action.payload.page;
        },
        setTotalPageCountTaskAC(state, action: PayloadAction<{ totalCount: number }>) {
            state.totalCount = action.payload.totalCount;
        },
        setFilterAC(state, action: PayloadAction<{ filter: FilterType }>) {
            state.params.filter = action.payload.filter;
        },
        setFileAC(state, action: PayloadAction<{ file: FileResponseType }>) {
            state.file = action.payload.file;
        },
    },
});

export const AppReducer = AppSlice.reducer;

export const {setFileAC, setFilterAC, setTotalPageCountTaskAC, getPageAC, setIsFetchingAC, setSearchTodoAC, setPageCountAC, setAppStatusAC, setAppErrorMessageAC} = AppSlice.actions;
