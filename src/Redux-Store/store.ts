import {todolistsReducer} from './todolists-reducer';
import {Action, AnyAction, combineReducers} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppReducer} from "./App-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    todolistsReducer,
    AppReducer,
});

export const store = configureStore({
    reducer: {
        todolistsReducer,
        AppReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
})

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>;

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;   // costom UseSelector
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, Action>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
