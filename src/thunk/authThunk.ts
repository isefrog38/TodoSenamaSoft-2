import {Dispatch} from "redux";
import axios from "axios";
import {AppRootStateType, AppThunkType} from "../reduxStore/store";
import {setAppStatusAC, setAppSuccessMessageAC} from "../reduxStore/appReducer";
import {deleteUserDataAC, setAuthUserDataAC, setCheckEmailAC} from "../reduxStore/authReducer";
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

export const LoginTC = (email: string, password: string, rememberMe: boolean) => async (dispatch: Dispatch) => {

    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        const {data} = await authAPI.authLogin(email, password, rememberMe);
        if (data.user) {
            dispatch(setAuthUserDataAC({data}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            handleServerNetworkError(error.response.data.error, dispatch);
        }
    }
};

export const LogOutTC = (): AppThunkType =>
    async (dispatch , getState: () => AppRootStateType)=> {

    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        const response = await authAPI.logOut()
        if (response) {
            let resetUser = {
                id: null,
                email: null,
                isActivated: null,
            };
            dispatch(deleteUserDataAC({user: resetUser}));
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
        if (response.data) {
            dispatch(setCheckEmailAC({email}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
            dispatch(setAppSuccessMessageAC({success: " Congratulations ! You are created account"}));

            navigate(PATH.checkEmail);

            let idTimeout = +setTimeout(() => { navigate(PATH.login) },5000);
            clearTimeout(idTimeout);
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            handleServerNetworkError(error.response.data.error, dispatch);
        }
    }
};
