import React from 'react';
import styled from "styled-components";
import {colors} from "../../../../../StylesComponents/Colors";
import {InitialStateTodolistDomainType} from "../../../../../../Redux-Store/todolists-reducer";
import {removeTodolistTC} from "../../../../../../Thunk/Todolist-thunk";
import {useTypedDispatch} from "../../../../../../Redux-Store/store";

type ActiveButtonsTableType = {
    onModal: string
    setOnModal: (show: string) => void
    el: InitialStateTodolistDomainType
}

export const ActiveButtonsTable = ({el, setOnModal, onModal}: ActiveButtonsTableType) => {

    const dispatch = useTypedDispatch();

    const deleteTaskHandler = () => dispatch(removeTodolistTC(el._id));
    const editHandleClick = () => {
        if (onModal !== '') {
            setOnModal('')
        } else {
            setOnModal(el._id);
        }
    }

    return (
        <>
            <Button color={colors.WhiteColor} bgColor={'#F1453D'} onClick={deleteTaskHandler}>
                Delete
            </Button>
            <Button color={colors.Blue} bgColor={colors.AzureishWhite} onClick={editHandleClick}>
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