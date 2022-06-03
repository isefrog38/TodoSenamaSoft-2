import React from 'react';
import s from "./Header.module.css";
import {PageSelect} from "../../../utilsFunction/PageSelector";
import {useAppSelector, useTypedDispatch} from "../../../reduxStore/store";
import {setLanguageAC} from "../../../reduxStore/appReducer";
import {AppInitialStateType, LanguageType} from "../../../types/reducersType";

export const Header = () => {

    const {language} = useAppSelector<AppInitialStateType>(state => state.AppReducer);
    const dispatch = useTypedDispatch();

    return (
        <div className={s.main_header}>
            <h1 className={s.h1}>
                Todolist for <b>SenamaSoft</b>
            </h1>
            <div className={s.select}>
                <PageSelect value={language}
                            pd={15}
                            onChange={(language) => dispatch(setLanguageAC({language}))}
                            items={["Eng", "Rus"] as LanguageType[]}
                />
            </div>
        </div>
    );
};
