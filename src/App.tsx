import React, {useEffect} from 'react';
import {Loading} from "./components/common/loading/Loading";
import {AppWrapper} from "./components/stylesComponents/taskWrapper";
import {Snackbar} from "./components/common/snackBar/SnackBar";
import {useAppSelector, useTypedDispatch} from "./reduxStore/store";
import {AppInitialStateType} from "./reduxStore/appReducer";
import {PacksList} from "./components/table/PacksList";
import {getTodolistsTC} from "./thunk/todolistThunk";

export const App = () => {

    const stateApp = useAppSelector<AppInitialStateType>(state => state.AppReducer);
    const dispatch = useTypedDispatch();

    useEffect(() => {
        dispatch(getTodolistsTC());
    }, [stateApp.params]);

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