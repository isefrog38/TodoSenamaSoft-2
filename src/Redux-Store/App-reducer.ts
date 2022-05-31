import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type AppInitialStateType = {
    status: RequestStatusType
    error: null | string
    isFetching: boolean
    pageCount: number
    searchTodo: string
};

const initialState: AppInitialStateType = {
    status: 'succeeded',
    error: null,
    isFetching: true,
    pageCount: 1,
    searchTodo: '',
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
            state.pageCount = action.payload.pageCount;
        },
        setSearchTodoAC(state, action: PayloadAction<{ searchTodo: string }>) {
            state.searchTodo = action.payload.searchTodo;
        },
    },
});

export const AppReducer = AppSlice.reducer;

export const {setIsFetchingAC, setSearchTodoAC, setPageCountAC, setAppStatusAC, setAppErrorMessageAC} = AppSlice.actions;
