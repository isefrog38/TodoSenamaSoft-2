import axios from "axios";
import {NavigateFunction} from "react-router-dom";
import {AppThunkType} from "../reduxStore/store";
import {setAppStatusAC} from "../reduxStore/appReducer";
import {handleServerNetworkError} from "../utilsFunction/Error-Utils";
import {PATH} from "../utilsFunction/enumPath";
import {authAPI} from "../api/api";
import {setForgotEmailAC} from "../reduxStore/authReducer";


export const RegisterTC = (email: string, password: string): AppThunkType => async dispatch => {

    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        const response = await authAPI.register(email, password);
        if (response) {
            dispatch(setAppStatusAC({status: 'succeeded'}));
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            handleServerNetworkError(error.response.data.error, dispatch);
        }
    }
};

export const ForgetPasswordTC = (email: string, navigate: NavigateFunction): AppThunkType => async dispatch => {

    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        const response = await authAPI.forgotPassword(email);
        if (response) {
            dispatch(setAppStatusAC({status: 'succeeded'}));
            dispatch(setForgotEmailAC({email}));

            navigate(PATH.checkEmail);
            setTimeout(() => {
                navigate(PATH.login)
            },5000);
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            handleServerNetworkError(error.response.data.error, dispatch);
        }
    }
};
export const NewPasswordTC = (password: string, passwordToken: string): AppThunkType => async dispatch => {

    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        const response = await authAPI.newPassword(password, passwordToken);
        if (response) {
            dispatch(setAppStatusAC({status: 'succeeded'}));
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            handleServerNetworkError(error.response.data.error, dispatch);
        }
    }
};