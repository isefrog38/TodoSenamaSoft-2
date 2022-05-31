import React, {useState, KeyboardEvent, useRef, ChangeEvent} from 'react';
import {ActiveButtonsTable} from "../ActiveButtonsTable/ActiveButtonsTable";
import styled from "styled-components";
import {InitialStateTodolistDomainType} from "../../../../../../Redux-Store/todolists-reducer";
import {InputWrapper} from "../../../../../Common/SearchInput/SearchInput";
import {updateTodolistTC} from "../../../../../../Thunk/Todolist-thunk";
import {useTypedDispatch} from "../../../../../../Redux-Store/store";
import {Button} from "../../../../../Common/Buttons/Button";
import {colors} from "../../../../../StylesComponents/Colors";

type TableElementsType = {
    onModal: string
    setOnModal: (show: string) => void
    el: InitialStateTodolistDomainType
}

export const TableElemets = ({el, setOnModal, onModal}: TableElementsType) => {

    const [value, setValue] = useState<string>(el.title);
    const dispatch = useTypedDispatch();
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileURL] = useState<string | null>(null);
    const fileInput = useRef<HTMLInputElement>(null);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        // e.preventDefault();
        const newFile = e.target.files && e.target.files[0];
        if (newFile) {
            setFile(newFile);
            setFileURL(window.URL.createObjectURL(newFile));
        }
    };


    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            dispatch(updateTodolistTC(el._id, value));
            setOnModal('');
        }
    }

    return (
        <GeneralBlock>
            {onModal === el._id
                ? <InputWrapper value={value} onKeyPress={onKeyPress} onChange={(e) => setValue(e.currentTarget.value)} />
                : <Item>{el.title}</Item>
            }
            <Item>{el.addedDate}</Item>
            {/*<Item>*/}
            {/*    <input type={"file"} style={{display:"none"}} ref={fileInput} onChange={onChange}/>*/}
            {/*    <Button bg={colors.FilterButtonColor} width={50} name={"Choose File"} onClick={() => fileInput?.current?.click()}/>*/}
            {/*</Item>*/}
            <Item> <ActiveButtonsTable el={el} onModal={onModal} setOnModal={setOnModal}/> </Item>
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
    min-width: 25%;
    justify-content: start;
  }

  :nth-child(2) {
    max-width: 13%;
  }

  :nth-child(3) {
    justify-content: end;
    min-width: 20%;
  }`