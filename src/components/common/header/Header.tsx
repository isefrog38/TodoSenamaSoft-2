import React from 'react';
import s from "./Header.module.css";

export const Header = () => {
return (
        <div className={s.main_header}>
                <h1 className={s.h1}>
                    Todolist for <b>SenamaSoft</b>
                </h1>
        </div>
    );
};
