import React from 'react';
import s from "./Header.module.css";
import {RequestStatusType} from "../../../Redux-Store/App-reducer";

type HeaderType = {
    status: RequestStatusType
    addTodolist: (title: string) => void
}

export const Header = ({ status, addTodolist }: HeaderType) => {
return (
        <div className={s.main_header}>
                <div className={s.addItem}>
                    {/*<AddItemForm addItem={addTodolist} color={"info"} disabled={status === 'loading' && true}/>*/}
                </div>

                <h1 className={s.h1}>
                    Todolist for <b>SenamaSoft</b>
                </h1>

                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "200px"}}>

                </div>
        </div>
    );
};
