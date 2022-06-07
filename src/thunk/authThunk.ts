import {Dispatch} from "redux";
import axios from "axios";
import {AppThunkType} from "../reduxStore/store";
import {setAppStatusAC, setAppSuccessMessageAC} from "../reduxStore/appReducer";
import {deleteUserDataAC, setAuthUserDataAC} from "../reduxStore/authReducer";
import {handleServerNetworkError} from "../utilsFunction/Error-Utils";
import {authAPI} from "../api/api";
import {PATH} from "../utilsFunction/enumPath";
import {NavigateFunction} from "react-router-dom";


export const AuthMeTC = (): AppThunkType => async dispatch => {

    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        const response = await authAPI.authMe()
        if (response.data) {
            dispatch(setAuthUserDataAC(response.data))
            dispatch(setAppStatusAC({status: 'succeeded'}));
        }
    } catch (error) {
        dispatch(setAppStatusAC({status: 'failed'}))
    }
};

export const LoginTC = (values: any) => async (dispatch: Dispatch) => {

    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        const response = await authAPI.authLogin(values.email, values.password, values.rememberMe);
        if (response.user) {
            dispatch(setAuthUserDataAC(response.user));
            dispatch(setAppStatusAC({status: 'succeeded'}));
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            handleServerNetworkError(error.response.data.error, dispatch);
        }
    }
};

export const LogOutTC = (): AppThunkType => async dispatch => {

    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        const response = await authAPI.logOut()
        if (response) {
            let resetUser = {
                id: null,
                email: null,
                isActivated: null,
            };
            dispatch(deleteUserDataAC(resetUser));
            dispatch(setAppStatusAC({status: 'succeeded'}));
            dispatch(setAppSuccessMessageAC({success: "LogOut succeeded"}));
        }
    } catch (error) {
        dispatch(setAppStatusAC({status: 'failed'}));

        if (axios.isAxiosError(error) && error.response) {
            handleServerNetworkError(error.response.data.error, dispatch);
        }
    }
};


export const RegisterTC = (email: string, password: string, navigate: NavigateFunction): AppThunkType => async dispatch => {

    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        const response = await authAPI.register(email, password);
        if (response) {
            navigate(PATH.login);
            dispatch(setAppStatusAC({status: 'succeeded'}));
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            handleServerNetworkError(error.response.data.error, dispatch);
        }
    }
};
