import React from 'react';
import styled from "styled-components";
import {colors} from "../../StylesComponents/Colors";

type ButtonClearType = {
    bg?: string
    name: string
    width?: number
    onClick: () => void
}

export const Button = ({bg, onClick, name, width}: ButtonClearType) => {
    return (
        <ButtonAddNewPack bg={bg} width={width} onClick={onClick}>{name}</ButtonAddNewPack>
    );
};


const ButtonAddNewPack = styled.button<{width?: number, bg?: string}>`
  width: ${({width}) => width ? width : 20}%;
  height: 2vw;
  font-size: 0.8vw;
  background-color: ${({bg}) => bg ? bg : colors.Blue};
  color: ${colors.WhiteColor};
  border-radius: 2vw;
  letter-spacing: 0.7px;
  border: none;
  cursor: pointer;`