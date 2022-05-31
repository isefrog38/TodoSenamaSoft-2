import React, {useState} from 'react';
import {LoadingTable} from "../../../../Common/Loading/LoadingTable";
import {TableElemets} from "./TableElements/TableElemets";
import {PacksBlock} from '../../../../StylesComponents/CardsWrapper';
import styled from "styled-components";
import {TaskType} from "../../../../../Types/TodolistType";
import {useTypedDispatch} from "../../../../../Redux-Store/store";

type CardTableType = {
    itemPack: TaskType[]
    isFetching: boolean
};
const TableList = [
    {id: 1, name: "Name"},
    {id: 2, name: "Created by"},
    {id: 5, name: "Actions"},
];

export const CardTable = ({itemPack, isFetching}: CardTableType) => {

    const [up, setUp] = useState<boolean>(false);
    const dispatch = useTypedDispatch();

    const onFilterColumnClick = () => {
        setUp(!up);
    }

    return (
        <PacksBlock>
            <Table>
                <ItemColumn>
                    {TableList.map(el => (
                        <OneColumn key={el.id}>
                            {el.name}
                            {el.name === 'Created by' && <Span up={up} onClick={onFilterColumnClick}/>}
                        </OneColumn>
                    ))
                    }
                </ItemColumn>
                {isFetching
                    ? <LoadingTable/>
                    : itemPack.map(el => <TableElemets key={el.id} el={el}/>)
                }
            </Table>
        </PacksBlock>
    );
};


const Span = styled.span<{ up?: boolean }>`
  display: flex;
  align-items: start;
  justify-content: center;
  height: 100%;
  margin-top: 7px;
  border: solid #242524;
  border-width: 0 0.2vw 0.2vw 0;
  padding: 0.2vw;
  margin-left: 0.3vw;
  transform: rotate(${({up}) => up ? 225 : 45}deg);
  cursor: pointer;
  transition: 1s all;

`;

const Table = styled.div`
  height: auto;
`;

const ItemColumn = styled.div`
  width: 100%;
  height: 2.5vw;
  background-color: #ECECF9;
  font-size: 1vw;
  font-weight: 600;
  display: flex;
  align-items: center;`

const OneColumn = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 1.2vw;
  width: 100%;

  :nth-child(1) {
    min-width: 15%;
    justify-content: start;
  }

  :nth-child(2) {
    min-width: 20%;
  }

  :nth-child(3) {
    min-width: 20%;
  }`
