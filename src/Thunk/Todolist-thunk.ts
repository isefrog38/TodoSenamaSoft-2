import {changeTodolistTitleAC, removeTodolistAC, setTodolistsAC} from "../Redux-Store/todolists-reducer";
import {setAppStatusAC, setIsFetchingAC, setTotalPageCountTaskAC} from "../Redux-Store/App-reducer";
import {AppRootStateType, AppThunkType} from "../Redux-Store/store";
import {handleServerNetworkError} from "../UtilsFunction/Error-Utils";
import {todolistsAPI} from "../API/API";
import {FileType} from "../Types/TodolistType";

export const getTodolistsTC = (): AppThunkType =>
    async (dispatch, getState: () => AppRootStateType) => {

        dispatch(setIsFetchingAC({isFetching: true}));

    try {
        let {params} = getState().AppReducer;
            const response = await todolistsAPI.getTodolists(params);
            if (response.status === 200) {
                dispatch(setTodolistsAC({todolists: response.data.todolists}));
                dispatch(setTotalPageCountTaskAC({totalCount: response.data.totalCount}));
                dispatch(setAppStatusAC({status: 'succeeded'}));
                dispatch(setIsFetchingAC({isFetching: false}));
            }
    } catch (e) {
        if (e instanceof Error) {
            handleServerNetworkError(e, dispatch);
        }
    }
}

export const removeTodolistTC = (todolistId: string): AppThunkType => async dispatch => {

    dispatch(setIsFetchingAC({isFetching: true}));

    try {
        const response = await todolistsAPI.removeTodolist(todolistId);
        if (response.status === 200) {
            dispatch(removeTodolistAC({todolistId}));
            dispatch(setIsFetchingAC({isFetching: false}));
        }
    } catch (e) {
        if (e instanceof Error) {
            handleServerNetworkError(e, dispatch);
        }
    }
}


export const createTodolistTC = (title: string, date: Date, file?: FileType): AppThunkType => async dispatch => {

    dispatch(setIsFetchingAC({isFetching: true}));

    try {
        const response = await todolistsAPI.createTodolist(title, date, file);
        if (response.status === 200) {
            dispatch(getTodolistsTC());
            dispatch(setIsFetchingAC({isFetching: false}));
        }
    } catch (e) {
        if (e instanceof Error) {
            handleServerNetworkError(e, dispatch);
        }
    }
}

export const updateTodolistTC = (todolistId: string, title: string, file?: string): AppThunkType => async dispatch => {

    dispatch(setIsFetchingAC({isFetching: true}));

    try {
        const response = await todolistsAPI.updateTodolist(todolistId, title, file);
        if (response.status === 200) {
            dispatch(changeTodolistTitleAC({todolistId, title}));
            dispatch(setIsFetchingAC({isFetching: false}));
        }
    } catch (e) {
        if (e instanceof Error) {
            handleServerNetworkError(e, dispatch);
        }
    }
}


export const downloadFileTC = (name: string): AppThunkType => async dispatch => {

    try {
        const response = await todolistsAPI.downloadFile(name);
        if (response.status === 200) {
            console.log(response.data.file)
        }
    } catch (e) {
        if (e instanceof Error) {
            handleServerNetworkError(e, dispatch);
        }
    }
}