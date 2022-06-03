import React from 'react';
import {AllPacks} from "./AllPacks";
import {GeneralProfileWrapper} from '../stylesComponents/generalWapper';
import {Header} from "../common/header/Header";

export const PacksList = () => {

    return (
        <GeneralProfileWrapper>
            <Header/>
            <AllPacks/>
        </GeneralProfileWrapper>
    )
};