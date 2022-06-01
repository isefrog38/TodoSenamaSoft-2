import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {
    ButtonCancel, ButtonSave, ButtonsBlock, Close, Input, InputWrapper, Modal,
    ModalTextWrapper, ModalWindow, ModalWrapper, WrapperTextAndClose
} from '../StylesComponents/ModalWrappers';
import {FormWrapper, RememberMeWrapper, TextAuthWrapper} from "../StylesComponents/AuthCardWrapper";
import {colors} from "../StylesComponents/Colors";
import {useFormik} from "formik";
import {TodolistType} from "../../Types/TodolistType";
import {useTypedDispatch} from "../../Redux-Store/store";
import {updateTodolistTC} from "../../Thunk/Todolist-thunk";
import {Button} from "../Common/Buttons/Button";

type EditPackModalType = {
    el: TodolistType
    setShow: (show: boolean) => void
}

type FormikErrorType = {
    newTitle?: string
}

export const EditModal = ({el, setShow}: EditPackModalType) => {

    const dispatch = useTypedDispatch();
    const maxLengthInput = 30;
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileURL] = useState<string | null>(null);
    const fileInput = useRef<HTMLInputElement>(null);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const newFile = e.target.files && e.target.files[0];
        if (newFile) {
            setFile(newFile);
            setFileURL(window.URL.createObjectURL(newFile));
        }
    };

    const closeModalClick = () => setShow(false);

    const loginForm = useFormik({
        initialValues: {newTitle: '', private: false},
        validate: (values: FormikErrorType) => {
            const errors: FormikErrorType = {};
            if (!values.newTitle) {
                errors.newTitle = "Field is required";
            }
            return errors;
        },
        onSubmit: (values) => {
            if (file) dispatch(updateTodolistTC(el._id, values.newTitle, file.name));
            else dispatch(updateTodolistTC(el._id, values.newTitle));
            setShow(false);
        },
    });

    useEffect(() => {
        loginForm.setFieldValue('newTitle', el.title);
    }, []);

    return (
        <ModalWrapper>
            <ModalWindow>
                <FormWrapper onSubmit={loginForm.handleSubmit}>
                    <Modal>
                        <WrapperTextAndClose>
                            <ModalTextWrapper>Edit Task</ModalTextWrapper>
                            <Close onClick={closeModalClick}/>
                        </WrapperTextAndClose>

                        <InputWrapper>
                            <TextAuthWrapper fontSz={13} opacity={0.5} color={colors.DarkBlue}>New Pack Name</TextAuthWrapper>
                            <Input maxLength={maxLengthInput}
                                   type="text"
                                   id="newTitle"
                                   placeholder={"new Task name"}
                                   {...loginForm.getFieldProps("newTitle")}
                            />
                        </InputWrapper>

                        {/*<div style={{marginTop: "20px"}}>*/}
                        {/*    <input type={"file"} style={{display:"none"}} ref={fileInput} onChange={onChange}/>*/}
                        {/*    <Button bg={colors.FilterButtonColor}*/}
                        {/*            br={5}*/}
                        {/*            width={30}*/}
                        {/*            name={"Choose File"}*/}
                        {/*            onClick={() => fileInput?.current?.click()}*/}
                        {/*    />*/}
                        {/*</div>*/}

                        <ButtonsBlock>
                            <ButtonCancel onClick={closeModalClick}>
                                Cancel
                            </ButtonCancel>
                            <ButtonSave type="submit"
                                        disabled={!(loginForm.isValid && loginForm.dirty) || el.title === loginForm.values.newTitle}>
                                Save change
                            </ButtonSave>
                        </ButtonsBlock>
                    </Modal>
                </FormWrapper>
            </ModalWindow>
        </ModalWrapper>
    );
};