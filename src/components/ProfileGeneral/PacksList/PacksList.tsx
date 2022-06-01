import React from 'react';
import {AllPacks} from "./AllPacks/AllPacks";
import {GeneralProfileWrapper} from '../../StylesComponents/ProfileAndPacksWrapper';
import {Header} from "../../Common/Header/Header";

export const PacksList = () => {

    return (
        <GeneralProfileWrapper>
            <Header/>
            <AllPacks/>
        </GeneralProfileWrapper>
    )
};