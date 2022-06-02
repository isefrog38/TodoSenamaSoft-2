import React, {useState} from 'react';
import styled from "styled-components";
import {colors} from "../../../../../stylesComponents/Colors";
import {InitialStateTodolistDomainType} from "../../../../../../reduxStore/todolists-reducer";
import {DeleteTaskModal} from "../../../../../modalWindow/DeleteModal";
import {EditModal} from "../../../../../modalWindow/EditModal";

type ActiveButtonsTableType = {
    el: InitialStateTodolistDomainType
}

export const ActiveButtonsTable = ({el}: ActiveButtonsTableType) => {

    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);

    const downloadFile = () => {
        let tempLink = document.createElement('a');
        if (el.files?.name) {
            tempLink.href = el.files?.path;
            tempLink.setAttribute('download', el.files?.name);
            tempLink.click();
        }
    };

    return (
        <>
            {editModal && <EditModal el={el} setShow={setEditModal}/>}
            {deleteModal && <DeleteTaskModal id={el._id} setShow={setDeleteModal}/>}
            <Button color={colors.Blue} bgColor={"#c6a5f1"} onClick={downloadFile} disabled={!el.files}>
                <a href={el.files?.path} onClick={(e) => e.preventDefault()}>Download</a>
            </Button>
            <Button color={colors.Blue} bgColor={colors.AzureishWhite} onClick={() => setEditModal(true)}>
                Edit
            </Button>
            <Button color={colors.WhiteColor} bgColor={'#f35a53'} onClick={() => setDeleteModal(true)}>
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

&:disabled
    {
        opacity: .3;
        cursor: no - drop;
    }
`