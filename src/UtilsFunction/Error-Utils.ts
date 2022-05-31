import {Dispatch} from 'redux';
import {ResponseType} from "../Types/TodolistType";
import {setAppErrorMessageAC, setAppStatusAC} from "../Redux-Store/App-reducer";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorMessageAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorMessageAC({error: 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch) => {
    dispatch(setAppErrorMessageAC({error: error.message}))
    dispatch(setAppStatusAC({status: 'failed'}))
}


export const Time = () => {
    let day = new Date().getDate();
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;

    return `${day < 10 ? `0${day}` : day}-${month < 10 ? `0${month}` : month}-${year}`
}