import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {
    ButtonCancel, ButtonSave, ButtonsBlock, Close, Input, InputWrapper, Modal,
    ModalTextWrapper, ModalWindow, ModalWrapper, WrapperTextAndClose
} from '../stylesComponents/ModalWrappers';
import {useFormik} from "formik";
import {TodolistType} from "../../types/TodolistType";
import {useTypedDispatch} from "../../reduxStore/store";
import {updateTodolistTC} from "../../thunk/Todolist-thunk";
import {Button} from "../common/buttons/Button";
import DatePicker from "react-datepicker";
import {fileToBase64} from "../../utilsFunction/Error-Utils";
import { FormWrapper, TextAuthWrapper } from '../stylesComponents/AuthCardWrapper';
import { colors } from '../stylesComponents/Colors';

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
    const [date, setDate] = useState(new Date());

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        let fileTarget = e.target.files && e.target.files[0];
        if (fileTarget) fileToBase64(fileTarget, (err:any, result: string) => {
            if (result) {
                setFile(fileTarget);
                setFileURL(result);
            }
        })
    };


    const closeModalClick = () => setShow(false);

    const loginForm = useFormik({
        initialValues: {newTitle: ''},
        validate: (values: FormikErrorType) => {
            const errors: FormikErrorType = {};
            if (!values.newTitle) {
                errors.newTitle = "Field is required";
            }
            return errors;
        },
        onSubmit: (values) => {
            if (file && fileUrl) {
                let fileTyped = {
                    id: new Date().getTime().toString(),
                    name: file?.name,
                    type: file?.type,
                    size: file?.size,
                    lastModified: file?.lastModified,
                    path: fileUrl,
                };
                dispatch(updateTodolistTC(el._id, values.newTitle, date, fileTyped));
            } else {
                dispatch(updateTodolistTC(el._id, values.newTitle, date));
            }
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

                        <div style={{display: "flex", marginTop: "20px"}}>
                            <input type={"file"}
                                   style={{display: "none"}}
                                   ref={fileInput}
                                   onChange={onChange}
                            />
                            <Button bg={colors.FilterButtonColor}
                                    br={5}
                                    width={40}
                                    name={"Uploads File"}
                                    onClick={() => fileInput?.current?.click()}
                                    button={"button"}
                            />
                            <div style={{marginLeft: "30px"}}>
                                <DatePicker selected={date} onChange={(date: Date) => setDate(date)}/>
                            </div>
                        </div>

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