import React from 'react';
import s from "./Header.module.css";
import {PageSelect} from "../../../utilsFunction/PageSelector";
import {useAppSelector, useTypedDispatch} from "../../../reduxStore/store";
import {setLanguageAC} from "../../../reduxStore/appReducer";
import {AppInitialStateType, LanguageType} from "../../../types/reducersType";
import {getLanguageTC} from "../../../thunk/todolistThunk";
import {useTranslation} from "react-i18next";

export const Header = () => {

    const {language} = useAppSelector<AppInitialStateType>(state => state.AppReducer);
    const dispatch = useTypedDispatch();
    const { t } = useTranslation();

    const onLanguageChange = (language: LanguageType) => {
        dispatch(setLanguageAC({language}));
        // dispatch(getLanguageTC());
    }

    return (
        <div className={s.main_header}>
            <h1 className={s.h1}>
                {t('todolist_senamaSoft')}
                {/*Todolist for <b>SenamaSoft</b>*/}
            </h1>
            <div className={s.select}>
                <PageSelect value={language}
                            pd={15}
                            onChange={onLanguageChange}
                            items={["Eng", "Rus"] as LanguageType[]}
                />
            </div>
        </div>
    );
};
