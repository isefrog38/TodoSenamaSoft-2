import React, {useState} from 'react';
import styled from "styled-components";
import {colors} from "../../../../../stylesComponents/Colors";
import {InitialStateTodolistDomainType} from "../../../../../../reduxStore/todolistsReducer";
import {DeleteTaskModal} from "../../../../../modalWindow/DeleteModal";
import {useTypedDispatch} from "../../../../../../reduxStore/store";
import {getFile} from "../../../../../../thunk/Todolist-thunk";
import {AddTaskModal} from "../../../../../modalWindow/AddTaskModal";

type ActiveButtonsTableType = {
    setShowAddModal: (el: boolean) => void
    el: InitialStateTodolistDomainType
}

export const ActiveButtonsTable = ({el, setShowAddModal}: ActiveButtonsTableType) => {

    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const dispatch = useTypedDispatch();

    const downloadFile = () => dispatch(getFile(el._id));
    const addModalClick = () => setEditModal(true);

    return (
        <>
            {editModal && <AddTaskModal name={"Edit Task"} id={el._id} setShow={setEditModal}/>}
            {deleteModal && <DeleteTaskModal id={el._id} setShow={setDeleteModal}/>}
            <Button type={"button"} color={colors.Blue} bgColor={"#c6a5f1"} onClick={downloadFile}
                    disabled={!(el.files === 1)}>
                Download
            </Button>
            <Button type={"button"} color={colors.Blue} bgColor={colors.AzureishWhite}
                    onClick={addModalClick}>
                Edit
            </Button>
            <Button type={"button"} color={colors.WhiteColor} bgColor={'#f35a53'} onClick={() => setDeleteModal(true)}>
                Delete
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
    cursor: no - drop;
  }
`