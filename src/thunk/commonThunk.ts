import axios from "axios";
import {AppThunkType} from "../reduxStore/store";
import {setAppStatusAC} from "../reduxStore/appReducer";
import {handleServerNetworkError} from "../utilsFunction/Error-Utils";
import {authAPI} from "../api/api";
import {setAuthUserDataAC} from "../reduxStore/authReducer";


export const RegisterTC = (email: string, password: string): AppThunkType => async dispatch => {

    dispatch(setAppStatusAC({status: 'loading'}));

    try {
        const response = await authAPI.register(email, password);
        if (response) {
            dispatch(setAuthUserDataAC(response.user));
            dispatch(setAppStatusAC({status: 'succeeded'}));
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            handleServerNetworkError(error.response.data.error, dispatch);
        }
    }
};
