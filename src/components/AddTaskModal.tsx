import React from 'react';
import {
    ButtonCancel,
    ButtonSave,
    ButtonsBlock,
    Close,
    Input,
    InputWrapper,
    Modal,
    ModalTextWrapper,
    ModalWindow,
    ModalWrapper,
    WrapperTextAndClose
} from "./StylesComponents/ModalWrappers";
import {colors} from "./StylesComponents/Colors";
import {FormWrapper, TextAuthWrapper} from "./StylesComponents/AuthCardWrapper";
import {useFormik} from "formik";
import {useTypedDispatch} from "../Redux-Store/store";
import {createTaskTC} from "../Thunk/Task-thunk";

type AddPackModalType = {
    setShow: (show: boolean) => void
}

export type FormikErrorType = {
    nameTask?: string
};

export const AddTaskModal = ({setShow}: AddPackModalType) => {

    const dispatch = useTypedDispatch();
    const maxLengthInput = 30;

    const closeModalClick = () => setShow(false);

    const loginForm = useFormik({
        initialValues: {nameTask: ''},
        validate: (values: FormikErrorType) => {
            const errors: FormikErrorType = {};
            if (!values.nameTask) {
                errors.nameTask = "Field is required";
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(createTaskTC(values));
            setShow(false);
        },
    });

    return (
        <ModalWrapper>
            <ModalWindow>
                <FormWrapper onSubmit={loginForm.handleSubmit}>
                    <Modal>
                        <WrapperTextAndClose>
                            <ModalTextWrapper>Add Pack</ModalTextWrapper>
                            <Close onClick={closeModalClick}/>
                        </WrapperTextAndClose>

                        <InputWrapper>
                            <TextAuthWrapper fontSz={13} opacity={0.5} color={colors.DarkBlue}>Name Pack</TextAuthWrapper>
                            <Input maxLength={maxLengthInput}
                                   type="text"
                                   id="namePack"
                                   placeholder={"New pack name"}
                                   {...loginForm.getFieldProps("namePack")}
                            />
                        </InputWrapper>

                        <ButtonsBlock>
                            <ButtonCancel onClick={closeModalClick}>
                                Cancel
                            </ButtonCancel>
                            <ButtonSave type="submit"
                                        disabled={!(loginForm.isValid && loginForm.dirty)}>
                                Save
                            </ButtonSave>
                        </ButtonsBlock>
                    </Modal>
                </FormWrapper>
            </ModalWindow>
        </ModalWrapper>
    );
};