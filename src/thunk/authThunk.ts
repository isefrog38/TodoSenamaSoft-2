import {Dispatch} from "redux";
import axios from "axios";
import {AppThunkType} from "../reduxStore/store";
import {setAppStatusAC, setAppSuccessMessageAC} from "../reduxStore/appReducer";
import {deleteUserDataAC, setAuthUserDataAC} from "../reduxStore/authReducer";
import {handleServerNetworkError} from "../utilsFunction/Error-Utils";
import {authAPI} from "../api/API";


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
        if (response.data) {
            dispatch(setAuthUserDataAC(response.data));
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
        if (response.data.info) {
            let resetUser = {
                _id: null,
                email: null,
                name: null,
                avatar: null,
                publicCardPacksCount: null,
                created: null,
                updated: null,
                isAdmin: null,
                verified: null,
                rememberMe: null,
                error: null,
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
