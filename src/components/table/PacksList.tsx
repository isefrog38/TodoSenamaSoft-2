import React, {useEffect} from 'react';
import {AllTasks} from "./AllPacks";
import {GeneralProfileWrapper} from '../stylesComponents/generalWapper';
import {Header} from "../common/header/Header";
import {NotAuthRedirect} from "../../utilsFunction/redirectFunction";
import {getTodolistsTC} from "../../thunk/todolistThunk";
import {useAppSelector, useTypedDispatch} from "../../reduxStore/store";
import {AppInitialStateType} from "../../types/reducersType";

export const TodolistList = NotAuthRedirect(() => {

    const stateApp = useAppSelector<AppInitialStateType>(state => state.AppReducer);
    const dispatch = useTypedDispatch();

    useEffect(() => {
        dispatch(getTodolistsTC());
    }, [stateApp.params]);

    return (
        <GeneralProfileWrapper>
            <Header/>
            <AllTasks/>
        </GeneralProfileWrapper>
    )
});