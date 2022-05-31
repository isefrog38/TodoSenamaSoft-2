import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type AppInitialStateType = {
    pagination : {
        pageCount: number
        pageSize: number
        page: number
        totalCount: number | null
    }
    status: RequestStatusType
    error: null | string
    isFetching: boolean
    searchTodo: string
};

const initialState: AppInitialStateType = {
    pagination: {
        pageCount: 10,
        totalCount: null,
        page: 1,
        pageSize: 10,
    },
    status: 'succeeded',
    error: null,
    isFetching: true,
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
            state.pagination.pageCount = action.payload.pageCount;
        },
        setSearchTodoAC(state, action: PayloadAction<{ searchTodo: string }>) {
            state.searchTodo = action.payload.searchTodo;
        },
        getPageTaskAC(state, action: PayloadAction<{ page: number }>) {
            state.pagination.page = action.payload.page;
        },
        setTotalPageCountTaskAC(state, action: PayloadAction<{ totalCount: number }>) {
            state.pagination.totalCount = action.payload.totalCount;
        },
    },
});

export const AppReducer = AppSlice.reducer;

export const {setTotalPageCountTaskAC, getPageTaskAC, setIsFetchingAC, setSearchTodoAC, setPageCountAC, setAppStatusAC, setAppErrorMessageAC} = AppSlice.actions;
