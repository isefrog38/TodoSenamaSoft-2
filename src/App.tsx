import React, {useEffect} from 'react';
import {Loading} from "./components/common/loading/Loading";
import {AppWrapper} from "./components/stylesComponents/taskWrapper";
import {Snackbar} from "./components/common/snackBar/SnackBar";
import {useAppSelector, useTypedDispatch} from "./reduxStore/store";
import {PacksList} from "./components/table/PacksList";
import {getTodolistsTC} from "./thunk/todolistThunk";
import {AppInitialStateType} from "./types/reducersType";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";

export const App = () => {

        const stateApp = useAppSelector<AppInitialStateType>(state => state.AppReducer);
        const dispatch = useTypedDispatch();

        useEffect(() => {
            dispatch(getTodolistsTC());
        }, [stateApp.params]);

        i18n
            .use(initReactI18next)
            .init({
                resources: {
                    eng: {translation: {...stateApp.translation}},
                    rus: {translation: {...stateApp.translation}},
                },
                lng: stateApp.language,
            }).then(t => t)

        return (
            <AppWrapper>
                {stateApp.status === 'loading'
                    ? <Loading/>
                    : <>
                        <Snackbar/>
                        <PacksList/>
                    </>
                }
            </AppWrapper>
        )
    }
;