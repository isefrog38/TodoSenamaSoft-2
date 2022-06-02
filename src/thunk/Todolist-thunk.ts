import {changeTodolistTitleAC, removeTodolistAC, setTodolistsAC} from "../reduxStore/todolists-reducer";
import {setAppStatusAC, setIsFetchingAC, setTotalPageCountTaskAC} from "../reduxStore/App-reducer";
import {AppRootStateType, AppThunkType} from "../reduxStore/store";
import {handleServerNetworkError} from "../utilsFunction/Error-Utils";
import {todolistsAPI} from "../api/API";
import {FileType} from "../types/TodolistType";

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
            dispatch(getTodolistsTC());
            dispatch(removeTodolistAC({todolistId}));
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
        }
    } catch (e) {
        if (e instanceof Error) {
            handleServerNetworkError(e, dispatch);
        }
    }
}

export const updateTodolistTC = (todolistId: string, title: string, date: Date, file?: FileType): AppThunkType => async dispatch => {

    dispatch(setIsFetchingAC({isFetching: true}));

    try {
        const response = await todolistsAPI.updateTodolist(todolistId, title, date, file);
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