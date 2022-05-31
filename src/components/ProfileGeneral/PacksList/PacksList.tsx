import React from 'react';
import {AllPacks} from "./AllPacks/AllPacks";
import {GeneralProfileWrapper} from '../../StylesComponents/ProfileAndPacksWrapper';
import {useAppSelector, useTypedDispatch} from "../../../Redux-Store/store";
import {createTodolistTC} from "../../../Thunk/Todolist-thunk";
import {Header} from "../../Common/Header/Header";
import {AppInitialStateType} from "../../../Redux-Store/App-reducer";

export const PacksList = () => {

    const {status} = useAppSelector<AppInitialStateType>(state => state.AppReducer);
    const dispatch = useTypedDispatch();

    const addTodolistHandler = (title: string) => dispatch(createTodolistTC(title));

    return (
        <GeneralProfileWrapper>
            <Header addTodolist={addTodolistHandler} status={status}/>
            <AllPacks/>
        </GeneralProfileWrapper>
    )
};