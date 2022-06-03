import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppInitialStateType, FilterType, LanguageType, RequestStatusType} from "../types/reducersType";

const initialState: AppInitialStateType = {
    params: {
        page: 1,
        pageSize: 10,
        search: '',
        filter: '0',
    },
    language: "Eng",
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
        setLanguageAC(state, action: PayloadAction<{ language: LanguageType }>) {
            state.language = action.payload.language;
        },
    },
});

export const AppReducer = AppSlice.reducer;

export const {setLanguageAC, setFilterAC, setTotalPageCountTaskAC, getPageAC,
    setIsFetchingAC, setSearchTodoAC, setPageCountAC, setAppStatusAC, setAppErrorMessageAC
} = AppSlice.actions;
