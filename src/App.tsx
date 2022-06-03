import React, {useEffect} from 'react';
import {Loading} from "./components/common/loading/Loading";
import {AppWrapper} from "./components/stylesComponents/taskWrapper";
import {Snackbar} from "./components/common/snackBar/SnackBar";
import {useAppSelector, useTypedDispatch} from "./reduxStore/store";
import {PacksList} from "./components/table/PacksList";
import {getTodolistsTC} from "./thunk/todolistThunk";
import {AppInitialStateType} from "./types/reducersType";
import {setAppStatusAC} from "./reduxStore/appReducer";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";

export const App = () => {

    const stateApp = useAppSelector<AppInitialStateType>(state => state.AppReducer);
    const dispatch = useTypedDispatch();

    useEffect(() => {
        dispatch(setAppStatusAC({status: 'loading'}));
        dispatch(getTodolistsTC());
    }, [stateApp.params]);

    i18n
        .use(initReactI18next)
        .init({
            resources: {
                Eng: {
                    translation: {
                        "todolist_senamaSoft": "Todolist SenamaSoft Company",
                        "name_table": "Name",
                        "date_table": "Added Date",
                        "actions_table": "Actions",
                        "show": "Show",
                        "task_per_page": "Task per page",
                        "todolist_table": "Todolist",
                        "add_button": "Add New Task",
                    },
                },
                Rus: {
                    translation: {
                        "todolist_senamaSoft": "Список Задач Компании SenamaSoft",
                        "name_table": "Имя",
                        "date_table": "Дата Создания",
                        "actions_table": "Действия",
                        "show": "Показать",
                        "task_per_page": "Задач на странице",
                        "todolist_table": "Список Задач",
                        "add_button": "Добавить новую задачу",
                    },
                },
            },
            lng: stateApp.language,
            debug: true,
        }).then(t => t)


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