import {addTodolistAC, changeTodolistTitleAC, removeTodolistAC, setTodolistsAC} from "../Redux-Store/todolists-reducer";
import {setAppStatusAC} from "../Redux-Store/App-reducer";
import {AppRootStateType, AppThunkType} from "../Redux-Store/store";
import {handleServerNetworkError} from "../UtilsFunction/Error-Utils";
import {todolistsAPI} from "../API/API";

export const getTodolistsTC = (): AppThunkType =>
    async (dispatch, getState: () => AppRootStateType) => {

    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        let searchTitle = getState().AppReducer.searchTodo;
        if (searchTitle !== '') {
            const response = await todolistsAPI.getSearchedTodolists(searchTitle);
            if (response.status === 200) {
                dispatch(setTodolistsAC({todolists: response.data}));
                dispatch(setAppStatusAC({status: 'succeeded'}));
            }
        }
        else {
            const response = await todolistsAPI.getTodolists();
            if (response.status === 200) {
                dispatch(setTodolistsAC({todolists: response.data}));
                dispatch(setAppStatusAC({status: 'succeeded'}));
            }
        }
    } catch (e) {
        if (e instanceof Error) {
            handleServerNetworkError(e, dispatch);
        }
    }
}

export const removeTodolistTC = (todolistId: string): AppThunkType => async dispatch => {

    dispatch(setAppStatusAC({status: 'loading'}));
    try {
        const response = await todolistsAPI.removeTodolist(todolistId);
        if (response.status === 200) {
            dispatch(removeTodolistAC({todolistId}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
        }
    } catch (e) {
        if (e instanceof Error) {
            handleServerNetworkError(e, dispatch);
        }
    }
}


export const createTodolistTC = (title: string): AppThunkType => async dispatch => {

    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        const response = await todolistsAPI.createTodolist(title);
        if (response.status === 200) {
            dispatch(addTodolistAC({title, todolistId: response.data.id}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
        }
    } catch (e) {
        if (e instanceof Error) {
            handleServerNetworkError(e, dispatch);
        }
    }
}

export const updateTodolistTC = (todolistId: string, title: string): AppThunkType => async dispatch => {

    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        const response = await todolistsAPI.updateTodolist(todolistId, title);
        if (response.status === 200) {
            dispatch(changeTodolistTitleAC({todolistId, title}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
        }
    } catch (e) {
        if (e instanceof Error) {
            handleServerNetworkError(e, dispatch);
        }
    }
}