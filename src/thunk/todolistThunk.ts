import {setTodolistsAC} from "../reduxStore/todolistsReducer";
import {setAppStatusAC, setIsFetchingAC, setLanguageFileAC, setTotalPageCountTaskAC} from "../reduxStore/appReducer";
import {AppRootStateType, AppThunkType} from "../reduxStore/store";
import {handleServerNetworkError} from "../utilsFunction/Error-Utils";
import {todolistsAPI} from "../api/api";
import {FileType} from "../types/todolistType";

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
                handleServerNetworkError(e.message, dispatch);
            }
        }
    }

export const removeTodolistTC = (todolistId: string): AppThunkType => async dispatch => {

    dispatch(setIsFetchingAC({isFetching: true}));

    try {
        const response = await todolistsAPI.removeTodolist(todolistId);
        if (response.status === 200) {
            dispatch(getTodolistsTC());
        }
    } catch (e) {
        if (e instanceof Error) {
            handleServerNetworkError(e.message, dispatch);
        }
    }
}


export const createTodolistTC = (title: string, date: Date, file?: FileType, id?: string): AppThunkType => async dispatch => {

    dispatch(setIsFetchingAC({isFetching: true}));

    try {
        const response = await todolistsAPI.createTodolist(title, date, file, id);
        if (response.status > 200 || response.status < 400) {
            dispatch(getTodolistsTC());
        }
    } catch (e) {
        if (e instanceof Error) {
            handleServerNetworkError(e.message, dispatch);
        }
    }
}

export const getFile = (id: string): AppThunkType => async dispatch => {
    try {
        const response = await todolistsAPI.getFile(id);
        if (response.status === 200) {
            let file = response.data.file;
            if (file?.name) {
                let tempLink = document.createElement('a');
                tempLink.href = file?.path;
                tempLink.setAttribute('download', file?.name);
                tempLink.click();
            }
        }
    } catch (e) {
        if (e instanceof Error) {
            handleServerNetworkError(e.message, dispatch);
        }
    }
}

export const getLanguageTC = (): AppThunkType =>
    async (dispatch, getState: () => AppRootStateType) => {

        dispatch(setAppStatusAC({status: 'loading'}));

        try {
            const {language} = getState().AppReducer
            const response = await todolistsAPI.getLanguage(language);
            if (response.status === 200) {
                if (response.data.file.Eng) {
                    dispatch(setLanguageFileAC({translation: response.data.file.Eng}));
                    dispatch(setAppStatusAC({status: 'succeeded'}));
                } else {
                    dispatch(setLanguageFileAC({translation: response.data.file.Rus}));
                    dispatch(setAppStatusAC({status: 'succeeded'}));
                }
            }
        } catch (e) {
            if (e instanceof Error) {
                handleServerNetworkError(e.message, dispatch);
            }
        }
    }
