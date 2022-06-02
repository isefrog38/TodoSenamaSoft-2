import React from 'react';
import {AllPacks} from "./AllPacks/AllPacks";
import {GeneralProfileWrapper} from '../../stylesComponents/ProfileAndPacksWrapper';
import {Header} from "../../common/header/Header";

export const PacksList = () => {

    return (
        <GeneralProfileWrapper>
            <Header/>
            <AllPacks/>
        </GeneralProfileWrapper>
    )
};