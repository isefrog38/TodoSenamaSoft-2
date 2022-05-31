import React from 'react';
import {ActiveButtonsTable} from "../ActiveButtonsTable/ActiveButtonsTable";
import styled from "styled-components";
import {TaskType} from "../../../../../../Types/TodolistType";

type TableElementsType = {
    el: TaskType
}

export const TableElemets = ({el}: TableElementsType) => {
    return (
        <GeneralBlock>
            <Item>{el.title}</Item>
            <Item>{el.createDate}</Item>
            <Item> <ActiveButtonsTable el={el}/> </Item>
        </GeneralBlock>
    );
};


const GeneralBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  &:nth-child(2n) {
    background-color: #F8F7FD;
  }
`;

const Item = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2.3vw;
  padding: 0 1.2vw;
  font-size: 0.8vw;
  
  :nth-child(1) {
    cursor: pointer;
    min-width: 25%;
    justify-content: start;
  }

  :nth-child(2) {
    max-width: 13%;
  }

  :nth-child(3) {
    max-width: 16%;
  }

  :nth-child(4) {
    min-width: 20%;
  }

  :nth-child(5) {
    justify-content: end;
    min-width: 20%;
  }`