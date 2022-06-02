import {Dispatch} from 'redux';
import {ResponseType} from "../types/TodolistType";
import {setAppErrorMessageAC, setAppStatusAC} from "../reduxStore/App-reducer";

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

export const fileToBase64 = (file: File | null, cb: any) => {
    const reader = new FileReader()
    if (file) reader.readAsDataURL(file)
    reader.onload = function () {
        cb(null, reader.result)
    }
    reader.onerror = function (error) {
        cb(error, null)
    }
}