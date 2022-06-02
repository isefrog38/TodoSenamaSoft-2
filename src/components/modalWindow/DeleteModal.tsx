import React from 'react';
import {
    ButtonCancel, ButtonDelete, ButtonsBlock,
    Close,
    Modal,
    ModalTextWrapper,
    ModalWindow,
    ModalWrapper,
    WrapperText,
    WrapperTextAndClose
} from '../stylesComponents/ModalWrappers';
import {TodolistType} from "../../types/TodolistType";
import {useAppSelector, useTypedDispatch} from "../../reduxStore/store";
import {removeTodolistTC} from "../../thunk/Todolist-thunk";

type DeletePackModalType = {
    id: string
    setShow: (show: boolean) => void
}

export const DeleteTaskModal = ({setShow, id}: DeletePackModalType) => {

    const stateTask = useAppSelector<TodolistType[]>(state => state.todolistsReducer)
    const dispatch = useTypedDispatch();

    const closeModalClick = () => setShow(false);
    const deleteClickHandler = () => {
        setShow(false);
        dispatch(removeTodolistTC(id))
    };
    let findName = stateTask.find(el => el._id === id)?.title;

    return (
        <ModalWrapper>
            <ModalWindow>
                <Modal>
                    <WrapperTextAndClose>
                        <ModalTextWrapper>Delete Task</ModalTextWrapper>
                        <Close onClick={closeModalClick}/>
                    </WrapperTextAndClose>

                    <WrapperText>
                        {`Do you really want to remove `}<b>{findName}</b>{`?`}
                    </WrapperText>

                    <ButtonsBlock>
                        <ButtonCancel onClick={closeModalClick}>Cancel</ButtonCancel>
                        <ButtonDelete onClick={deleteClickHandler}>Delete</ButtonDelete>
                    </ButtonsBlock>
                </Modal>
            </ModalWindow>
        </ModalWrapper>
    );
};
