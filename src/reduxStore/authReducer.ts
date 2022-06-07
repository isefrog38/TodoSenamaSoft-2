import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialStateAuthorizationType, ResponseDataLoginOrAuthMe } from "../types/authType";

let initialState: initialStateAuthorizationType = {
    id: null,
    email: null,
    isActivated: null,
    isAuth: false
};

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState: initialState,
    reducers: {
        setForgotEmailAC(state, action: PayloadAction<{ email: string }>) {
            state.email = action.payload.email;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setAuthUserDataAC, (state: initialStateAuthorizationType, action: PayloadAction<ResponseDataLoginOrAuthMe>) => {
            return {...action.payload, isAuth: true}
        });
        builder.addCase(deleteUserDataAC, (state: initialStateAuthorizationType, action: PayloadAction<ResponseDataLoginOrAuthMe>) => {
            return {...action.payload, isAuth: false}
        });
    },
});

export const AuthorizationReducer = AuthSlice.reducer;

export const {setForgotEmailAC} = AuthSlice.actions;
export const setAuthUserDataAC = createAction<ResponseDataLoginOrAuthMe>('AUTH_ME');
export const deleteUserDataAC = createAction<ResponseDataLoginOrAuthMe>('Log_OUT_ME');