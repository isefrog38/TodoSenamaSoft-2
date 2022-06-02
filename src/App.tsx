import React, {useEffect} from 'react';
import {Loading} from "./components/common/loading/Loading";
import {AppWrapper} from "./components/stylesComponents/AuthCardWrapper";
import {Snackbar} from "./components/common/snackBar/SnackBar";
import {useAppSelector, useTypedDispatch} from "./reduxStore/store";
import {AppInitialStateType} from "./reduxStore/App-reducer";
import {PacksList} from "./components/profileGeneral/PacksList/PacksList";
import {getTodolistsTC} from "./thunk/Todolist-thunk";

export const App = () => {

    const stateApp = useAppSelector<AppInitialStateType>(state => state.AppReducer);
    const dispatch = useTypedDispatch();

    useEffect(() => {
        dispatch(getTodolistsTC());
    }, [dispatch]);

    return (
        <AppWrapper>
            {stateApp.status === 'loading'
                ? <Loading/>
                : <>
                    <Snackbar/>
                    <PacksList />
                </>
            }
        </AppWrapper>
    )
};