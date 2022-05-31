import {AppThunkType} from "../Redux-Store/store";
import {RequestStatusType, setAppStatusAC} from "../Redux-Store/App-reducer";
import {changeTaskEntityStatusAC, removeTaskAC, setTasksAC} from "../Redux-Store/tasks-reducer";
import {todolistsAPI} from "../API/API";
import {handleServerAppError, handleServerNetworkError} from "../UtilsFunction/Error-Utils";

export const getTasksTC = (todolistId: string): AppThunkType => async dispatch => {

    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        const response = await todolistsAPI.getTasks(todolistId);
        if (response.data.error === null) {
            let tasks = response.data.items.map(el => ({...el, entityTaskStatus: 'idle' as RequestStatusType}));
            console.log(tasks)
            dispatch(setTasksAC({tasks, todolistId}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
        }
    } catch (error) {
        if (error instanceof Error) {
            handleServerNetworkError(error, dispatch);
        }
    }
}

export const removeTaskTC = ( todolistId: string, taskId: string): AppThunkType => async dispatch => {

    dispatch(setAppStatusAC({status: 'loading'}));
    dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'loading'}));

    try {
        const response = await todolistsAPI.deleteTask(todolistId, taskId);
    //     if (response.data.resultCode === 0) {
    //         dispatch(removeTaskAC({taskId, todolistId}));
    //         dispatch(setAppStatusAC({status: 'succeeded'}));
    //         dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'succeeded'}));
    //     } else {
    //         handleServerAppError(response.data, dispatch);
    //         dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'failed'}));
    //     }
    } catch (error) {
        if (error instanceof Error) {
            handleServerNetworkError(error, dispatch);
            dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'failed'}));
        }
    }
}


export const createTaskTC = (values: {nameTask: string}): AppThunkType => async dispatch => {

    // dispatch(setAppStatusAC({status: 'loading'}));
    // dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'loading'}));
    //
    // try {
    //     const response = await todolistsAPI.deleteTask(todolistId, taskId);
    //     //     if (response.data.resultCode === 0) {
    //     //         dispatch(removeTaskAC({taskId, todolistId}));
    //     //         dispatch(setAppStatusAC({status: 'succeeded'}));
    //     //         dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'succeeded'}));
    //     //     } else {
    //     //         handleServerAppError(response.data, dispatch);
    //     //         dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'failed'}));
    //     //     }
    // } catch (error) {
    //     if (error instanceof Error) {
    //         handleServerNetworkError(error, dispatch);
    //         dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'failed'}));
    //     }
    // }
}

export const updateTaskTC = () => {

}