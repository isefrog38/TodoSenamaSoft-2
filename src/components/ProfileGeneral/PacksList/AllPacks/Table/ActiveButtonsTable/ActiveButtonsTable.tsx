import React from 'react';
import styled from "styled-components";
import {colors} from "../../../../../StylesComponents/Colors";
import {TaskType} from "../../../../../../Types/TodolistType";

type ActiveButtonsTableType = {
    el: TaskType
}

export const ActiveButtonsTable = ({el}: ActiveButtonsTableType) => {

    const deletePackHandler = () => {};
    const editPackHandler = () => {};

    return (
        <>
                    <Button color={colors.WhiteColor} bgColor={'#F1453D'} onClick={deletePackHandler}>
                        Delete
                    </Button>
                    <Button color={colors.Blue} bgColor={colors.AzureishWhite} onClick={editPackHandler}>
                        Edit
                    </Button>
        </>
    )
};


const Button = styled.button<{ color: string, bgColor: string }>`
  cursor: pointer;
  background-color: ${({bgColor}) => bgColor};
  border: none;
  border-radius: 0.15vw;
  font-size: 0.8vw;
  padding: 7px 12px;
  margin-left: 13px;
  color: ${({color}) => color};
  font-weight: 700;
  text-align: center;

  &:disabled {
    opacity: .3;
    cursor: no-drop;
  }`