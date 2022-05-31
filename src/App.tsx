import React, {useEffect} from 'react';
import {Loading} from "./components/Common/Loading/Loading";
import {AppWrapper} from "./components/StylesComponents/AuthCardWrapper";
import {Snackbar} from "./components/Common/SnackBar/SnackBar";
import {useAppSelector, useTypedDispatch} from "./Redux-Store/store";
import {AppInitialStateType} from "./Redux-Store/App-reducer";
import {PacksList} from "./components/ProfileGeneral/PacksList/PacksList";
import {getTodolistsTC} from "./Thunk/Todolist-thunk";

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